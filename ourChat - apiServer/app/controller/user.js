'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
class UserController extends Controller {
    async reg() {
        let { ctx, app } = this
        ctx.validate({
            username: {
                type: 'string',
                required: true,
                range: {
                    min: 2,
                    max: 20
                },
                desc: '用户名称'
            },
            password: {
                type: 'string',
                required: true,
                desc: '用户密码'
            },
            repassword: {
                type: 'string',
                required: true,
                desc: '确认密码'
            },
        }, {
            equals: [
                ['password', 'repassword']
            ]
        })
        let { username, password, repassword } = ctx.request.body
        let user = await app.model.User.findOne({
            where: {
                username
            }
        })
        if (user) {
            ctx.throw(400, '该用户名已存在')
        }
        let createUser = await app.model.User.create({
            username, password
        })
        if (!createUser) {
            ctx.throw(400, '创建失败')
        }
        ctx.apiSuccess(createUser)

    }

    async login() {
        let { ctx, app } = this
        ctx.validate({
            username: {
                type: 'string',
                required: true,
                range: {
                    min: 2,
                    max: 20
                },
                desc: '用户名称'
            },
            password: {
                type: 'string',
                required: true,
                desc: '用户密码'
            }
        })
        const { username, password } = ctx.request.body
        let user = await app.model.User.findOne({
            where: {
                username,
                status: 1
            }
        })
        if (!user) {
            ctx.throw(400, '此用户不存在')
        }
        await this.checkPassword(password, user.password)
        user = JSON.parse(JSON.stringify(user))
        let token = await ctx.getToken(user)
        user.token = token
        delete user.password
        if (!await this.service.cache.set('user_' + user.id, token, 300000)) {
            ctx.throw(400, '用户登录失败')
        }
        ctx.apiSuccess(user)
    }
    async logout() {
        let { ctx, app } = this
        ctx.body = ctx.authUser
    }
    async checkPassword(password, hash_password) {
        const hmac = crypto.createHash("sha256", this.app.config.crypto.secret);
        hmac.update(password);
        let pwd = hmac.digest("hex");
        if (pwd !== hash_password) this.ctx.throw(400, '密码错误')
    }
    async update() {
        const { app, ctx } = this
        const current_user_id = ctx.authUser.id
        ctx.validate({
            nickname: {
                type: 'string',
                required: false,
                desc: '昵称',
                defValue: ''

            },
            avatar: {
                type: 'url',
                required: false,
                desc: '头像',
                defValue: ''

            }
        })
        let { avatar, nickname } = ctx.request.body
        ctx.authUser.avatar = avatar || ctx.authUser.avatar
        ctx.authUser.nickname = nickname || ctx.authUser.nickname
        await ctx.authUser.save()
        return ctx.apiSuccess('ok')


    }
    async deleteTimeLine(friend_id, user_id) {
        const { app, ctx } = this;
        //对方中我的记录
        let moments = await app.model.Moment.findAll({
            where: {
                user_id: friend_id,
            },
            attributes: ['id']
        })
        moments = moments.map(item => item.id)
        await app.model.MomentTimeline.destroy({
            where: {
                user_id,
                moment_id: moments
            }
        })

    }
    async breakup() {
        const { app, ctx } = this
        const current_user_id = ctx.authUser.id
        ctx.validate({
            friend_id: {
                type: 'int',
                required: true,
                desc: '好友id'
            }
        })
        let { friend_id } = ctx.request.body
        await app.model.Friend.destroy({
            where: {
                user_id: current_user_id,
                friend_id
            }
        })
        app.model.Friend.destroy({
            where: {
                user_id: friend_id,
                friend_id: current_user_id
            }
        })

        ctx.apiSuccess('ok')
        this.deleteTimeLine(friend_id, current_user_id);
        this.deleteTimeLine(current_user_id, friend_id);

        // 删除apply表对应数据
        app.model.Apply.destroy({
            where: {
                user_id: current_user_id,
                friend_id: friend_id
            }
        });
    }
}

module.exports = UserController;
