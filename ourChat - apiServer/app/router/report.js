module.exports = (app) => {
    const { router, controller } = app;
    router.post('/report', controller.report.report)

}