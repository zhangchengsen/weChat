import $U from '../../common/free-lib/util.js'
import $http from '../../common/free-lib/request.js'
import $C from '../../common/free-lib/config.js'
import chat from '../../common/free-lib/chat.js'
export default{
	state:{
		user:false,
		applyNum:0,
		applyList:[],
		currentNum:0,
		newList:[],
		indexList:[],
		chat:null,
		chatList:[],
		totalNoreadnum:0,
		notice:false
	},
	mutations:{
		changeUserInfo(state,data) {
			state.user[data.key] = data.value
			$U.setStorage('user',JSON.stringify(state.user))
		}
	},
	actions:{
		login({state,dispatch},user) {
			state.user = user
			$U.setStorage('token',user.token)
			$U.setStorage('user',JSON.stringify(user))
			$U.setStorage('user_id',user.user_id)
			
			state.chat = new chat({
				url:$C.socketUrl
			})
			dispatch('getChatList')
			dispatch('updateBadge')
			dispatch('getContacts')
			dispatch('getNotice')
			dispatch('getApply')
			
			dispatch('getOffline')
		},
		logout({state},user) {
			state.user = false
			$U.removeStorage('token')
			$U.removeStorage('user')
			$U.removeStorage('user_id')
			if(state.chat) {
				state.chat.close()
				state.chat = null
			}
			uni.$off('momentNotice',()=>{})
			uni.$off('onUpdateChatList',()=>{})
			uni.$off('totalNoreadnum',()=>{})
			uni.$off('getNotice',()=>{})
			
		},
		// 初始化登录
		initlogin({state,dispatch}) {
			// 初始化登录状态
			let user = $U.getStorage('user')
			if(user) {
				state.user = JSON.parse(user)
			}
			else return 
			// 连接socket
			state.chat = new chat({
				url:$C.socketUrl
			})
			
			// 获取离线信息
			dispatch('getContacts')
			dispatch('getNotice')
			dispatch('getApply')
			dispatch('getChatList')
			dispatch('updateBadge')
			
			dispatch('getOffline')
		},
		getApply({state},page = 1) {
			$http.get('/apply/' + page,{size:10})
			.then(res=>{
				console.log(res)
				state.applyNum = res.count
				if(page !== 1) {
					state.applyList = [...state.applyList,...res.rows]
					state.currentNum = 0
				} 
				else {
					state.applyList = res.rows
				
				}
				if(res.rows.length === 0 || res.rows.length != 10) state.currentNum = -1
				if(res.count)
				uni.setTabBarBadge({
					index:1,
					text:res.count.toString()
				})
			})
			.catch(err=>{
				console.log(err)
			})
			
		},
		getContacts({state}) {
			$http.get('/friendslist')
			.then(res=>{
				state.newList  = res.rows.newList
				state.indexList  = res.rows.indexList
			})
			
		},
		getChatList({state}) {
			state.chatList = state.chat.getChatList() 
			//监听会话列表变化
			uni.$on('onUpdateChatList',list=>{
				state.chatList = list        
			})
		},
		updateBadge({state}) {
		    
			uni.$on('totalNoreadnum',num=>{
				state.totalNoreadnum = num  
			})
			 state.chat.updateBadge()
			 
		},
		getOffline() {
			$http.post('/chat/getoffline').then(()=>{})
			
		},
		getNotice({state}) {
			try{
				state.notice = state.chat.getNotice()
				if(state.notice.num > 0) {
					uni.setTabBarBadge({
						index:2,
						text:state.notice.num > 99 ? '99+' : state.notice.num.toString()
					})
				}
				uni.$on('momentNotice',(notice)=>{
					state.notice = notice
				})
			}
			catch(err){
				console.log('567',err)
			}
			
		},
		reconnect({state}) {
			setTimeout(()=>{
				if(state.user && state.chat) {
					state.chat.reconnect()
				}
			},2000)
			
		}
	}
}