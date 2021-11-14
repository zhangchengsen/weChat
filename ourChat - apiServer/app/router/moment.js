module.exports = (app) => {
    const { router, controller } = app;
    router.post('/moment/create', controller.moment.create)
    router.post('/moment/like', controller.moment.like)
    router.post('/moment/comment', controller.moment.comment)
    router.get('/moment/timeline/:page', controller.moment.timeline)
    router.get('/moment/list/:page', controller.moment.list)

}