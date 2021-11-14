'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
function middleware(ctx, next) {
  // console.log('open', ctx.starttime);
  return next();
}
// 配置路由中间件
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  require('./router/user')(app)
  require('./router/search')(app)
  require('./router/apply')(app)
  require('./router/friend')(app)
  require('./router/report')(app)
  require('./router/group')(app)
  require('./router/common')(app)
  require('./router/fava')(app)
  require('./router/moment')(app)
  require('./router/tag')(app)

  app.ws.use(async (ctx, next) => {
    // 获取参数 ws://localhost:7001/ws?token=123456
    // ctx.query.token
    // 验证用户token
    let user = {};
    let token = ctx.query.token;

    try {
      user = ctx.checkToken(token);
      // 验证用户状态

      let userCheck = await app.model.User.findByPk(user.id);
      if (!userCheck) {
        ctx.websocket.send(JSON.stringify({
          msg: "fail",
          data: '用户不存在'
        }));
        return ctx.websocket.close();
      }
      if (!userCheck.status) {
        ctx.websocket.send(JSON.stringify({
          msg: "fail",
          data: '你已被禁用'
        }));
        return ctx.websocket.close();
      }
      // 用户上线

      app.ws.user = app.ws.user ? app.ws.user : {};
      // 下线其他设备
      if (app.ws.user[user.id]) {
        app.ws.user[user.id].send(JSON.stringify({
          msg: "fail",
          data: '你的账号在其他设备登录'
        }));
        app.ws.user[user.id].close();
      }
      // 记录当前用户id

      ctx.websocket.user_id = user.id;
      app.ws.user[user.id] = ctx.websocket;

      ctx.online(user.id)

      await next();
    } catch (err) {
      console.log(err);
      let fail = err.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
      ctx.websocket.send(JSON.stringify({
        msg: "fail",
        data: fail
      }))
      // 关闭连接
      ctx.websocket.close();
    }
  });
  app.ws.route('/ws', app.controller.chat.connect)
  router.post('/chat/send', app.controller.chat.send)
  router.post('/chat/getoffline', app.controller.chat.getoffline)
  router.post('/chat/recall', app.controller.chat.recall)
};
