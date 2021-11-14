'use strict';

const Controller = require('egg').Controller;

class SearchController extends Controller {
    async searchUser() {
        const { app, ctx } = this
        ctx.validate({
            keyword: {
                type: 'string',
                required: true,
                comment: '关键字'
            }
        })
        let { keyword } = ctx.request.body

        let user = await app.model.User.findOne({
            where: {
                username: keyword
            },
            attributes: {
                exclude: ['password']
            }
        })
        // user = JSON.parse(JSON.stringify(user))
        // delete user.password
        this.ctx.apiSuccess(user)
    }
}

module.exports = SearchController;
