module.exports = (options, app) => {
    return async function errorHandler(ctx, next) {
        try {

            await next()
            if (ctx.status === 400 && !ctx.body) {
                ctx.body = {
                    msg: 'fail',
                    data: '404 错误'
                }
            }
        }
        catch (error) {
            ctx.app.emit('error', error, ctx)	//框架记录错误日志 log目录下 common error	
            const status = error.status || 500
            let err = status === 500 && app.config.env === 'prod' ? 'Internal Server Error' : error.message
            ctx.body = {
                msg: 'fail',
                data: err
            }
            if (status === 422 && error.message === 'Validation Failed') {

                if (error.errors && Array.isArray(error.errors)) err = error.errors[0].err[0] ? error.errors[0].err[0] : error.errors[0].err[1]
                ctx.body = {
                    msg: 'fail',
                    data: err
                }
            }
            ctx.status = status

        }
    }
}
// 写好之后需配置