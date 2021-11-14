'use strict';

const Controller = require('egg').Controller;

class FavaController extends Controller {
    async create() {
        const { ctx, app } = this
        const current_user_id = ctx.authUser.id
        ctx.validate({
            data: {
                type: 'string',
                required: true
            },
            type: {
                type: 'string',
                required: true,
                range: {
                    in: ['emoticon', 'text', 'image', 'video', 'audio']
                }
            },
            options: {
                type: 'string',
                required: true
            }
        })
        const { options, data, type } = ctx.request.body
        await app.model.Fava.create({
            data, options, type,
            user_id: current_user_id
        })
        ctx.apiSuccess('ok')
    }
    async list() {
        const { ctx, app } = this
        const current_user_id = ctx.authUser.id

        const { options, data, type } = ctx.request.body
        let size = 10
        let page = ctx.params.page - 0 || 1
        let offset = (page - 1) * size
        let fava = await app.model.Fava.findAll({
            where: {
                user_id: current_user_id,
            },
            limit: size,
            offset,
            attributes: ['id', 'data', 'options', 'type']
        })
        ctx.apiSuccess(fava)
    }
    async remove() {
        const { ctx, app } = this
        const current_user_id = ctx.authUser.id
        const { id } = ctx.request.body
        await app.model.Fava.destroy({
            where: {
                user_id: current_user_id,
                id
            }
        })
        ctx.apiSuccess('ok')
    }
}

module.exports = FavaController;
