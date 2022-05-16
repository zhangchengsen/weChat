<template>
	<view >
		<!-- 标题 -->
		<nav-bar showBack :title=" totalNoreadnum ? detail.name +`(${totalNoreadnum})`: detail.name " showRight>
			<view class=""  slot = "rightIcon">
				<free-icon-button :icon="'\ue6fd'" @click="navTo()" ></free-icon-button>
			</view>
		</nav-bar>
		<!-- 标题 -->
		<scroll-view scroll-y="true" :show-scrollbar="false" class=" px-3 position-fixed left-0 right-0" :style="topStyle+bottom" style="background-color: #E9E8E5;" :scroll-with-animation="true" :scroll-into-view="scrollInto" >
			<!-- 聊天信息 -->
			<chat-item ref="chatItem" :id="'id' + index" @preview="preview" :index = 'index'  :preTime="index ? chatList[index - 1].create_time : 0 " :item = "item" v-for="(item,index) in chatList" :key = "index" @withDraw = 'withDraw' :shownickname="currentChat.shownickname" @remove="remove"></chat-item>
			<!-- 聊天信息 -->
			<view style="height: 20rpx;"></view>
		</scroll-view>
		<!-- 底部 -->
		
		<view class="position-fixed left-0 right-0 flex align-center" style="height: 105rpx;background-color: #f6f8f5;" :style="'bottom:'+keyBoardToBottom+'px;'">
			<free-icon-button v-if="mode !== 'audio' " @click="changeRecord" :icon="'\ue606'" ></free-icon-button>
			<free-icon-button v-else @click="changeRecord" :icon="'\ue607'" ></free-icon-button>
			<textarea v-if=" mode !== 'audio' " v-model="text" @focus="mode = 'text'" :adjust-position="false" fixed style="font-size: 32rpx;background-color: white;height: 50rpx;" class="rounded flex-1 p-2"   />
			<!-- 录音 -->
			<view  @touchstart="startRecord" @touchend="endRecord" @touchcancel="cancelRecord" @touchmove="moveRecord"  v-else style="font-size: 30rpx;background-color: white;height: 75rpx;" class="rounded flex-1 p-2 flex align-center justify-center"  :style="isRecording ? 'background-color:#eee' : ''">
				<text class="p-1">{{isRecording ? `手指上滑，取消发送` : `按住说话`}}</text>
				
			</view>
			<!-- 录音 -->
			<free-icon-button @click="moreFunc('emoticon')" :icon="'\ue605'" ></free-icon-button>
			<template v-if="!showSendButton">
				<free-icon-button :icon="'\ue682'" @click='moreFunc()' ></free-icon-button>
			</template>
			<template v-else>
				<text @click="send('text')" ref="text"  style="color: white;background-color: #07C160;font-size: 28rpx;" class=" px-2 py-1 mr-1">发送</text>
			</template>
		</view>
		<!-- 底部 -->
		
		<!-- 弹出层 -->
		<free-popup chat ref = "list_pop" :bodyHeight="getHeight" :bodyWidth="250" >
			<view class="flex flex-column border flex-1" style="width: 250rpx;" :style="'height: '+getHeight+'rpx;'">
					<text class="flex-1 pl-1"  v-for="(item,index) in menu" :key ='index' style="line-height: 100rpx;" @click="popEvent(item.event)"  >{{item.name}}</text>
			</view>
		</free-popup>
		<!-- 弹出层 -->
		<!-- 拓展功能 -->
		<view v-if = "mode === 'action' || mode === 'emoticon'" style="z-index:100;" >
			<div  @click="hideMoreFunc()" class="position-fixed left-0 right-0 top-0 " :style="bottom" >
			</div>
			<view 
			 style="height: 580rpx;" class="position-fixed left-0 right-0 bottom-0">
				<swiper  :indicator-dots="renderList.length > 1" style="height: 510rpx;">
					<swiper-item v-for="(item,index) in renderList" :key = "index"  class="row"  style="">
						<view v-for="(item1,index1) in item" :key = "index1" class="col-3 bg-light function" @click="actionOrEmoticonEvent(item1)" style="height: 255rpx;">
							<image :src="item1.icon" mode="widthFix" style="width: 100rpx;height: 100rpx;"></image>
							<text style="" class="mt-2 font text-muted" >{{item1.name}}</text>
						</view>
					</swiper-item>
					
				</swiper>	
			</view>
		</view>
		<!-- 拓展功能 -->
		<view v-if = "isRecording" class = "position-fixed rounded flex flex-column align-center justify-center" style = "width: 360rpx;height: 360rpx;background-color: rgba(0,0,0,.3);" :style = "positionStyle" >
			<image src="../../static/audio/play.gif" style="width: 200rpx;height: 200rpx;"></image>
			<text @click="stopRecord">手指上滑，取消发送</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	// #ifdef APP-PLUS-NVUE
	var dom = weex.requireModule('dom')
	var animation = weex.requireModule('animation')
	// #endif
	import freePopup from '../../components/free-ui/free-popup.vue'
	import chatItem from '../../components/free-ui/chat-item.vue'
	import freeAvatar from '../../components/free-ui/free-avatar.vue'
	import freeIconButton from '../../components/free-ui/free-icon-button.vue'
	import navBar from '@/components/free-ui/free-nav.vue'
	import auth from '../../common/mixin/auth.js'
	export default{
		components:{
			navBar,
			freeIconButton,
			freeAvatar,
			chatItem,
			freePopup
			
		},
		mixins:[auth],
		mounted() {
			if(!this.Record) this.$store.commit('initRecord')
			this.getStatusBarHeight()
			uni.onKeyboardHeightChange(res => {
			  if(this.mode !== 'action' && this.mode !== 'emoticon'){
				  this.changePositionHeight(res.height)
				  if(res.height > 0) this.scrollToBottom()
				  return 
			  }
			})
			let info = uni.getSystemInfoSync()
			this.positionX = info.screenWidth
			this.positionY = info.screenHeight
			this.$store.commit('regSend',(url)=>{
				this.send('audio',url,this.RecordTime)
				this.$store.commit('clearTimer')
			})
			uni.$on('changeGroupName',res=>{
				this.detail.name = res
			})
			if(this.chatList.length) this.scrollToBottom()
			uni.$on('clearChatList',()=>{
				this.chatList = []
			})
			uni.$on('sendItem',this.sendItem)
			uni.$on('sendCard',this.sendCard)
		},
		beforeDestroy() {
			this.chat.destoryChatObject()
			uni.offKeyboardHeightChange(()=>{})
			uni.$off('clearChatList',()=>{})
		},
		destroyed() {
			uni.$off('sendCard',this.sendCard)
			uni.$off('onMessage',()=>{})
			uni.$off('changeGroupName',()=>{})
			uni.$off('sendItem',this.sendItem)
		}
		,
		methods: {
			sendCard(params) {
				this.send('card','',JSON.stringify(params))
			},
			sendItem(e) {
				this.send(e.type,e.data)
			},
			navTo() {
				
				
				uni.navigateTo({
					url:'chat_msg?params='+ encodeURIComponent(JSON.stringify({
						id:this.detail.id,
						chat_type:this.detail.chat_type,
						avatar:this.detail.avatar
					})) 
				})
				
			},
			// ======音频=========
			startRecord(e) {
				console.log(e)
				this.Record.start({
					format:'mp3'
				})
				this.startY = e.changedTouches[0].pageY
				this.isRecording = true
				this.$store.commit('startRecord')
				
			},
			endRecord() {
				// console.log('end')
				this.Record.stop()
				
				if(this.recordTimer) {
					this.$store.commit('clearTimer')
				}
				this.isRecording = false
			},
			cancelRecord() {
				// console.log('cancel')
				try{
					this.$store.commit('changePause',true)
					this.Record.stop()
				}
				catch(err){
					console.log(JSON.stringify(err))
				}
				
				console.log(this.Record)
				this.$store.commit('clearTimer')
				this.isRecording = false
				
			},
			moveRecord(e) {
				console.log('move')
				if(Math.abs(e.changedTouches[0].pageY - this.startY ) >= 80) {
					this.$store.commit('changePause',true)
					this.isRecording = false
					this.Record.stop()
					this.$store.commit('clearTimer')
				}
			},
			// ======音频=========
			// 改变状态
			changeRecord() {
				this.mode = this.mode !== 'text'&& this.mode !== '' ? 'text' : 'audio'
			},
			// 预览照片
			preview(url) {
				uni.previewImage({
					current:url,
					urls:this.imageList,
					fail: (err) => {
						// console.log(err)
					}
				})
			},
			// 发送表情包或者使用扩展程序
			actionOrEmoticonEvent(item) {
				
				switch(item.event) {
				     case 'emoticon': 
				        this.send(item.event,item.icon)
				        break;
					case 'image':
					   this.send(item.event)
					   break;
					 case 'video': 
						this.send(item.event)
						break;
						// console.log('video1')
					case 'openFava':
						uni.navigateTo({
							url:'../my/my_favor?type=send'
						})
						break;
					case 'card':
						uni.navigateTo({
							url:'chat_share?type=card'
						})
					break
				     default:
				        console.log(item.event)
						break
				} 
			},
			// 改变一些高度
			changePositionHeight(height) {
				this.bottom = "bottom:"+(uni.upx2px(105)+height) +"px;"
				this.keyBoardToBottom = height
			},
			// 隐藏更多功能
			hideMoreFunc() {
				this.changePositionHeight(0)
				this.mode = ''
			},
			// 更多
			moreFunc(mode = 'action') {
				 this.mode = mode
				setTimeout(()=>{
					uni.hideKeyboard()
					this.changePositionHeight(uni.upx2px(580))
					this.scrollToBottom()
				},50)
			},
			getStatusBarHeight() {
				// #ifdef APP-PLUS-NVUE
				let statusHeight= plus.navigator.getStatusbarHeight()
				this.sHeight =  statusHeight
				// #endif
			},
			remove(e) {
				console.log(e.item,e.index)
				uni.showModal({
					title:'提示',
					content:'该记录不会出现在你的聊天记录中',
					confirmColor:'#007BFF',
					confirmText:'确定',
					cancelText:'取消',
					success:(res)=>{
						if(res.confirm) {
							this.chat.removeChatItem(e.item)
							this.chatList.splice(e.index,1)
							// 最后一个 更新会话列表
							console.log(e.item)
							if(e.index === this.chatList.length){
								this.chat.updateChatItem({
									id:this.detail.id,
									chat_type:e.item.chat_type
								},(v)=>{
									let data = ''
									if(e.index !== 0) {
										let pre = this.chatList[e.index - 1]
										data = this.chat.formatChatItemData(pre)
										v.data = data 
									}
									return v
								})
							}
						}
					}
				})
			},
			// 撤回
			withDraw(index) {
				// 发送请求
				let info = {...this.chatList[index],isremove:true}
				this.chatList.splice(index,1,info)
			},
			popEvent(event) {
				switch(event){
					case 'isTop' :
						this.$emit('changeTop',this.index)
						break;
					case 'video':
						this.send('video')
					
				}
			},
			// 滑动到底部
			scrollToBottom() {
				let last = this.chatList.length ? this.chatList.length - 1 : 0
				if(last){
					// #ifdef APP-PLUS-NVUE
					setTimeout(()=>{
						dom.scrollToElement(this.$refs.chatItem[last],{})
					},50)
					// #endif
					// #ifndef APP-PLUS-NVUE
						this.scrollInto = 'id' + last
					// #endif
				}
			},
		
			send(type,data = '',time = 0) {
				let options = {}
				
				
				switch(type) {
				     
					case 'image':
						if(type && data)
						{
							let message = this.chat.formatSendData({type,data,options})
							this.chatList.push(message)
							let onProgress = (progress) => {
								console.log('上传进度 ',progress)
							}
							this.finalSend(message,onProgress)
							return
						}
						uni.chooseImage({
							count:9,
							success:(res)=>{
								res.tempFilePaths.forEach(v=>{
									let message = this.chat.formatSendData({type,data:v,options})
									this.chatList.push(message)
									let onProgress = (progress) => {
										console.log('上传进度 ',progress)
									}
									this.finalSend(message,onProgress)
								})
								
							}
						})
						break
					case 'video':
						if(type && data)
						{
							let message = this.chat.formatSendData({type,data,options})
							this.chatList.push(message)
							let onProgress = (progress) => {
								console.log('上传进度 ',progress)
							}
							this.finalSend(message,onProgress)
							return
						}
					  uni.chooseVideo({
						 count: 1,
						 duration:12,
						 sourceType: ['camera', 'album'],
						 success:(res)=>{
							 let message = this.chat.formatSendData({type,data:res.tempFilePath,options})
							 this.chatList.push(message)
							 // obj.content = e.tempFilePath
							 let onProgress = (progress) => {
							 	console.log('上传进度 ',progress)
							 }
							 this.finalSend(message,onProgress)
						 }
					 });
					 break;
					 case 'card':
						let op = time 
						console.log('type',type,'data',data,'options',op)
						data = '[名片]'
						let info = this.chat.formatSendData({type,data,options:op})
						 this.chatList.push(info)
						 let p = (progress) => {
						 	console.log('上传进度 ',progress)
						 }
						 this.finalSend(info,p)
					 break;
					 // this.send('audio',url,this.RecordTime)
					 case 'audio' :
					 options.time = time
					 let message = this.chat.formatSendData({type,data,options})
					  this.chatList.push(message)
					  let onProgress = (progress) => {
					  	console.log('上传进度 ',progress)
					  }
					  this.finalSend(message,onProgress)
					 break;
					 
				     default:	//文字和表情包
						data = data||this.text
				  
						let mes = this.chat.formatSendData({type,data,options})
						this.chatList.push(mes)
						this.finalSend(mes) 
						return 
				}
				
				
				
				
			},
			finalSend(message,onProgress = false) {
				
				this.chat.send(message,onProgress)
				.then(res=>{
					console.log(res)
					this.text = ''
					if(message.type === 'card') {
						this.toast('发送成功')
					}
					this.scrollToBottom()
				})
				.catch(err=>{
					console.log('errrrr',err)
					this.text = ''
					this.toast(JSON.stringify(err))
				})
			},
			__init() {
				try {
				var list = []
				var total = 20
				var page = Math.ceil(total/8)
					for(var i = 0 ; i < page ; i++)
					{
						list.push([])
						for(var j = 0 ; j < 8;j++){
							if(j+i*8 + 1  > total) continue
							list[i].push({
								icon:'../../static/5497/' + (j+i*8) + '.gif',
								name:'图片'+(j+i*8 + 1),
								event:'emoticon'
							})
						}
					}
					this.chat.initChatListItem({
						chat_type:this.detail.chat_type,
						to_id:this.detail.id,
						to_name:this.detail.name,
						to_avatar:this.detail.avatar,
						data:this.detail.chat_type === 'user' ? '你们已经是好友了,可以开始聊天了' : '你已加入群聊,可以开聊天了'
					})
					this.emoticonList = list
				}
				catch(err){
					console.log(JSON.stringify(err))
				}
			}
		},
		computed:{
			...mapState({
				Record:state=>state.audio.Record,
				RecordTimer:state=>state.audio.RecordTimer,
				RecordTime:state=>state.audio.RecordTime,
				chat:state=>state.user.chat,
				totalNoreadnum:state=>state.user.totalNoreadnum,
				conversation:state=>state.user.chatList
			}),
			currentChat() {
				let index = this.conversation.findIndex(v=>{
					return v.id == this.detail.id && v.chat_type === this.detail.chat_type
				})
				
				if(index === -1 ) return {}
				return this.conversation[index]
			},
			positionStyle() {
				let x = this.positionX / 2 - uni.upx2px(180)
				let y = this.positionY / 2 - uni.upx2px(180)
				console.log(`x是`,x,'y是',y)
				return `left: ${x}px;top: ${y}px;`
			},
			topStyle() {
				return 'top:' + (this.sHeight + uni.upx2px(90)) +'px;'
			},
			getHeight(){
				return this.menu.length * 100
			},
			renderList() {
				return this[this.mode + 'List']
			},
			imageList() {
				let list = []
				this.chatList.forEach(v=>{
					if(v.type === 'emoticon' || v.type === 'image')
					list.push(v.data)
				})
				return list
			}
		},
		watch: {
			text(val,oldVal) {
				if(val&&!oldVal){
					this.showSendButton = true
				}
				if(!val) this.showSendButton = false
			}
		},
		created() {
			this.__init()
		},
		onLoad(e) {
			if(!e.params) {
				uni.navigateBack({
					delta:1
				})
				this.toast('非法参数')
			}
			try{
				this.detail = JSON.parse(decodeURIComponent(e.params))
				console.log(this.detail)
				this.chat.createChatObject(this.detail)
				this.chatList = this.chat.getChatDetail()
				console.log('当前聊天列表',this.chatList)
				uni.$on('onMessage',message=>{
					// console.log('onMessage',message)
					// console.log('message.chat_type === "group" && message.to_id === this.detail.id',message.chat_type === 'group' && message.to_id === this.detail.id)
					if((message.from_id == this.detail.id && message.chat_type === 'user')||(message.chat_type === 'group' && message.to_id == this.detail.id))
					{
						if(message.isremove !== 1)
						{
							this.chatList.push(message)
							setTimeout(()=>{
								this.scrollToBottom()
							},100)
							// console.log('onMessage判断2')
						}
						else {
							// console.log('onMessage判断3	')
							let index = this.chatList.findIndex(v=>v.id - 0 === message.id - 0)
							if(index !== -1) {
								this.chatList[index].isremove =1
								this.chatList[index].update_time = message.update_time
								
							}
						}
						
						
					}
					//置于底部
				})
			}
			catch(err) {
				console.log(err)
			}
		},
		data(){
			return {
				scrollInto:'',
				timer:0,
				startY:0,
				positionX:200,
				positionY:200,
				isRecording:false,
				mode:'',
				text:'',
				showSendButton:false,
				keyBoardToBottom:0,		//距离底部的距离
				sHeight:0,
				bottom:"bottom:"+uni.upx2px(105) +"px;",
				emoticonList:[],
				actionList:[
					[
						{
							name:'相册',
							icon:'../../static/extends/pic.png',
							event:'image'
						},
						{
							name:'拍摄',
							icon:'../../static/extends/video.png',
							event:'video'
						},
						{
							name:'收藏',
							icon:'../../static/extends/shoucan.png',
							event:'openFava'
						},
						{
							name:'名片',
							icon:'../../static/extends/man.png',
							event:'card'
						},
						{
							name:'语音通话',
							icon:'../../static/extends/phone.png',
							event:''
						},
						{
							name:'位置',
							icon:'../../static/extends/path.png',
							event:''
						},
					]
				],
				detail:{},
				chatList:[
					
				],
				menu:[
					{
						name:'复制' ,
						event:'copy'
					},
					{
						name:'转发',
						event:"sendToFriends"
					},
					{
						name:'收藏',
						event:"store"
					},
					{
						name:'删除',
						event:"remove"
					},
					{
						name:'撤回',
						event:"withdraw"
					},
					{
						name:'多选',
						event:"checkMore"
					}
				]
			}
		}
	}
</script>

<style scoped>
	.left-icon{
		top: 20rpx;
		color: white;
		font-size: 32rpx;
		left: 0;
		
	}
	.right-icon {
		color: #96ec6d;
		top: 20rpx;
		font-size: 32rpx;
		right: 2rpx;
	}
	.btnOpactiy{
		opacity: 0;
	}
	.function{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
