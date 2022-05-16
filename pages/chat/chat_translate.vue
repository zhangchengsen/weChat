<template>
	<view class="" >
		<nav-bar showBack  :bgWhite='true' :showRight="false" :subTitle="'选择'">
			<!-- <free-button @click="changeMode" slot= 'rightIcon' :text="buttonText"></free-button> -->
		</nav-bar>
		<view class="" style="background-color: #EDEDED;">
			<input class="m-2 bg-white px-2 rounded" style="width: 710rpx;height: 80rpx;font-size: 32rpx;" placeholder="搜索" v-model="inputVal" placeholder-class="text-center"   />
		</view>
		 
		
		<scroll-view scroll-y="true" class="position-fixed left-0 right-0 bottom-0" :style=" 'top:'+ top +'px;'">
			<view class="" style="background-color: #EDEDED;">
				<text style="font-size: 28rpx;" class="text-muted px-2 py-1">最近联系人</text>
			</view>
			<free-list-item @click="chooseObj(item,index)"  v-for="(item,index) in searchList" :title="item.name ? item.name : item.username" :src = "item.avatar ? item.avatar : '../../static/default.jpg'">
				<view slot="rightImg" v-if="mode" :style="item.choose ? 'background-color: #07c160;' :'background-color: #EDEDED;'" style="width: 40rpx;height: 40rpx;border-width: 2rpx;" class="rounded-circle border"></view>
			</free-list-item>
			
			<view class="flex align-center justify-center" v-if="inputVal&&!searchList.length">
				<text class="font-weight-bold mt-2" style="font-size: 36rpx;">暂时没有搜索结果</text>
			</view>
		</scroll-view>
		
		
		<!-- 弹出层 -->
		<free-confirm ref="confirm">
			<view class="m-2">
				<text class="font-md text-dark font-weight-bold" style="font-size: 40	rpx;">发送</text>
				<scroll-view scroll-x="true" class="my-3"  style="width: 560rpx;" :show-scrollbar="false">
					<view class="flex" v-if="mode">
						<view class="mr-1" v-for="(item,index) in chooseItem" :key="index">
							<free-avatar :size="70" :src="'../../static/default.jpg'" ></free-avatar>
						</view>
					</view>
					<view class="flex" v-if="!mode">
						
						<free-avatar :size="70" :src="singlePerson.avatar ? singlePerson.avatar : '../../static/default.jpg'" ></free-avatar>
					</view>
				</scroll-view>
				<view class="">
					<text class="text-muted p-2"  style="font-size: 32rpx;background-color: #EDEDED;">{{dataType}}</text>
				</view>
				<input placeholder="给朋友留言" v-model="leaveMes" class="text-muted border-bottom m-2 px-2" style="font-size: 32rpx;width: 520rpx;" />
				
			</view>
		</free-confirm>
		<!-- 弹出层 -->
		
	</view>
</template>

<script>
	import freeConfirm from '../../components/free-ui/free-confirm.vue'
	import freeAvatar from '../../components/free-ui/free-avatar.vue'
	import freeListItem from '@/components/free-ui/free-list-item.vue'
	import freeButton from '../../components/free-ui/free-button.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	import {mapState} from 'vuex'
	export default {
		components:{
			freeAvatar,
			navBar,
			freeButton,
			freeListItem,
			freeConfirm
		},
		methods:{
			onLoad(e){
				this.detail = JSON.parse(decodeURIComponent(e.params))
			},
			navTo() {
				uni.navigateTo({
					url:"chat_mail"
				})
			},
			
			 changeMode(item) {
				if(this.mode) 
				{
					if(!this.chooseItem.length) return this.mode = false
					
					this.$refs.confirm.show(async (f)=>{
						f()
						this.sendNum = this.chooseItem.length
						var i = 0
						while(i < this.chooseItem.length)
						{
							await this.send(i)
							i++
						}
					})
				}
				
				this.mode = true
				
			},
			chooseObj(item,index) {
				if(this.mode)
				{
					if(item.choose) {
						 this.listForChoose[index].choose = false
						 return this.listForChoose = [...this.listForChoose]
					}
					if(this.chooseItem.length > 8) return uni.showToast({
						title:'最多选择9个哦',
						icon:'none'
					})
					this.listForChoose[index].choose = !item.choose
					this.listForChoose = [...this.listForChoose]
				}
				else {
					this.singlePerson = {...item}
					this.sendNum = 1
					this.$refs.confirm.show((f)=>{
						this.submit(this.singlePerson)
						
						f()
					})
				}
				
			},
			
			// send(i) {
			// 	return new Promise(async(resolve,reject)=>{
			// 		let message = this.chat.formatSendData({
			// 			to_id:this.chooseItem[i].id,
			// 			to_name:this.chooseItem[i].name,
			// 			to_avatar:this.chooseItem[i].avatar,
			// 			data:this.detail.data,
			// 			chat_type:this.chooseItem[i].chat_type,
			// 			type:this.detail.type,
			// 			options:this.detail.options
			// 		})
			// 		await this.chat.send(message)
			// 		resolve(1)
			// 	})
			// },
			submit(item) {
				return new Promise(async(resolve,reject)=>{
					let message = this.chat.formatSendData({
						to_id:item.id,
						to_name:item.name,
						to_avatar:item.avatar,
						data:this.detail.data,
						chat_type:item.chat_type,
						type:this.detail.type,
						options:this.detail.options
					})
					console.log('submit message',message)
					this.chat.send(message).then(()=>{
						
						if(this.leaveMes) {
							
						
							this.chat.send(message,false,this.leaveMes,'text')
						}
						this.sendNum --
						if(!this.sendNum) 
						{
							uni.showToast({
								title:'发送成功',
								mask:true
							})
							setTimeout(()=>{
								uni.reLaunch({
									url:'../index/index'
								})
							},500)
						}
						resolve(message.to_id)
					})
					.catch(err=>{
						reject(message.to_id)
					})
				})
				
					
				
				
				
			},
			
			
		},
		mounted() {
			console.log(this.list)
			let info = uni.getSystemInfoSync()
			this.sHeight = info.statusBarHeight
			let list = []
			for(var i = 0 ; i < this.list.length ; i++) {
				list.push({...this.list[i],choose:false})
			}
			this.listForChoose = [...list]
		},
		computed:{
			...mapState({
				list:state=>state.user.chatList,
				chat:state=>state.user.chat
				// indexList:state=>state.user.indexList
			}),
			top() {
				return this.sHeight + uni.upx2px(200)
			},
			chooseItem() {
				
				return this.listForChoose.filter(v=>v.choose)
			},
			buttonText() {
				if(!this.mode) return '多选'
				return `发送(${this.chooseItem.length})`
				
			},
			searchList() {
				if(!this.inputVal) return this.listForChoose
				let list =  this.listForChoose.filter(v=>{
					if(v && !v.name) return false
					return v.name.indexOf(this.inputVal) !== -1
				})
				console.log(list)
				return list
			},
			ids() {
				let ids = []
				this.chooseItem.forEach(v=>ids.push(v.user_id))
				return ids
			},
			dataType() {
				if(this.detail.type === 'text') return this.detail.data
				let obj = {
					'image':'[图片]',
					'audio':'[音频]',
					'emoticon':'[表情包]',
					'video':'[视频]'
				}
				return obj[this.detail.type]
			}
			
		},
		data() {
			return {
				leaveMes:'',
				inputVal:'',
				mode:false,
				sHeight:20,
				func:null,
				listForChoose:[],
				detail:{},
				singlePerson:{},
				sendNum:0,
				i:0
			}
		}
	}
</script>

<style>

</style>
