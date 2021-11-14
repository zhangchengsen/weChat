module.exports = (app) => {
    const { router, controller } = app;
    router.post('/register', controller.user.reg)
    router.get('/logout', controller.user.logout)
    router.post('/login', controller.user.login)
    router.post('/update', controller.user.update)
    router.post('/breakup', controller.user.breakup)
}