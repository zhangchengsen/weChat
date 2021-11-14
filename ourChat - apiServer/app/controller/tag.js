'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
    async list() {
        const { app, ctx } = this
        let current_user_id = ctx.authUser.id
        let page = ctx.params.page ? ctx.params.page - 0 : 1
        let size = 10
        let offset = (page - 1) * size
        let rows = await app.model.Tag.findAll({
            where: {
                user_id: current_user_id
            },
            attributes: ['id', 'name'],
            offset,
            limit: size
        })
        ctx.apiSuccess(rows)
    }
    async read() {
        const { app, ctx } = this
        let current_user_id = ctx.authUser.id
        let id = ctx.params.id - 0
        let rows = await app.model.Tag.findOne({
            where: {
                user_id: current_user_id, id
            },
            attributes: ['id', 'name'],
            include: [{
                model: app.model.Friend,
                attributes: ['nickname'],
                where: {
                    isblack: 0
                },
                include: [{
                    model: app.model.User,
                    as: 'friendInfo',
                    attributes: ['id', 'nickname', 'avatar', 'username']
                }]
            }]
        })
        ctx.apiSuccess(rows)
    }
}

module.exports = TagController;
