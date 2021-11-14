// app/controller/chat.js
const Controller = require('egg').Controller;

class ChatController extends Controller {
    // 连接socket
    async connect() {
        const { ctx, app, service } = this;
        if (!ctx.websocket) {
            ctx.throw(400, '非法访问');
        }

        // console.log(`clients: ${app.ws.clients.size}`);

        // 监听接收消息和关闭socket
        ctx.websocket
            .on('message', msg => {
                // console.log('接收消息', msg);
            })
            .on('close', (code, reason) => {
                // 用户下线
                console.log('用户下线', code, reason);
                let user_id = ctx.websocket.user_id;
                // 移除redis中的用户上线记录
                service.cache.remove('online_' + user_id);
                if (app.ws.user && app.ws.user[user_id]) {
                    delete app.ws.user[user_id];
                }
            });

    }
    async send() {
        const { ctx, app } = this;
        const current_user_id = ctx.authUser.id
        ctx.validate({
            to_id: {
                type: 'int',
                required: true,
                desc: '接收人/群id'
            },
            chat_type: {
                type: 'string',
                required: true,
                range: {
                    in: ['user', 'group']
                },
                desc: '聊天对象类型'
            },
            type: {
                type: 'string',
                required: true,
                range: {
                    in: ['text', 'image', 'video', 'audio', 'emoticon', 'card']
                },
                desc: '类型'
            },
            data: {
                type: 'string',
                required: true,
                desc: '消息内容'
            },
            options: {
                type: 'string',
                required: true
            }
        })
        let { to_id, chat_type, data, type, options } = ctx.request.body

        // 单聊
        if (chat_type === 'user') {
            let friend = await app.model.Friend.findOne({
                where: {
                    user_id: to_id - 0,
                    friend_id: current_user_id,
                    isblack: 0
                },
                include: [{
                    model: app.model.User,
                    as: 'userInfo'
                }, {
                    model: app.model.User,
                    as: 'friendInfo'
                }]
                // 查看对方是否拉黑你
            })
            if (!friend) {
                return apiFail('对方不存在或已将你拉黑')
            }
            if (friend.userInfo.status === 0) {
                return apiFail('该用户已被禁用')
            }
            let from_name = friend.friendInfo.nickname ? friend.friendInfo.nickname : friend.friendInfo.username
            if (friend.nickname) {
                from_name = friend.nickname
            }
            // 组织信息格式
            let message = {
                id: (new Date()).getTime(),
                to_id: to_id - 0,
                to_avatar: friend.userInfo.avatar,
                to_name: friend.userInfo.nickname ? friend.userInfo.nickname : friend.userInfo.username,
                from_id: current_user_id,
                from_avatar: friend.friendInfo.avatar,
                from_name,
                chat_type,
                type,
                data,
                options: {},  //其他参数
                create_time: (new Date()).getTime(), //创建时间
                isremove: 0,     //  是否测回
            }
            if (message.type === 'video') {
                message.options.poster = message.data + '?x-oss-process=video/snapshot,t_10,m_fast,w_300,f_png'
            }
            if (message.type === 'audio') {
                options = JSON.parse(options)
                message.options.time = options.time || 1
            }
            if (message.type === 'card') {
                message.options = options || '{}'
            }
            ctx.sendAndSaveMessage(to_id, message)

            ctx.service.cache.setList(`chatlog_${current_user_id}_user_${to_id}`, message)
            return ctx.apiSuccess(message)
        }
        // 单聊
        // 群聊
        else {
            let group = await app.model.Group.findOne({
                where: {
                    id: to_id,
                    status: 1
                },
                include: [{
                    model: app.model.GroupUser,
                    attribute: ['user_id', 'nickname']
                }]
            })

            if (!group) {
                return ctx.apiFail('群聊不存在或者被警用')
            }
            group = JSON.parse(JSON.stringify(group))

            let index = group.group_users.findIndex(v => {
                return v.user_id === current_user_id
            })
            if (index === -1) return apiSuccess.apiFail('你不是该群的成员')
            let from_name = group.group_users[index].nickname
            let message = {
                id: (new Date()).getTime(),
                to_id,
                to_avatar: group.avatar,
                to_name: group.name,
                from_id: current_user_id,
                from_avatar: group.avatar,
                from_name: from_name || ctx.authUser.nickname || ctx.authUser.username,
                chat_type: 'group',
                type,
                data,
                options: {},  //其他参数
                create_time: (new Date()).getTime(), //创建时间
                isremove: 0,     //  是否测回
                group
            }
            if (message.type === 'video') {
                message.options.poster = message.data + '?x-oss-process=video/snapshot,t_10,m_fast,w_300,f_png'
            }
            if (message.type === 'audio') {
                options = JSON.parse(options)
                message.options.time = options.time || 1
            }
            if (message.type === 'card') {
                message.options = options || '{}'
            }
            group.group_users.forEach(item => {
                if (item.user_id !== current_user_id) {
                    ctx.sendAndSaveMessage(item.user_id, message)
                }
            })
            ctx.apiSuccess(message)
        }
        // 群聊

    }
    async getoffline() {
        const { ctx, app, service } = this
        let current_user_id = ctx.authUser.id
        let key = 'getmessage_' + current_user_id
        //拿到缓存
        let list = await service.cache.getList(key)
        //清楚离线消息
        await service.cache.remove(key)
        //批量推送
        list.forEach(async (message) => {
            message = JSON.parse(message)
            ctx.sendAndSaveMessage(current_user_id, message.message, message.msg)
            console.log('推送离线消息')
        })
        ctx.apiSuccess('ok')


    }
    async recall() {
        const { app, ctx } = this
        const current_user_id = ctx.authUser.id
        ctx.validate({
            to_id: {
                type: 'int',
                required: true,
                desc: '接收人 / 群id'
            },
            chat_type: {
                type: 'string',
                required: true,
                range: {
                    in: ['user', 'group']
                },
                desc: '接受类型'
            },
            id: {
                type: 'int',
                required: true,
                desc: '消息id'
            }
        })

        let { id, chat_type, to_id } = ctx.request.body
        // console.log('to_id', to_id)
        let message = {
            from_id: current_user_id,
            to_id,
            chat_type,
            id,
            update_time: (new Date).getTime(),
            data: '撤回了一条消息'

        }
        if (chat_type === 'user') {
            ctx.sendAndSaveMessage(to_id, message, 'recall')
            return ctx.apiSuccess(message)
        }
        else {
            let group = await app.model.Group.findOne({
                where: {
                    id: to_id,
                    status: 1
                },
                include: [{
                    model: app.model.GroupUser,
                    attributes: ['user_id']
                }]
            })
            group = JSON.parse(JSON.stringify(group))
            if (!group) return ctx.apiFail('该群不存在或已被禁用')
            let index = group.group_users.findIndex(item => item.user_id === current_user_id)
            if (index === -1) return ctx.apiFail('您不在该群中')

            group.group_users.forEach(item => {
                if (item.user_id !== current_user_id) {
                    ctx.sendAndSaveMessage(item.user_id, message, 'recall')
                }
            })
            return ctx.apiSuccess(message)
        }
        ctx.apiSuccess('ok')
    }
}
module.exports = ChatController;