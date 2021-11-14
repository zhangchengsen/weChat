'use strict';

const Controller = require('egg').Controller;

class ReportController extends Controller {
    async report() {
        const { ctx, app } = this
        const current_user_id = ctx.authUser.id
        ctx.validate({
            category: {
                type: 'string',
                required: true,
                desc: '分类'
            },
            reported_id: {
                type: 'int',
                required: true,
                desc: '被举报人/群组'
            },
            reported_type: {
                type: 'string',
                required: true,
                desc: '举报类型'
            },
            content: {
                type: 'string',
                required: true,
                desc: '举报内容'
            },
        })
        let { category, reported_type, reported_id, content } = ctx.request.body
        if (category === 'user' && reported_id === current_user_id) {
            ctx.throw(400, '不能举报自己')
        }
        let user = app.model.User.findOne({
            where: {
                id: reported_id,
                status: 1
            }
        })
        if (!user) {
            ctx.throw(400, '举报对象/群组不存在')
        }
        if (await app.model.Report.findOne({
            where: {
                reported_id,
                user_id: current_user_id,
                status: 'pending'
            }

        })) {
            ctx.throw('举报等待受理中,请不要重复举报')
        }
        await app.model.Report.create({
            reported_id,
            user_id: current_user_id,
            content,
            category,
            reported_type
        })
        ctx.apiSuccess('举报成功')
    }
}

module.exports = ReportController;
