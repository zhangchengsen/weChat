module.exports = (app) => {
    const { router, controller } = app;
    router.post('/addgroup', controller.group.create)
    router.get('/user/group/:page', controller.group.usergroup)
    router.post('/user/group', controller.group.groupinfo)
    router.post('/group/check', controller.group.checkin)
    router.post('/name/group', controller.group.changegroupname)
    router.post('/remark', controller.group.groupremark)
    router.post('/nickname/group', controller.group.groupnickname)
    router.post('/exit/group', controller.group.exitgroup)
    router.post('/group/kickoff', controller.group.kickoff)
    router.post('/group/invite', controller.group.invite)
    router.get('/group/qr', controller.group.qrcode)
    router.post('/group/add', controller.group.addgroup)
}