var qr = require('qr-image');
module.exports = {
    apiSuccess(data = '', msg = '', code = 200) {
        this.status = code
        this.body = { msg, data }			//this相当于this.context
    },
    apiFail(data = '', msg = 'fail', code = 400) {
        this.status = code
        this.body = { msg, data }
    },
    getToken(value) {
        return this.app.jwt.sign(value, this.app.config.jwt.secret);
    },
    checkToken(token) {
        return this.app.jwt.verify(token, this.app.config.jwt.secret)
    },
    async sendAndSaveMessage(to_id, message, msg = 'ok') {
        const { app, service } = this;
        let current_user_id = this.authUser.id;

        // 拿到接受用户所在子进程
        let pid = await service.cache.get('online_' + to_id);

        if (pid) {
            // 消息推送
            app.messenger.sendTo(pid, 'send', {
                to_id, message, msg
            });
            // 存到历史记录当中
            if (msg === 'ok') {
                service.cache.setList(`chatlog_${to_id}_${message.chat_type}_${current_user_id}`, message);
            }
        } else {
            service.cache.setList('getmessage_' + to_id, {
                message,
                msg
            });
        }
    },
    async send(to_id, message, msg = 'ok') {
        const { app, service } = this;
        let current_user_id = this.authUser.id;

        // 拿到接受用户所在子进程
        let pid = await service.cache.get('online_' + to_id);

        if (pid) {
            // 消息推送
            app.messenger.sendTo(pid, 'send', {
                to_id, message, msg
            });
        }

    },
    qrcode(url) {
        var img = qr.image(url, { size: 10 })
        this.response.type = 'image/png'
        this.body = img
    },
    // 生成唯一id
    genID(length) {
        return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
    },
    async online(user_id) {
        const { service, app } = this;
        let pid = process.pid;
        // 下线其他设备
        let opid = await service.cache.get('online_' + user_id);
        if (opid) {
            // 通知对应进程用户下线
            app.messenger.sendTo(opid, 'offline', user_id);
        }
        // 存储上线状态
        service.cache.set('online_' + user_id, pid);
    }
}