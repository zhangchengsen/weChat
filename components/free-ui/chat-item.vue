<template>
	<view class="">
		<view  class="pt-3 flex align-center justify-center" v-if="getTime">
			<text class="font-sm text-muted">{{getTime}}</text>
		</view>
		<view class=" flex align-center justify-center" v-if="item.type === 'system'">
			<text class="text-muted pt-2" style="font-size: 28rpx;">{{item.data}}</text>
		</view>	
		<view class=" flex align-center justify-center" v-if="item.isremove">
			<text class="text-muted pt-2" style="font-size: 28rpx;">{{isSelf ? '' : '对方'}}撤回了一条消息</text>
		</view>
		<!-- 不是群聊或者不是系统消息 和 不是撤回 可能出错-->
		<div v-if="item.type !== 'system' && !item.isremove" @longpress="long" class="flex align-start pt-3 pr-3"  :class="!isSelf ? ' justify-start' : ' justify-end' ">
			
			<free-avatar @click="navToAvatar(item.from_id)" v-if="!isSelf" :size="'78'" :src="item.from_avatar ? item.from_avatar : '../../static/default.jpg' "></free-avatar>
			
			<!-- 内容 -->
			<view class="flex  flex-column">
				<text :class="!isSelf ? ' ml-3' : 'mr-3' " class="text-muted" style="font-size: 26rpx;" v-if="!shownickname && item.from_id !== user.id ">{{item.from_name}}</text>
				<view :class="!isSelf ? 'ml-3' : 'mr-3' " class=" mt-2  px-1  position-relative" style="max-width:500rpx;">
					<!-- 角标 -->
					<text v-if="item.type === 'text' || item.type === 'audio'" :class="!isSelf ? ' left-icon' : 'right-icon' " class="position-absolute   iconfont">{{!isSelf ? '\ue609' : '\ue640'}}</text>
					<!-- 角标 -->
					<!-- 昵称 -->
					
					<view :class="!isSelf ? 'ml-2' : 'mr-2' "  class=" p-1 rounded " :style="bgcColor">
						
						<text  v-if="item.type === 'text'  " @click="playAudio" class="p-1" style="font-size: 33rpx;">{{textContent}}</text>
						<!-- 图片表情包 -->
						
						<view v-else-if="item.type === 'audio'" class="" @click="playAudio" class="flex align-center" :style="item.type === 'audio' ? labelStyle :'' ">
							<image v-if="isSelf"  :src="isPlay ? '../../static/audio/play.gif' : '../../static/audio/audio3.png'" style="width: 50rpx;height: 50rpx;margin-left: 5rpx;" ></image>
							
							<text class = "" style="margin: 0 5rpx;font-size: 33rpx;">{{item.options.time}}''</text>
							
							<image v-if="!isSelf" :src="isPlay ? '../../static/audio/play.gif' : '../../static/audio/audio3.png'"  style="width: 50rpx;height: 50rpx;margin-right: 5rpx" ></image>
						</view>
						
						<free-image @preview = "$emit('preview',item.data)" v-else-if="item.type =='emoticon'|| item.type == 'image'" :item = "item"></free-image>
						<!-- 图片表情包 -->
						<!-- 视频 -->
						<view v-else-if = "item.type === 'video'"  class="position-relative rounded">
							<free-image @imgLoad='imgLoad':maxX="400" @previewVideo = 'previewVideo(item.data)' :item = 'item'  ></free-image>
							<text @click="previewVideo(item.data)" class="iconfont text-white" style="position: absolute;width: 100rpx;height: 100rpx;font-size: 80rpx;" :style = "imgStyle">&#xe737;</text>
						</view>
						<!-- 视频 -->
						<!-- 名片 -->
						<view @click="navToUser()" class="rounded bg-white" v-else-if = "item.type === 'card'">
							<view class=" p-2 m-2  flex align-center">
								
								<free-avatar  :src="options.avatar||'../../static/default.jpg' "></free-avatar>
								<text class="font-weight-bold ml-2" style="font-size: 32rpx;">{{options.username}}</text>
							</view>
							<view class="" style="height: 1rpx;background-color: #EDEDED;">
								
							</view>
							<view class="pl-2 pb-2 pt-1">
								<text class="text-muted " style="font-size: 32rpx;">【个人名片】</text>
							</view>
						</view>
						<!-- 名片 -->
					</view>
				</view>
			</view>
			
			<!-- 内容 -->
			<free-avatar @click="navToAvatar(item.from_id)" v-if="isSelf" :size="'78'" :src="this.user.avatar ? this.user.avatar :'../../static/default.jpg'"></free-avatar>
		</div>
		
		<view class="flex flex-row-reverse" style="margin-top: 10rpx;" v-if="item.sendStatus === 'pending'">
			<text class="text-muted" style="font-size: 28rpx;">发送中</text>
		</view>
		<view class="flex flex-row-reverse" style="margin-top: 10rpx;" v-else-if="item.sendStatus === 'fail'">
			<text class="text-danger" style="font-size: 28rpx;">发送失败</text>
		</view>
		<free-popup chat ref = "list_pop" :bodyHeight="getHeight" :bodyWidth="250" >
			<view class="flex flex-column border flex-1" style="width: 250rpx;" :style="'height: ' + getHeight + 'rpx;'">
					<text class="flex-1 pl-1"  v-for="(item,index) in getTrueMenu" :key ='index' style="line-height: 100rpx;" @click="popEvent(item.event)"  >{{item.name}}</text>
			</view>
		</free-popup>
	</view>
	
</template>

<script>
	import freeImage from '../../components/free-ui/free-image.vue'
	import freePopup from '../../components/free-ui/free-popup.vue'
	import $Time from '../../common/free-lib/time.js'
	import freeAvatar from './free-avatar.vue'
	import {mapActions,mapState} from 'vuex'
	export default{
		props:{
			item:{
				type:Object,
				default:{}
			},
			preTime:{
				type:Number,
				default:0
			},
			index:{
				type:Number,
				default:0
			},
			shownickname:{
				type:[Boolean,Number],
				default:0
			},
			popFunc:{
				type:Boolean,
				default:true
			}
		},
		mounted() {
			if(this.item.type === 'audio')
			this.onAudio(this.regAudio)
			
			if( this.item.options ) {
				let num = 0
				for(let key in this.item.options) {
					num++
				}
				if(num) {
					this.options = JSON.parse(this.item.options)
				}
			}
			
		},
		data() {
			return {
				audio:null,
				isPlay:false,
				x:100,
				y:100,
				menu:[
					{
						name:'复制' ,
						event:'copy'
					},
					{
						name:'发送给好友',
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
				],
				options:{}
			}
		},
		beforeDestroy() {
			this.offAudio(this.regAudio)
			if(this.audio) this.audio.destroy()
		},
		components:{
			freeAvatar,
			freePopup,
			freeImage
		},
		computed:{
			...mapState({
				user:state=>state.user.user,
				chat:state=>state.user.chat
			}),
			isSelf() {
				return this.user.id === this.item.from_id
			},
			// 标签宽度
			labelStyle() {
				let width = 500/50
				return `width:${this.item.options.time <= 5 ? 150 : this.item.options.time  * width}rpx;`
			},
			imgStyle() {
				return 'left:'+(this.x / 2 - uni.upx2px(40)) + 'px;top:' + (this.y / 2 - uni.upx2px(50)) +'px;'
			},
			textContent() {
				if(this.item.type  === 'text') return this.item.data
				return `4'\'`
			},
			getTime() {
				return $Time.getChatTime(this.item.create_time,this.preTime)
			},
			getHeight(){
				return this.menu.length * 100
			
			},
			topStyle() {
				return 'top:' + (this.sHeight + uni.upx2px(90)) +'px;'
			},
			getTrueMenu() {
				if(this.item.from_id !== this.user.id) {
					return this.menu.filter(v=>v.name != '撤回')
				}
				return this.menu
			},
			bgcColor() {
				if(this.item.type !== 'text' && this.item.type !== 'audio') return ''
				return !this.isSelf ? 'background-color:#fff;' : 'background-color:#96ec6d;' 
			}
		},
		methods:{
			...mapActions(['onAudio','executeAudio','offAudio']),
			navToAvatar(id) {
				uni.navigateTo({
					url:'../../pages/chat/chat-user?id=' + id,
				})
			},
			previewVideo(url) {
				uni.navigateTo({
					url:'../../pages/chat/chat_video?url='+url
				})
			},
			// 获取图片的尺寸
			imgLoad(e) {
				this.x = e.x 
				this.y = e.y
			},
			// 音频事件
			regAudio(index) {
				if(index !== this.index) {
					if(this.audio) this.audio.pause()
				}
			},
			playAudio() {
				this.executeAudio(this.index)
				if(this.audio){
					this.audio.pause()
					this.audio.play()
				}
				else {
					this.audio = uni.createInnerAudioContext()
					this.audio.src = this.item.data
					this.audio.play()
					this.audio.onPlay(()=>{
						this.isPlay = true
					})
					this.audio.onPause(()=>{
						this.isPlay = false
					})
					this.audio.onStop(()=>{
						this.isPlay = false
					})
					this.audio.onEnded(()=>{
						this.isPlay = false
						// setTimeout(()=>{
						// 	this.audio.play()
						// },100)
					})
					this.audio.onError(()=>{
						this.isPlay = false
					})
				}
			},
			
			long(e)
			{
				
				let x = 0
				let y = 0
				// #ifdef APP-PLUS-NVUE
				if(e.changedTouches.length)
				{
					
					x  = e.changedTouches[0].screenX
					y  = e.changedTouches[0].screenY
					this.$refs.list_pop.show(x,y + 20)
				}
				// #endif
				// #ifdef MP
				x  = e.detail.x
				y  = e.detail.y
				this.$refs.list_pop.show(x,y + 20)
				// #endif
				// #ifdef H5
				x = e.changedTouches[0].pageX
				y = e.changedTouches[0].pageY
				this.$refs.list_pop.show(x,y)
				// #endif
			},
			popEvent(event) {
				switch(event){
					case 'withdraw' :
						if(!this.popFunc) return this.toast('请到聊天页面撤回哦')
						console.log(this.item.id)
						let obj = {
							to_id:this.chat.To.id,
							chat_type:this.chat.To.chat_type,
							id:this.item.id
						}
						uni.showLoading({
							title:'撤销中...'
						})
						this.chat.recall(obj)
						.then(()=>{
							this.$emit('withDraw',this.index)
							uni.hideLoading()
							this.toast('撤销成功')
						})
						.catch(err=>{
							this.toast(err)
							uni.hideLoading()
						})
						this.$refs.list_pop.hide()
						break;
					case 'sendToFriends':
						uni.navigateTo({
							url:'../../pages/chat/chat_translate?params=' + encodeURIComponent(JSON.stringify(this.item))
						})
						console.log('sendToFriends')
						this.$refs.list_pop.hide()
						break
					case "copy":
						// #ifndef H5
						if(this.item.type === 'text')
						uni.setClipboardData({
							data:this.item.data,
							success: () => {
								uni.showToast({
									title:'复制成功'
								})
							},
							complete: () => {
								this.$refs.list_pop.hide()
							}
						})
						// #endif
					case 'remove':
					if(!this.popFunc) return this.toast('请到聊天页面删除哦')
					this.$emit('remove',{item:this.item,index:this.index})
					break
					case 'store':
					let mes = {
						data:this.item.data,
						options:JSON.stringify(this.item.options) ,
						type:this.item.type
					}
					this.$http.post('/fava/create',mes)
					.then(res=>{
						uni.showToast({
							title:'添加成功'
						})
					})
					.catch(err=>{
						
					})
					this.$refs.list_pop.hide()
					break
					default:
					
						break;
				}
			},
			navToUser() {
				let options
				
				if(this.item.options) {
					options = JSON.parse(this.item.options)
					uni.navigateTo({
						url:'../../pages/chat/chat-user?id=' + options.id
					})
				}
			
				
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
</style>
