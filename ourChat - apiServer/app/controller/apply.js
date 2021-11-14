'use strict';

const Controller = require('egg').Controller;

class ApplyController extends Controller {
    async addFriends() {
        const { ctx, app } = this
        ctx.validate({
            friend_id: {
                type: 'int',
                required: true,
                desc: '好友ID'
            },
            nickname: {
                type: 'string',
                required: true,
                desc: '昵称'
            },
            lookme: {
                type: 'int',
                required: true,
                range: {
                    in: [0, 1]
                },
                desc: '看我'
            },
            lookhim: {
                type: 'int',
                required: true,
                range: {
                    in: [0, 1]
                },
                desc: '看他'
            }
        })
        let { friend_id, nickname, lookme, lookhim } = ctx.request.body
        let current_user_id = ctx.authUser.id
        if (current_user_id == friend_id) {
            ctx.throw(400, '不能添加自己为好友')
        }
        let him = await app.model.User.findOne({
            where: {
                id: friend_id - 0,
                status: 1
            }
        })
        if (!him) ctx.throw(400, '该用户不存在或被禁用')
        let apply = await app.model.Apply.findOne({
            where: {
                user_id: current_user_id,
                friend_id: friend_id - 0,
                status: ['pending', 'agree']
            }
        })
        if (apply) ctx.throw(400, '已经发送过申请,请勿重复发送')
        await app.model.Apply.create({
            nickname,
            user_id: current_user_id,
            friend_id: friend_id - 0,
            lookme,
            lookhim
        })
        // if (app.ws.user && app.ws.user[friend_id]) {
        //     app.ws.user[friend_id].send(JSON.stringify({
        //         msg: 'getApply',
        //         data: 'ok'
        //     }))
        // }
        ctx.send(friend_id, '', 'getApply')
        ctx.apiSuccess('ok')
    }
    async checkApplication() {
        const { ctx, app } = this
        let current_user_id = ctx.authUser.id
        let page = ctx.params.page ? ctx.params.page - 0 : 1
        let size = ctx.query.size ? ctx.query.size - 0 : 10
        let offset = ((page - 0) - 1) * size
        let rows = await app.model.Apply.findAndCountAll({
            where: {
                friend_id: current_user_id,
                status: 'pending'
            },
            include: [{
                model: app.model.User,
                attributes: ['id', 'username', 'nickname', 'avatar']
            }],
            offset,
            limit: size,
            order: [['created_at', 'DESC']]
            // at:['created_at','updated_at']
        })
        ctx.apiSuccess(rows)

    }
    async handle() {
        let { ctx, app } = this
        const current_user_id = ctx.authUser.id
        let id = ctx.params.id - 0
        ctx.validate({
            status: {
                required: true,
                type: 'string',
                range: {
                    in: ['refuse', 'agree', 'ignore']
                }
            },
            lookhim: {
                required: true,
                type: 'int',
                range: {
                    in: [0, 1]
                },
                desc: '看他'
            },
            lookme: {
                required: true,
                type: 'int',
                range: {
                    in: [0, 1]
                },
                desc: '看我'
            },
            nickname: {
                required: true,
                type: 'string',
                defValue: ''
            }
        })

        let { nickname, status, lookme, lookhim } = ctx.request.body

        // 有没有添加记录
        let apply = await app.model.Apply.findOne({
            where: {
                id: id - 0,
                friend_id: current_user_id,
                status: 'pending'
            },
            include: [{
                model: app.model.User,
                attributes: ['username', 'id', 'nickname', 'avatar']
            }
            ]
        })
        if (!apply) {
            ctx.throw(400, '该记录不存在')
        }
        let transaction;
        try {
            // 开启事务
            transaction = await app.model.transaction();

            await apply.update({
                status
            }, { transaction })
            // 提交事务
            if (status === 'agree') {

                await app.model.Friend.create({
                    user_id: apply.user_id,
                    friend_id: current_user_id,
                    lookhim: apply.lookhim,
                    lookme: apply.lookme,
                    nickname: apply.nickname
                }, { transaction })
                if (!await app.model.Friend.findOne({
                    where: {
                        friend_id: apply.user_id,
                        user_id: current_user_id
                    }
                })) {

                    await app.model.Friend.create({
                        user_id: current_user_id,
                        friend_id: apply.user_id,
                        lookhim,
                        lookme,
                        nickname
                    }, { transaction })
                }
            }
            let message = {
                id: (new Date()).getTime(),
                to_id: apply.user_id,
                to_avatar: apply.user.avatar,
                to_name: apply.user.nickname || apply.user.username,
                from_id: current_user_id,
                from_avatar: apply.user.avatar,
                from_name: ctx.authUser.nickname || ctx.authUser.username,
                chat_type: 'user',
                type: 'text',
                data: '我们已经是好友了,快来一起聊天吧！',
                options: {},  //其他参数
                create_time: (new Date()).getTime(), //创建时间
                isremove: 0,     //  是否测回
            }

            ctx.sendAndSaveMessage(message.to_id, { ...message })
            message.from_avatar = apply.user.avatar
            message.from_name = apply.user.nickname || apply.user.username
            message.from_id = apply.user.id
            message.to_avatar = ctx.authUser.avatar
            message.to_name = apply.nickname || ctx.authUser.nickname
                || ctx.authUser.username
            message.to_id = current_user_id
            message.data = '已经成为好友,可以发送消息了'
            message.type = 'system'
            console.log('message', message)

            ctx.sendAndSaveMessage(message.to_id, { ...message })
            await transaction.commit();

            // 消息推送
            return ctx.apiSuccess('ok');
        } catch (e) {
            // 事务回滚
            await transaction.rollback();
            console.log(e)
            return ctx.apiFail('操作失败');
        }

        // 查看申请是否存在
        // 设置状态
        // 加入对方的列表
        // 将对方加入我的好友列表
    }
}

module.exports = ApplyController;
