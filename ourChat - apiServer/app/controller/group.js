'use strict';

const Controller = require('egg').Controller;

class GroupController extends Controller {
    async create() {
        const { ctx, app } = this
        let current_user_id = ctx.authUser.id
        ctx.validate({
            ids: {
                type: 'array',
                required: true,
                desc: '群成员id'
            }
        })
        let { ids } = ctx.request.body
        let friends = await app.model.Friend.findAll({
            where: {
                friend_id: ids,
                user_id: current_user_id
            },
            include: [{
                model: app.model.User,
                as: 'friendInfo',
                attributes: ['username', 'nickname']
            }],
        })
        let name = friends.map(v => v.nickname || v.friendInfo.username)
        name.unshift(ctx.authUser.nickname || ctx.authUser.username)

        let group = await app.model.Group.create({
            name: name.join(','),
            avatar: '',
            user_id: current_user_id
        })
        let data = friends.map(v => {
            return {
                user_id: v.friend_id,
                group_id: group.id
            }
        })
        data.unshift({
            user_id: current_user_id,
            group_id: group.id
        })
        let res = await app.model.GroupUser.bulkCreate(data)
        let message = {
            id: (new Date()).getTime(),	//唯一id 后端
            from_id: current_user_id,		//发送者id
            from_name: ctx.authUser.nickname || ctx.authUser.username,		//发送者昵称
            from_avatar: ctx.authUser.avatar,	//发送者头像
            to_id: group.id,		//接收人/群 id
            to_name: group.name,		//接收人/群 名称
            to_avatar: group.avatar,		//接收人/群 头像
            chat_type: 'group',	//接受类型
            type: 'system',		//消息类型
            data: '创建成功,可以开始聊天了',		//消息内容
            options: {},		//其他参数
            create_time: (new Date()).getTime(),	//创建时间
            is_remove: 0,		//是否撤回
            group
        }
        data.forEach(item => {
            ctx.sendAndSaveMessage(item.user_id, message)
        });
        ctx.apiSuccess(friends)
    }
    async usergroup() {
        const { app, ctx } = this
        let current_user_id = ctx.authUser.id
        let page = ctx.params.page ? ctx.params.page - 0 : 1
        let size = 10
        let offset = 10 * (page - 1)
        let groups = await app.model.Group.findAll({
            where: {
                status: 1,
                user_id: current_user_id
            },
            include: [{
                model: app.model.GroupUser,
                attributes: ['nickname', 'user_id']
            }],
            offset,
            limit: size
        })

        ctx.apiSuccess(groups)
    }
    async groupinfo() {
        const { app, ctx } = this
        const group_id = ctx.request.body.group_id
        const current_user_id = ctx.authUser.id
        let group = await app.model.Group.findOne({
            where: {
                id: group_id,
                status: 1
            },
            include: [{
                model: app.model.GroupUser,
                attributes: ['user_id', 'nickname'],
                include: [{
                    model: app.model.User,
                    attributes: ['id', 'username', 'avatar', 'nickname'],
                    as: 'userInfo'
                }]
            }]
        })
        if (!group) ctx.apiFail('群不存或被禁用')
        let index = group.group_users.findIndex(v => v.user_id === current_user_id)
        if (index === -1) ctx.apiFail('你不在该群中')
        ctx.apiSuccess(group)

    }
    async changegroupname() {
        const { app, ctx } = this
        const { group_id, group_name } = ctx.request.body
        const current_user_id = ctx.authUser.id
        let group = await app.model.Group.findOne({
            where: {
                id: group_id,
                status: 1
            },
            include: [{
                model: app.model.GroupUser,
                attributes: ['user_id', 'nickname'],
            }]
        })
        if (!group) ctx.apiFail('群不存或被禁用')
        let index = group.group_users.findIndex(v => v.user_id === current_user_id)
        if (index === -1) return ctx.apiFail('你不在该群中')
        if (current_user_id !== group.user_id) return ctx.apiFail('你不是群管理')
        group.name = group_name
        await group.save()
        let from_name = group.group_users[index].nickname || ctx.authUser.nickname || ctx.authUser.username
        let message = {
            id: (new Date()).getTime(),	//唯一id 后端
            from_id: current_user_id,		//发送者id
            from_name,		//发送者昵称
            from_avatar: ctx.authUser.avatar,	//发送者头像
            to_id: group.id,		//接收人/群 id
            to_name: group.name,		//接收人/群 名称
            to_avatar: group.avatar,		//接收人/群 头像
            chat_type: 'group',	//接受类型
            type: 'system',		//消息类型
            data: `${from_name}把群名称修改成了 '${group.name}'`,		//消息内容
            options: {},		//其他参数
            create_time: (new Date()).getTime(),	//创建时间
            is_remove: 0,		//是否撤回
            group
        }
        group.group_users.forEach(v => {
            ctx.sendAndSaveMessage(v.user_id, message)
        })
        ctx.apiSuccess(group)
    }
    async groupremark() {
        const { ctx, app } = this
        let current_user_id = ctx.authUser.id
        let { remark, group_id } = ctx.request.body
        let group = await app.model.Group.findOne({
            where: {
                id: group_id,
                status: 1
            },
            include: [{
                model: app.model.GroupUser,
                attributes: ['user_id', 'nickname'],
            }]
        })
        if (!group) return ctx.apiFail('该群被禁用或不存在')
        if (group.user_id !== current_user_id) return ctx.apiFail('您不是该群的管理员')
        group.remark = remark
        await group.save()
        let index = group.group_users.findIndex(v => v.user_id === current_user_id)
        let from_name = group.group_users[index].nickname || ctx.authUser.nickname || ctx.authUser.username
        let message = {
            id: (new Date()).getTime(),	//唯一id 后端
            from_id: current_user_id,		//发送者id
            from_name,		//发送者昵称
            from_avatar: ctx.authUser.avatar,	//发送者头像
            to_id: group.id,		//接收人/群 id
            to_name: group.name,		//接收人/群 名称
            to_avatar: group.avatar,		//接收人/群 头像
            chat_type: 'group',	//接受类型
            type: 'system',		//消息类型
            data: `[群公告] '${remark}'`,		//消息内容
            options: {},		//其他参数
            create_time: (new Date()).getTime(),	//创建时间
            is_remove: 0,		//是否撤回
            group
        }
        group.group_users.forEach(v => {
            ctx.sendAndSaveMessage(v.user_id, message)
        })
        ctx.apiSuccess('ok')
    }
    async groupnickname() {
        const { ctx, app } = this
        let current_user_id = ctx.authUser.id
        let { group_nickname, group_id } = ctx.request.body
        let group_user = await app.model.GroupUser.findOne({
            where: {
                group_id,
                user_id: current_user_id
            }
        })

        if (!group_user) return ctx.apiFail('你不在该群中')
        await group_user.update({
            nickname: group_nickname
        })
        ctx.apiSuccess('ok')
    }
    async exitgroup() {
        const { ctx, app } = this
        let current_user_id = ctx.authUser.id
        let { group_id } = ctx.request.body
        let group = await app.model.Group.findOne({
            where: {
                id: group_id,
                status: 1
            },
            include: [{
                model: app.model.GroupUser,
                attributes: ['user_id', 'nickname'],
            }]
        })
        let index = group.group_users.findIndex(v => v.user_id === current_user_id)
        if (index === -1) ctx.apiFail('你不在该群中')
        let from_name = group.group_users[index].nickname || ctx.authUser.nickname || ctx.authUser.username
        let message = {
            id: (new Date()).getTime(),	//唯一id 后端
            from_id: current_user_id,		//发送者id
            from_name,		//发送者昵称
            from_avatar: ctx.authUser.avatar,	//发送者头像
            to_id: group.id,		//接收人/群 id
            to_name: group.name,		//接收人/群 名称
            to_avatar: group.avatar,		//接收人/群 头像
            chat_type: 'group',	//接受类型
            type: 'system',		//消息类型
            data: ``,		//消息内容
            options: {},		//其他参数
            create_time: (new Date()).getTime(),	//创建时间
            is_remove: 0,		//是否撤回
            group
        }
        if (group.group_users[index].user_id === group.user_id) {
            //'删除该群'
            await app.model.Group.destroy({
                where: {
                    id: group_id
                }
            })
            message.data = '该群已被解散'
            group.group_users.forEach(v => {
                ctx.sendAndSaveMessage(v.user_id, message)
            })
            ctx.apiSuccess('ok')
        }
        else {
            //退出该群
            await app.model.GroupUser.destroy({
                where: {
                    group_id,
                    user_id: current_user_id
                }
            })
            message.data = `${from_name}已退出该群`
            group.group_users.forEach(v => {
                ctx.sendAndSaveMessage(v.user_id, message)
            })
            ctx.apiSuccess('ok')

        }
    }
    async qrcode() {
        const { ctx, app } = this
        ctx.qrcode(JSON.stringify({
            id: ctx.query.id,
            type: 'group',
            event: 'navigation'
        }))
    }
    async kickoff() {
        const { ctx, app } = this
        const current_user_id = ctx.authUser.id
        //         验证参数
        ctx.validate({
            group_id: {
                type: 'int',
                required: true
            },
            user_id: {
                type: "int",
                required: true
            }
        })
        let { group_id, user_id } = ctx.request.body
        if (user_id === current_user_id) return ctx.apiFail('您不能踢自己')
        let group = await app.model.Group.findOne({
            where: {
                id: group_id,
                status: 1
            },
            include: [{
                model: app.model.GroupUser,
                attributes: ['user_id', 'nickname'],
                include: [{
                    model: app.model.User,
                    attributes: ['username', 'nickname'],
                    as: 'userInfo'
                }]
            }]
        })
        //  验证群聊是否存在，你是否在该群中
        if (!group) return ctx.apiFail('群聊不存在')
        if (current_user_id != group.user_id) return ctx.apiFail('您不是该群管理员')
        group = JSON.parse(JSON.stringify(group))
        let indexMe = group.group_users.findIndex(v => v.user_id === current_user_id)
        // 你不是群成员
        if (indexMe === -1) return ctx.apiFail('您不在该群中')
        // 不能踢自己
        // 对方不是该群成员
        let indexHim = group.group_users.findIndex(v => v.user_id === user_id)
        if (indexHim === -1) return ctx.apiFail('该对象不在群聊中')
        // 你不是管理员
        // 踢出该群
        await app.model.GroupUser.destroy({
            where: {
                user_id,
                group_id
            }
        })
        ctx.apiSuccess('ok')

        // 返回成功
        // 构建消息格式
        let from_name = group.group_users[indexMe].nickname || group.group_users[indexMe].userInfo.nickname || group.group_users[indexMe].userInfo.username
        let kickname = group.group_users[indexHim].nickname || group.group_users[indexHim].userInfo.nickname || group.group_users[indexHim].userInfo.username
        let message = {
            id: (new Date()).getTime(),	//唯一id 后端
            from_id: current_user_id,		//发送者id
            from_name,		//发送者昵称
            from_avatar: ctx.authUser.avatar,	//发送者头像
            to_id: group.id,		//接收人/群 id
            to_name: group.name,		//接收人/群 名称
            to_avatar: group.avatar,		//接收人/群 头像
            chat_type: 'group',	//接受类型
            type: 'system',		//消息类型
            data: ` ${kickname} 被管理员踢出群聊`,		//消息内容
            options: {},		//其他参数
            create_time: (new Date()).getTime(),	//创建时间
            is_remove: 0,		//是否撤回
            group
        }
        group.group_users.forEach(v => {
            ctx.sendAndSaveMessage(v.user_id, message)
        })
        // 消息推送
    }
    async invite() {
        const { ctx, app } = this
        const current_user_id = ctx.authUser.id
        // 参数验证
        ctx.validate({
            group_id: {
                type: 'int',
                required: true
            },
            user_id: {
                type: "int",
                required: true
            }
        })
        let { group_id, user_id } = ctx.request.body
        // 群存在吗
        if (user_id === current_user_id) return ctx.apiFail('您已在该群中')
        let group = await app.model.Group.findOne({
            where: {
                id: group_id,
                status: 1
            },
            include: [{
                model: app.model.GroupUser,
                attributes: ['user_id', 'nickname'],
                include: [{
                    model: app.model.User,
                    attributes: ['username', 'nickname'],
                    as: 'userInfo'
                }]
            }]
        })
        if (!group) return ctx.apiFail('该群不在')
        // 是否已经是该群成员
        let friend = await app.model.User.findOne({
            where: {
                id: user_id,
                status: 1
            }
        })
        if (!friend) return ctx.apiFail('该好友不存在或被禁用')
        group = JSON.parse(JSON.stringify(group))
        let indexMe = group.group_users.findIndex(v => v.user_id === current_user_id)
        // 你不是群成员
        if (indexMe === -1) return ctx.apiFail('您不在该群中')
        // 不能拉自己
        // 有没有这个人 是不是好友
        let indexHim = group.group_users.findIndex(v => v.user_id === user_id)
        // 你不是群成员
        if (indexHim !== -1) return ctx.apiFail('已在该群中')
        await app.model.GroupUser.create({
            user_id,
            group_id
        })
        ctx.apiSuccess('ok')
        // 加入群聊 
        let from_name = group.group_users[indexMe].nickname || ctx.authUser.nickname || ctx.authUser.username
        // 组织消息格式
        let message = {
            id: (new Date()).getTime(),	//唯一id 后端
            from_id: current_user_id,		//发送者id
            from_name,		//发送者昵称
            from_avatar: ctx.authUser.avatar,	//发送者头像
            to_id: group.id,		//接收人/群 id
            to_name: group.name,		//接收人/群 名称
            to_avatar: group.avatar,		//接收人/群 头像
            chat_type: 'group',	//接受类型
            type: 'system',		//消息类型
            data: ` ${from_name} 将 ${friend.nickname || friend.username} 拉入了群聊`,		//消息内容
            options: {},		//其他参数
            create_time: (new Date()).getTime(),	//创建时间
            is_remove: 0,		//是否撤回
            group
        }
        // 推送

        group.group_users.forEach(v => {
            ctx.sendAndSaveMessage(v.user_id, message)
        })
        ctx.sendAndSaveMessage(user_id, message)
    }
    async checkin() {
        const { app, ctx } = this
        const group_id = ctx.request.body.group_id
        const current_user_id = ctx.authUser.id
        let group = await app.model.Group.findOne({
            where: {
                id: group_id,
                status: 1
            },
            include: [{
                model: app.model.GroupUser,
                attributes: ['user_id', 'nickname'],
                include: [{
                    model: app.model.User,
                    attributes: ['id', 'username', 'avatar', 'nickname'],
                    as: 'userInfo'
                }]
            }]
        })
        group = JSON.parse(JSON.stringify(group))

        if (!group) return ctx.apiFail('群不存或被禁用')
        let index = group.group_users.findIndex(v => v.user_id === current_user_id)
        if (index === -1) {
            return ctx.apiSuccess({
                status: false, group: {
                    id: group.id,
                    name: group.name,
                    avatar: group.avatar,
                    user_count: group.group_users.length
                }
            })
        }
        ctx.apiSuccess({
            status: true, group: {
                id: group.id,
                name: group.name,
                avatar: group.avatar,
                user_count: group.group_users.length
            }
        })

    }
    async addgroup() {
        const { ctx, app } = this
        const current_user_id = ctx.authUser.id
        // 参数验证
        ctx.validate({
            group_id: {
                type: 'int',
                required: true
            }
        })
        let { group_id } = ctx.request.body
        // 群存在吗
        let group = await app.model.Group.findOne({
            where: {
                id: group_id,
                status: 1
            },
            include: [{
                model: app.model.GroupUser,
                attributes: ['user_id', 'nickname'],
                include: [{
                    model: app.model.User,
                    attributes: ['username', 'nickname'],
                    as: 'userInfo'
                }]
            }]
        })
        if (!group) return ctx.apiFail('该群不存在')
        // 是否已经是该群成员
        group = JSON.parse(JSON.stringify(group))
        let indexMe = group.group_users.findIndex(v => v.user_id === current_user_id)
        // 你不是群成员
        if (indexMe !== -1) return ctx.apiFail('您已在该群中')
        // 不能拉自己
        await app.model.GroupUser.create({
            user_id: current_user_id,
            group_id
        })
        ctx.apiSuccess('ok')
        // 加入群聊 
        let from_name = ctx.authUser.nickname || ctx.authUser.username
        // 组织消息格式
        let message = {
            id: (new Date()).getTime(),	//唯一id 后端
            from_id: current_user_id,		//发送者id
            from_name,		//发送者昵称
            from_avatar: ctx.authUser.avatar,	//发送者头像
            to_id: group.id,		//接收人/群 id
            to_name: group.name,		//接收人/群 名称
            to_avatar: group.avatar,		//接收人/群 头像
            chat_type: 'group',	//接受类型
            type: 'system',		//消息类型
            data: ` ${from_name} 通过扫码群二维码加入群聊`,		//消息内容
            options: {},		//其他参数
            create_time: (new Date()).getTime(),	//创建时间
            is_remove: 0,		//是否撤回
            group
        }
        // 推送

        group.group_users.forEach(v => {
            ctx.sendAndSaveMessage(v.user_id, message)
        })
        ctx.sendAndSaveMessage(current_user_id, message)
    }

}

module.exports = GroupController;
