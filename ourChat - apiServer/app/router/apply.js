module.exports = (app) => {
    const { router, controller } = app;
    router.post('/addfriends', controller.apply.addFriends)
    router.get('/apply/:page', controller.apply.checkApplication)
    router.post('/handlefriends/:id', controller.apply.handle)

}