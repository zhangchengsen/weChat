module.exports = (app) => {
    const { router, controller } = app;
    router.post('/search/user', controller.search.searchUser)
}