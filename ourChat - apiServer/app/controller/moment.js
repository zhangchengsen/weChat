'use strict';

const Controller = require('egg').Controller;

class MomentController extends Controller {
    async create() {
        const { app, ctx } = this
        const current_user_id = ctx.authUser.id
        ctx.validate({
            content: {
                type: 'string',
                required: false,
                desc: '内容'
            },
            image: {
                type: 'string',
                required: false,
                desc: '图片'
            },
            video: {
                type: 'string',
                required: false,
                desc: '音频'
            },
            location: {
                type: 'string',
                required: false,
                desc: '定位'
            },
            remind: {
                type: 'string',
                required: false,
                desc: '提醒谁看'
            },
            type: {
                type: 'string',
                required: true,
                desc: '类型',
                range: {
                    in: ['content', 'image', 'video']
                }
            },
            see: {
                type: 'string',
                required: false,
                defValue: 'all',
                desc: '谁可以看'
            }
        })
        let { content, image, video, type, location, remind, see } = ctx.request.body
        if (!ctx.request.body[type]) {
            return ctx.apiFail(`${type}不能为空`)
        }
        let moment = await app.model.Moment.create({
            content, image, video, location, remind, see,
            user_id: current_user_id
        })
        if (!moment) return ctx.apiFail('发布失败')
        this.pushmoment(moment)
        ctx.apiSuccess(moment)
    }
    // 推送`
    async pushmoment(moment) {
        try {
            let { app, ctx } = this

            let current_user_id = ctx.authUser.id
            let friends = await app.model.Friend.findAll({
                where: {
                    user_id: current_user_id,
                    isblack: 0
                },
                attributes: ['friend_id']
            })
            //获取谁可以看
            let sees = moment.see.split(':')
            let oType = sees[0]
            let o = {
                only: [],
                except: []
            }
            if ((sees[0] === 'only' || sees[0] === 'except') && sees[1]) {
                o[sees[0]] = (sees[1].split(',')).map(v => v - 0)
            }
            let addData = friends.filter(item => {
                return oType === 'all' || (oType === 'only' && o.only.includes(item.friend_id)) || (oType === 'except' && !o.except.includes(item.friend_id))
            })
            addData = addData.map(item => {
                return {
                    user_id: item.friend_id,
                    moment_id: moment.id,
                    own: 0
                }
            })
            addData.push({
                user_id: current_user_id,
                moment_id: moment.id,
                own: 1
            })
            await app.model.MomentTimeline.bulkCreate(addData)
            //推送
            let message = {
                avatar: ctx.authUser.avatar,
                user_id: current_user_id,
                type: 'new'
            }
            addData.forEach(item => {
                ctx.sendAndSaveMessage(item.user_id, message, 'moment')
            })
            if (moment.remind) {
                let arr = moment.remind.split(',')
                arr.forEach(user_id => {
                    ctx.sendAndSaveMessage(user_id, {
                        avatar: ctx.authUser.avatar,
                        user_id: current_user_id,
                        type: 'remind'
                    }, 'moment')
                })
            }
        }
        catch (e) {
            console.log(e)
        }

    }
    async like() {
        const { app, ctx } = this
        const current_user_id = ctx.authUser.id
        ctx.validate({
            id: {
                type: 'int',
                desc: '动态id',
                required: true
            }
        })
        const { id } = ctx.request.body
        let moment_timeline = await app.model.MomentTimeline.findOne({
            where: {
                user_id: current_user_id,
                moment_id: id
            },
            include: [{
                model: app.model.Moment,
                attributes: ['user_id'],
                include: [{
                    model: app.model.MomentLike,
                    attributes: ['user_id'],
                }]
            }]
        })
        if (!moment_timeline) {
            return ctx.apiSuccess('该朋友圈消息不存在')
        }
        let like = await app.model.MomentLike.findOne({
            where: {
                user_id: current_user_id,
                moment_id: id
            }
        })
        let message = {
            avatar: ctx.authUser.avatar,
            user_id: current_user_id,
            type: 'like'
        }
        if (like) {
            await like.destroy()
            ctx.apiSuccess('取消点赞成功')
        }
        else {
            await app.model.MomentLike.create({
                user_id: current_user_id,
                moment_id: id
            })
            ctx.apiSuccess('点赞成功')
        }
        // 通知作者
        if (moment_timeline.moment.user_id && moment_timeline.moment.user_id !== current_user_id) {
            ctx.sendAndSaveMessage(moment_timeline.moment.user_id, message, 'moment')
        }
        // 通知相关人
        moment_timeline.moment.moment_likes.forEach(item => {
            if (item.user_id !== current_user_id) {
                ctx.sendAndSaveMessage(item.user_id, message, 'moment');
            }
        });

    }
    async comment() {
        const { ctx, app } = this
        let current_user_id = ctx.authUser.id
        ctx.validate({
            id: {
                type: 'int',
                required: true,
                desc: '朋友圈id'
            },
            content: {
                type: 'string',
                required: true,
                desc: '评论',
            },
            reply_id: {
                type: 'int',
                required: false,
                defaultVal: 0,
                desc: '回复id'
            }
        })
        let { id, content, reply_id } = ctx.request.body
        //查询是否存在
        reply_id = reply_id ? reply_id - 0 : 0
        let momentTimeline = await app.model.MomentTimeline.findOne({
            where: {
                user_id: current_user_id,
                moment_id: id
            },
            include: [{
                model: app.model.Moment,
                attributes: ['user_id'],
                include: [{
                    model: app.model.MomentLike
                }]
            }]
        })
        if (!momentTimeline) {
            return ctx.apiFail('朋友圈消息不存在')
        }
        let comment = await app.model.MomentComment.create({
            user_id: current_user_id,
            moment_id: id,
            content,
            reply_id
        })
        ctx.apiSuccess(comment)
        //消息推送
        momentTimeline = JSON.parse(JSON.stringify(momentTimeline))

        let message = {
            avatar: ctx.authUser.avatar,
            user_id: current_user_id,
            type: 'comment'
        }
        // 通知作者
        if (momentTimeline.moment.user_id && momentTimeline.moment.user_id !== current_user_id) {
            ctx.sendAndSaveMessage(momentTimeline.moment.user_id, message, 'moment')
        }
        //通知相关人
        momentTimeline.moment.moment_likes.forEach(item => {
            if (item.user_id !== current_user_id) {
                ctx.sendAndSaveMessage(item.user_id, message, 'moment')
            }
        })
        //通知被回复人
        if (reply_id > 0) {
            let index = momentTimeline.moment.moment_likes.findIndex(item => {
                return item.user_id === reply_id
            })
            if (index !== -1) {
                ctx.sendAndSaveMessage(reply_id, message, 'moment')
            }
        }

    }
    async timeline() {
        const { ctx, app } = this;
        let current_user_id = ctx.authUser.id;

        let page = ctx.params.page ? parseInt(ctx.params.page) : 1;
        let limit = ctx.query.limit ? parseInt(ctx.query.limit) : 10;
        let offset = (page - 1) * limit;

        let rows = await app.model.MomentTimeline.findAll({
            where: {
                user_id: current_user_id
            },
            include: [{
                model: app.model.Moment,
                include: [{
                    model: app.model.User,
                    attributes: ['id', 'nickname', 'username', 'avatar']
                }, {
                    model: app.model.MomentComment,
                    attributes: {
                        exclude: ['created_at', 'updated_at']
                    },
                    include: [{
                        model: app.model.User,
                        as: "momentCommentUser",
                        attributes: ['id', 'nickname', 'username']
                    }, {
                        model: app.model.User,
                        as: "momentCommentReply",
                        attributes: ['id', 'nickname', 'username']
                    }]
                }, {
                    model: app.model.MomentLike,
                    attributes: ['user_id', 'moment_id'],
                    include: [{
                        model: app.model.User,
                        attributes: ['id', 'nickname', 'username']
                    }]
                }]
            }],
            offset,
            limit,
            order: [
                ['id', 'DESC']
            ]
        });

        let friends = await app.model.Friend.findAll({
            where: {
                user_id: current_user_id,
                lookhim: 1
            },
            attributes: ['friend_id']
        });

        let bfriends = await app.model.Friend.findAll({
            where: {
                friend_id: current_user_id,
                lookme: 1
            },
            attributes: ['user_id']
        });

        friends = friends.map(item => item.friend_id);

        bfriends = bfriends.map(item => item.user_id);

        friends = friends.filter(item => bfriends.includes(item));


        let res = [];
        rows.forEach(item => {
            if (friends.includes(item.moment.user_id) || item.moment.user_id === current_user_id) {
                let comments = [];
                item.moment.moment_comments.forEach(v => {
                    if (friends.includes(v.momentCommentUser.id) || v.momentCommentUser.id === current_user_id) {
                        comments.push({
                            content: v.content,
                            user: {
                                id: v.momentCommentUser.id,
                                name: v.momentCommentUser.nickname || v.momentCommentUser.username
                            },
                            reply: v.momentCommentReply ? {
                                id: v.momentCommentReply.id,
                                name: v.momentCommentReply.nickname || v.momentCommentReply.username
                            } : null
                        });
                    }
                });

                let likes = [];
                item.moment.moment_likes.forEach(v => {
                    if (friends.includes(v.user.id) || v.user.id === current_user_id) {
                        likes.push({
                            id: v.user.id,
                            name: v.user.nickname || v.user.username
                        });
                    }
                });

                res.push({
                    id: item.id,
                    user_id: item.moment.user_id,
                    user_name: item.moment.user.nickname || item.moment.user.username,
                    avatar: item.moment.user.avatar,
                    moment_id: item.moment_id,
                    content: item.moment.content,
                    image: item.moment.image ? item.moment.image.split(',') : [],
                    video: item.moment.video ? item.moment.video : null,
                    location: item.moment.location,
                    own: item.own,
                    created_at: item.created_at,
                    comments,
                    likes
                });
            }
        });

        ctx.apiSuccess(res);
    }

    // 某个用户的朋友圈列表
    async list() {
        const { ctx, app } = this;
        let current_user_id = ctx.authUser.id;

        let page = ctx.params.page ? parseInt(ctx.params.page) : 1;
        let limit = ctx.query.limit ? parseInt(ctx.query.limit) : 10;
        let offset = (page - 1) * limit;
        let user_id = ctx.query.user_id ? parseInt(ctx.query.user_id) : 0;
        let d = await app.model.Friend.findOne({
            where: {
                user_id: current_user_id,
                friend_id: user_id
            }
        })
        if (!d) console.log('无')


        let lookIds = [];

        if (!user_id) {
            // 本人
            user_id = current_user_id;
            lookIds = false;
        } else {
            // 验证我是否具备权限
            let f = await app.model.User.findOne({
                where: {
                    id: user_id,
                    status: 1
                },
                attributes: ['id', 'nickname', 'username', 'avatar'],
                include: [{
                    model: app.model.Friend,
                    as: "bfriends",
                    where: {
                        user_id: current_user_id
                    },
                    attributes: ['lookhim', 'isblack']
                }, {
                    model: app.model.Friend,
                    as: "friends",
                    where: {
                        friend_id: current_user_id
                    },
                    attributes: ['lookme', 'isblack']
                }]
            });

            // 用户是否存在
            if (!f) {
                return ctx.apiFail('用户不存在或已被禁用');
            }
            // 是否是好友关系
            if (!f.bfriends.length || !f.friends.length) {
                return ctx.apiSuccess([]);
            }
            // 不可见
            if (f.bfriends[0].isblack || f.friends[0].isblack || !f.bfriends[0].lookhim || !f.friends[0].lookme) {
                return ctx.apiSuccess([]);
            }
            // 获取当前用户所有好友（查找共同好友）
            let friends = await app.model.Friend.findAll({
                where: {
                    user_id: current_user_id,
                    isblack: 0
                },
                attributes: ['friend_id']
            });

            lookIds = friends.map(item => item.friend_id);

        }

        let rows = await app.model.Moment.findAll({
            where: {
                user_id
            },
            include: [{
                model: app.model.User,
                attributes: ['id', 'nickname', 'username', 'avatar']
            }, {
                model: app.model.MomentComment,
                attributes: {
                    exclude: ['created_at', 'updated_at']
                },
                include: [{
                    model: app.model.User,
                    as: "momentCommentUser",
                    attributes: ['id', 'nickname', 'username']
                }, {
                    model: app.model.User,
                    as: "momentCommentReply",
                    attributes: ['id', 'nickname', 'username']
                }]
            }, {
                model: app.model.MomentLike,
                attributes: ['user_id', 'moment_id'],
                include: [{
                    model: app.model.User,
                    attributes: ['id', 'nickname', 'username']
                }]
            }],
            offset,
            limit,
            order: [
                ['id', 'DESC']
            ]
        });

        let res = [];
        rows.forEach(item => {
            let comments = [];
            item.moment_comments.forEach(v => {
                if (!lookIds || lookIds.includes(v.momentCommentUser.id) || v.momentCommentUser.id === current_user_id) {
                    comments.push({
                        content: v.content,
                        user: {
                            id: v.momentCommentUser.id,
                            name: v.momentCommentUser.nickname || v.momentCommentUser.username
                        },
                        reply: v.momentCommentReply ? {
                            id: v.momentCommentReply.id,
                            name: v.momentCommentReply.nickname || v.momentCommentReply.username
                        } : null
                    })
                }
            });

            let likes = [];
            item.moment_likes.forEach(v => {
                if (!lookIds || lookIds.includes(v.user.id) || v.user.id === current_user_id) {
                    likes.push({
                        id: v.user.id,
                        name: v.user.nickname || v.user.username
                    });
                }
            });

            res.push({
                user_id: item.user_id,
                user_name: item.user.nickname || item.user.username,
                avatar: item.user.avatar,
                moment_id: item.id,
                content: item.content,
                image: item.image ? item.image.split(',') : [],
                video: item.video ? item.video : null,
                location: item.location,
                own: 1,
                created_at: item.created_at,
                comments,
                likes
            });
        });

        ctx.apiSuccess(res);
    }
}

module.exports = MomentController;
