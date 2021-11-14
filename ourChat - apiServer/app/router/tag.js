module.exports = (app) => {
    const { router, controller } = app;
    router.get('/tag/list/:page', controller.tag.list)
    router.get('/tag/read/:id', controller.tag.read)

}