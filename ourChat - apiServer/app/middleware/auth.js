const UserController = require("../controller/user")

module.exports = (options, app) => {
    return async function errorHandler(ctx, next) {
        const token = ctx.header.token || ctx.query.token
        if (!token) ctx.throw(400, '您没有访问该接口的权限')
        let user = {}
        try {
            user = ctx.checkToken(token)
        } catch (err) {
            let fail = err.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
            ctx.throw(400, fail)
        }
        let t = await ctx.service.cache.get('user_' + user.id)
        if (!t || t != token) {
            ctx.throw(400, '您没有访问该接口的权限')

        }
        let curUser = await app.model.User.findByPk(user.id)
        if (!curUser.status) ctx.throw(400, '该用户不存在或者被禁用')
        ctx.authUser = curUser
        return next()
    }
}
// 写好之后需配置