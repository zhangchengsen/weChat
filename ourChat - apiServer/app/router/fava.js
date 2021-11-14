module.exports = (app) => {
    const { router, controller } = app;
    router.post('/fava/create', controller.fava.create)
    router.get('/fava/list/:page', controller.fava.list)
    router.post('/fava/remove', controller.fava.remove)


}