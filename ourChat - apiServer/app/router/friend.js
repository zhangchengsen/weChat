module.exports = (app) => {
    const { router, controller } = app;
    router.get('/friendslist', controller.friend.friendslist)
    router.get('/view/user/:id', controller.friend.viewuser)
    router.post('/isblack/:id', controller.friend.isblack)
    router.post('/isstar/:id', controller.friend.starfriends)
    router.post('/setmonent/:id', controller.friend.setmonent)
    router.post('/setfriendtag/:id', controller.friend.setfriendtag)
    router.get('/friend/qr', controller.friend.qrcode)
}