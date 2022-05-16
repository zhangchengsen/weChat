import $http from './request.js'
import $U from './util.js'
import $store from '@/store/store.js'
class chat {
	constructor(arg) {
		this.url = arg.url
		this.isOnline = false
		this.socket = null
		this.inConnecting = false
		this.reconnectTime = 0
		this.onlineTime = 0
		this.isFirst = false
		/* 获取用户信息 */
		let user = $U.getStorage('user')
		this.user = user ? JSON.parse(user) : ''
		this.To = false
		if(this.user && this.user.token) 
		{
			this.connectSocket()
		}
	}
	connectSocket() {
		if(this.inConnecting) return 
		this.inConnecting = true
		this.socket = uni.connectSocket({
			url:this.url + '?token=' + this.user.token,
			complete:() => {
				console.log('重连次数',this.inConnecting)
				this.inConnecting = false
			},
			success: () => {
			}
		})
		this.socket.onOpen(()=>this.onOpen())
		this.socket.onMessage((res)=>this.onMessage(res))
		this.socket.onError((err)=>this.onError(err))
		this.socket.onClose(()=>this.onClose())
	}
	onOpen() {
		// console.log('socket已连接')
		this.isOnline = true
	}
	onMessage(data) {
		let res = JSON.parse(data.data)
		console.log(res.data,'msg')
		switch (res.msg) {
			case 'fail' :
			if('你的账号在其他设备登录' === res.data) {
				if(!this.isFirst)
				uni.showToast({
					duration:3500,
					icon:'none',
					title:'你的账号在其他设备登录'
				})
				this.isFirst = true
				this.onlineTime++
				if(this.onlineTime >= 4) {
					this.inConnecting = true
					return uni.showModal({
						title:'您的设备已在其他地方登陆,是否重新登录?',
						confirmColor:'#007AFF',
						confirmText:'确定',
						cancelText:'取消',
						success: (res) => {
							if(res.confirm){
								this.inConnecting = false
								this.onlineTime = 1
								this.connectSocket()
								
							}
						}
					})
					// uni.reLaunch({
					// 	url:'/pages/common/login',
						
					// 	success: () => {
					// 		$store.dispatch('logout')
					// 		uni.showToast({
					// 			title:'你的账号在其他设备登录'
					// 		})
					// 	},
					// 	fail: (err) => {
					// 		console.log(err) 	
					// 	}
					// })
				}
			}
			else {
				uni.showToast({
					icon:'none',
					title:res.data
				})
			}
			break;
			case 'recall' :
				this.handleOnRecall(res.data)
			return
			case 'getApply':
				$store.dispatch('getApply')
			break;
			case 'moment':
			// m
				// console.log('moment正在处理')
				this.handleMoment(res.data)
				break;
			default :
				this.handleOnMessage(res.data)
			break;
		}
	}
	onError(err) {
		// console.log('socket发生错误',JSON.stringify(err))
		this.close()
		
	}
	onClose() {
		// console.log('socket已断开')
		this.close()
		
		
	}
	close() {
		this.isOnline = false
		if(this.socket) {
			this.socket.close()
			this.socket = null
		}
		if($store.state.user.user) {
			this.reconnect()
		}
	}
	reconnect() {
		if(this.isOnline || this.inConnecting) return 
		if(this.reconnectTime > 52) return uni.showToast({
			title:'请重新登录',
			icon:'none'
		})
		if(this.reconnectTime % 5 == 4) {
			return uni.showModal({
				title:'已断线,是否重连?',
				confirmColor:'#007AFF',
				confirmText:'确定',
				cancelText:'取消',
				success: (res) => {
					if(res.confirm){
						
						this.connectSocket()
					}
				}
			})
		}
		else {
			this.reconnectTime += 1
			this.connectSocket()
		}
		
		
	}
	createChatObject(detail) {
		this.To = {
			...detail
		}
		// console.log('聊天对象已创建',this.To)
	}
	destoryChatObject() {
		this.To = false
		// console.log('聊天对象已销毁')
	}
	
	
	
	send(message,onProgress,params1='',params2='') {
		
		
		return new Promise( async (result,reject)=>{
			// 添加消息记录 
			//更新绘话列表
			if(params1) {
				message.data = params1
				message.type = params2
			}
			let { k } = this.addChatDetail(message)
			// this.updateChatDetail
			this.updateChatList(message)
			if(!this.checkOnline()) return reject('未上线')
			let obj = {
				to_id: this.To.id - 0,
				chat_type:  this.To.chat_type,
				type:message.type,
				data:message.data,
				options:JSON.stringify(message.options)
			}
			// let isUpload = (message.type != 'text' && message.type != 'emoticon' && !message.data.startsWith('http') && message.type != 'data')
			let isUpload = (message.type !== 'text' && message.type !== 'emoticon' && message.type !== 'card' && !message.data.startsWith('http://ymtx-1'))
			console.log('message.data',message.data)
			let uploadRes = ''
			if (isUpload) {
			    uploadRes = await $http.upload('/upload',{
			        filePath:message.data,    
			    },onProgress)
			}
			//提交到后端
			obj.data = isUpload ? uploadRes : message.data
			
			console.log('obj',obj)
			$http.post('/chat/send',obj)
			.then(res=>{
				console.log('后端返回发送的 res',res)
				message.id = res.id - 0
				message.sendStatus = 'success'
				if(res.options && res.options.poster)
				{
					message.options = res.options
				}
				// res.sendStatus = 'success'
				if(isUpload) message.data = res.data
				this.updateChatDetail(message,k)
				result(res)     
			}) 
			.catch(err=>{
				message.sendStatus = 'fail'
				this.updateChatDetail(message,k)
				reject(err) 
			})
		})
	}
	
	
	
	formatSendData(params) {
		return {
			id:0,	//唯一id 后端生成
			from_avatar:this.user.avatar,
			from_name:this.user.nickname ? this.user.nickname : this.user.username,
			from_id:this.user.id - 0,
			to_id:params.to_id || this.To.id,
			to_name:params.to_name || this.To.name,
			to_avatar:params.to_avatar || this.To.avatar,
			chat_type:params.chat_type|| this.To.chat_type,
			type:params.type,
			data:params.data,
			options:params.options ? params.options : {},
			create_time:(new Date()).getTime(),
			isremove:0,
			sendStatus:params.sendStatus ? params.sendStatus : 'pending'
			
		}
	}
	addChatDetail(message,isSend = true) {
		// console.log('addChatDetail',message)
		let id = message.chat_type === 'user' ? (isSend ? message.to_id - 0 : message.from_id) - 0 :message.to_id - 0
		
		let key = `chatDetail_${this.user.id}_${message.chat_type}_${id}`
		
		let list = this.getChatDetail(key)
		// console.log(list)
		message.k = 'k' + list.length
		list.push(message)
		console.log('push了message',list)
		this.setStorage(key,list)
		
		return {
			data:message,
			k:message.k
		}
	}
	getChatDetail(key) {
		key = key ? key : `chatDetail_${this.user.id}_${this.To.chat_type}_${this.To.id}`
		return this.getStorage(key)
	}
	getChatList() {
		let key = 'chatlist_' + this.user.id
		return this.getStorage(key)
	}
	getStorage(key) {
		let list = $U.getStorage(key)
		return list ? JSON.parse(list) : []
	}
	setStorage(key,value) {
		return $U.setStorage(key,JSON.stringify(value))
	}
	//历史记录
	async updateChatDetail(message,k,isSend = true) {
		// console.log('message updateChatDetail',message)
	    let id = message.chat_type === 'user' ? (isSend ? message.to_id - 0 : message.from_id - 0) :message.to_id - 0
	    let key = `chatDetail_${this.user.id}_${message.chat_type}_${id}`
	 	//获取聊天记录
	    let list = this.getChatDetail(key)	
	  	//获取存储     
	   let index = list.findIndex(item=>item.k === k)
	   list[index] = message
	   this.setStorage(key,list)
	   console.log('更新会话',list)
	}
	
	
	
	updateChatList(message,isSend = true) {
	    //获取本地存储中所有会话列表
	    let list = this.getChatList()
	    //是否处于当前聊天中
	    let isCurrentChat = false
	    //接收人/群id
	    let id = 0
	    let avatar = ''
	    // let to_name = ''
		let name = ''
	    //判断群聊还是私聊
	    if(message.chat_type === 'user') {
	        //聊天对象是否存在
	        if(this.To) {
	            //如果是发送者 判断发出去的消息和当前聊天对象是否是同一个人
	     	//目的是不用更新角标和未读数
	        	isCurrentChat = isSend ? this.To.id === message.to_id - 0 :  this.To.id === message.from_id - 0
	                  
	        } else {
	    	isCurrentChat = false  
	        }
	        id = isSend ? message.to_id - 0 : message.from_id - 0
	        avatar = isSend ? message.to_avatar : message.from_avatar
	        name = isSend ? message.to_name : message.from_name
	    } else { //群聊
	        isCurrentChat = this.To && (this.To.id === message.to_id - 0)
			id = message.to_id - 0
			avatar = message.to_avatar
			name = message.to_name
			// console.log('message群聊name',message.to_name)
	    }
		// 会话是否存在
		let index = list.findIndex(item=>{
			return item.chat_type === message.chat_type && item.id - 0 ===id
		})
		
		let data =  this.formatChatItemData(message,isSend)
		let noreadnum = isSend || isCurrentChat ? 0 : 1 //未读数
		if(index === -1) {	//创建会话列表
			let chatItem = {
			     id,
			     chat_type:message.chat_type,
			     avatar,
			     name,
			     update_time:(new Date()).getTime(),
			     data,
			     type:message.type,
			     noreadnum,	//未读数
			     istop:false,	//是否置顶
			     shownickname:0,  //是否显示昵称
			     nowarn:0,	//消息免打扰,
			     strongwarn:0	//是否开启强提醒
			     
			     //user_id:0,	//群管理员id
			     //remark:'公告',
			     //invite_confirm:0	//邀约确认
			 }
			 if(message.chat_type === 'group' && message.group) {
				 chatItem = {
					 ...chatItem,
					 user_id:message.group.user_id - 0,	
					 remark:'公告',
					 invite_confirm:1
				 }
				 console.log('chatItem')
			 }
			 list.unshift(chatItem)
		}
		else {	//有会话列表
			console.log('有会话列表')
			let item = list[index]
			//更新该会话最后一条消息 时间 内容 类型 未读数
			item.update_time = (new Date()).getTime()
			item.data = data
			item.type = message.type	
			
			//更新未读数 数组置顶
			item.noreadnum += noreadnum 
			item.name = name
			list = this.listToFirst(list,index)
		}
		let key = `chatlist_${this.user.id}`
		this.setStorage(key,list)
		this.updateBadge(list)
		    //跟新通知vuex中的聊天会话列表
		uni.$emit('onUpdateChatList',list)
		console.log('会话列表',list)
	}
	
	
	
	async updateBadge(list = false) {
	    list = list ? list : this.getChatList()
	    //统计所有未读数
	    let total = 0
	    list.forEach(item=>{
	        total += item.noreadnum    
	    })
	    if(total) {
			uni.setTabBarBadge({
			    index:0,
			    text:total <= 99 ? total.toString() : '99+'    
			})           
	    }
	    else{
	    	uni.removeTabBarBadge({
	     		index:0           	   
	     	})
	    }
	   uni.$emit('totalNoreadnum',total)
	}
	listToFirst(arr,index) {
	    if(index != 0) {
	        arr.unshift(arr.splice(index,1)[0])    
	    }
	    return arr
	}
	checkOnline() {
	    if(!this.isOnline) {
	        this.reconnectConfirm()    
	        return false
	    }
		return true
	}
	reconnectConfirm() {
	    uni.showModal({
	        content:'你已经断线,是否重连',
	        confirmText:'重新连接',
	        success:(res)=>{
	            if(res.confirm)
	            this.connectSocket()        
	        }    
	    })
	}
	async handleOnMessage(message) {
	    //添加消息记录到本地存储中
		// console.log('handleOnMessage',message)
	    let {data} = this.addChatDetail(message,false)
	    //更新消息列表
	    this.updateChatList(data,false)
	    //全局通知
	    uni.$emit('onMessage',data)
	}
	readChatItem(id,chat_type) {
		// 读取数据
		let list = this.getChatList()
		// 修改数据
		let index = list.findIndex( v=>{
			return v.chat_type === chat_type && v.id - 0 === id -  0 
		})
		// 存储 
		// 重置角标数
		if(index !== -1) {
			list[index].noreadnum = 0
			let key = `chatlist_${this.user.id}`
			this.setStorage(key,list)    
			this.updateBadge()
			uni.$emit('onUpdateChatList',list)
		}
	}
	// 获取当前会话
	getChatListItem(id,chat_type) {
	     let list = this.getChatList()
	     let index = list.findIndex(item=>item.id - 0 === id - 0 && item.chat_type === chat_type)
	     if(index !== -1 ) {
	         return list[index]     
	     }
	     return false
	}
	removeChatItem(id,chat_type) {
	    let list = this.getChatList()
	    // 修改数据
	    let index = list.findIndex( v=>{
	    	return v.chat_type === chat_type && v.id - 0 === id - 0    
	    })
	    // 存储 
	    // 重置角标数
	    if(index !== -1) {
	    	list.splice(index,1)
	    	let key = `chatlist_${this.user.id}`
	    	this.setStorage(key,list)    
	    	this.updateBadge()
	    	uni.$emit('onUpdateChatList',list)
	    }
	}
	updateChatItem(where,data) {
	    let list = this.getChatList()
	    let index = list.findIndex(item => item.id - 0 === where.id - 0 && item.chat_type === where.chat_type)
		console.log('list[index]',list[index])
	    if(index !== -1) {	
	    	//更新数据
			
			if(typeof data === 'function')
			{
				// console.log('data是function')
				list[index] = data(list[index])
			}
			else {
				list[index] = data
			}
	    	let key = `chatlist_${this.user.id}`
	    	this.setStorage(key,list)    
	    	this.updateBadge()
	    	uni.$emit('onUpdateChatList',list)
	    }
	}
	clearChatItem(where,data) {
	    let key = `chatDetail_${this.user.id}_${where.chat_type}_${where.id}`
	    console.log(key)
		$U.removeStorage(key)
	    let list = this.getChatList()
	    let index = list.findIndex(item => item.id - 0 === where.id - 0 && item.chat_type === where.chat_type)
	    if(index !== -1) {
	    	//更新数据
	    	list[index].data = '' 
	    	let key = `chatlist_${this.user.id}`
	    	this.setStorage(key,list)    
	    	
	    	uni.$emit('onUpdateChatList',list)
	    }
	}
	// 初始化会话
	initChatListItem(message){
		 // 获取本地存储会话列表
		 let list = this.getChatList()
		 // 会话是否存在
		 let index = list.findIndex(item=>{
		 	return item.chat_type === message.chat_type && item.id -0 === message.to_id - 0
		 })
		 // 最后一条消息展现形式
		 let data = this.formatChatItemData(message,true)
		 // 会话不存在，创建会话
		 if(index === -1){
		 	let chatItem = {
		 		id:message.to_id - 0, // 接收人/群 id
		 		chat_type:message.chat_type, // 接收类型 user单聊 group群聊
		 		avatar:message.to_avatar,// 接收人/群 头像
		 		name:message.to_name,// 接收人/群 昵称
		 		update_time:(new Date()).getTime(), // 最后一条消息的时间戳
		 		data:message.data, // 最后一条消息内容
		 		type:'system', 		   // 最后一条消息类型
		 		noreadnum:0, // 未读数
		 		istop:false, // 是否置顶
		 		shownickname:false, // 是否显示昵称
		 		nowarn:false, // 消息免打扰
		 		strongwarn:false, // 是否开启强提醒
		 	}
		 	// 群聊
		 	if(message.chat_type === 'group' && message.group){
		 		chatItem = {
		 			...chatItem,
		 			user_id:message.group.user_id - 0, // 群管理员id
		 			remark:'', // 群公告
		 			invite_confirm:message.group.invite_confirm, // 邀请确认
		 		}
		 	}
		 	list.unshift(chatItem)
		 	// 存储
		 	let key = `chatlist_${this.user.id}`
		 	this.setStorage(key,list)
		 	// 通知更新vuex中的聊天会话列表
		 	uni.$emit('onUpdateChatList',list)
		 }
	}
	//格式化最后一条消息的显示
	formatChatItemData(message,isSend) {
	    let data = message.data
	    switch (message.type) {
	        case "emoticon":
	           data = '[标签]'
	           break;        
	        case 'image':
	           data = '[图片]'
	           break;
	        case 'audio':
	    	data = '[语音]'
	      	break;
	        case 'video' :
	    	data = '[视频]'
	     	break;
	        default:
	            break;
	    }
	    data = isSend ? data : `${message.from_name} : ${data}`
	    return data
	}
	// 撤回
	recall(message) {
		console.log(message)
		return new Promise((resolve,reject)=>{
			
			$http.post('/chat/recall',message)
			.then(res=> {
				let key = `chatDetail_${this.user.id}_${message.chat_type}_${message.to_id}`
				let list = this.getChatDetail(key)
				let index = list.findIndex( v=>{
					return  v.id - 0 === message.id -0
				})
				if( index === -1 ) return 
				list[index].isremove = 1
				console.log(res)
				this.setStorage(key,list)
				list = this.getChatList()
				index = list.findIndex(v=>v.id - 0 == message.to_id - 0)
				if(index !== -1) {
					list[index].data = '撤回了一条消息',
					list[index].update_time = (new Date()).getTime()
					key = `chatlist_${this.user.id}`
					this.setStorage(key,list)    
					this.updateBadge()
					uni.$emit('onUpdateChatList',list)
				}
				console.log('list',list)
				resolve(res)
			})
			.catch(err=>{
				console.log(err)
				reject(err)
			})
		})
		
	}
	handleOnRecall(message) {
		uni.$emit('onMessage',{
			...message,
			isremove:1
		})
		// 修改聊天记录
		let id = message.chat_type === 'group' ? message.to_id - 0 : message.from_id - 0
		// key值：chatDetail_当前用户id_会话类型_接收人/群id
		let key = `chatDetail_${this.user.id}_${message.chat_type}_${id}`
		// 获取原来的聊天记录
		let list = this.getChatDetail(key)
		// 根据k查找对应聊天记录
		let index = list.findIndex(item=>item.id - 0 === message.id - 0)
		if(index === -1) return;
		list[index].isremove = 1
		// 存储
		this.setStorage(key,list)
		this.updateChatItem({
			id,
			chat_type:message.chat_type
		},(params)=>{
			params.data = '对方撤回了一条消息',
			params.update_time = (new Date()).getTime()
			return params
		})
	}
	// 删除本地记录
	removeChatItem(message,isSend = true) {
		console.log('removeMessage',message)
		let id = message.chat_type === 'user' ? (isSend ? message.to_id - 0 : message.from_id - 0 ) : message.to_id - 0
		let key = `chatDetail_${this.user.id}_${message.chat_type}_${id}`
		let list = this.getChatDetail(key)
		let index = list.findIndex(v=>v.k === message.k)
		if(index === -1) return 
		list.splice(index,1)
		this.setStorage(key,list)
		
	}
	getNotice() {
		try{
			let notice = $U.getStorage('moment_' + this.user.id)
			console.log('notice',notice)
			    return notice  ? (typeof notice !== 'object' ? JSON.parse(notice) : notice)  : {
			        avatar:'',
			        user_id:'',
			        num:0
			    }
		}
		catch(err) {
			console.log('123',err)
		}
		

	}
	async handleMoment(message) {
		let notice = this.getNotice()
		    switch (message.type) {
		        case 'new':
		        //是自己就不用更新了
				console.log('message',message)
		        if(message.user_id - 0 !== this.user.id - 0){
					notice.avatar = message.avatar
					notice.user_id = message.user_id - 0
					uni.showTabBarRedDot({
						index:2        
					})      
		        }
		        	break;
		        default:	//like
				console.log(message.type)
				
				if(message.user_id - 0 !== this.user.id - 0){
				    notice.avatar = message.avatar
				    notice.user_id = message.user_id
				    notice.num += 1
					console.log('我加一了')
				}
				if(notice.num > 0) {
					uni.setTabBarBadge({
					    index:2,
					    text:notice.num > 99 ? '99+' : notice.num.toString()
					})
				}
				else {
					uni.removeTabBarBadge({
						index:2
					})
				}
				
		    	break;
		       
		    }
			try{
				uni.$emit('momentNotice',notice)
				console.log('将要存储的notice',notice)
				$U.setStorage('moment_' + this.user.id,JSON.stringify(notice))
			}
			catch(err){
				console.log(err)
			}
		    
	}
	async readMoments() {
	    let notice = ''
	    $U.setStorage('moment_' + this.user.id,notice)
	    uni.hideTabBarRedDot({
	        index:2    
	    })
	    uni.removeTabBarBadge({
	        index:2,
			fail: (err) => {
				console.log(err)
			}
	    })
	    uni.$emit('momentNotice',notice)
	}
	
}
export default chat