<template>
	<div :class ="item.istop? 'bgc' : 'bg-white' " class="flex align-center " @longpress.stop="long" @click = "navTo()">
		<view class="position-relative flex align-center justify-center" style="width: 130rpx;height: 120rpx;">
			
			<avatar :src="item.avatar ? item.avatar : (item.type === 'group' ? '../../static/groupdefault.jpg' : '../../static/default.jpg') " ></avatar>
			<free-badge :position="'top: 0;right: 0;'" :noreadnum="item.noreadnum? item.noreadnum + '' : ''"></free-badge>
		</view>
		<view class="flex justify-between flex-column flex-1 py-3 ml-2 pr-2 border-bottom">
			<view class="flex justify-between align-center">
				<text style="max-width: 380rpx;font-size: 32rpx;color: #2a2a2a;" class="font-weight-bold text-ellipsis" >{{item.name}}</text><text class="font-sm" style="color: #afafaf;">{{item.update_time| formatTime}}</text>
			</view>
			<text class="font-sm text-muted text-ellipsis pt-1" style="font-size: 25rpx;">{{item.data}}</text>
			
		</view>
		<free-popup ref = "list_pop" :bodyHeight="getHeight" :bodyWidth="250" >
			<view class="flex flex-column border flex-1" style="width: 250rpx;" :style="'height: '+getHeight+'rpx;'">
					<text class="flex-1 pl-1"  v-for="(item1,index) in menu" :key ='index' style="line-height: 100rpx;" @click="popEvent(item1.event)"  >{{item1.name}}</text>
			</view>
		</free-popup>
	</div>
</template>

<script>
	import avatar from '@/components/free-ui/free-avatar.vue'
	import freeBadge from '@/components/free-ui/free-badge.vue'
	import freePopup from './free-popup.vue'
	import freeBase from '@/common/mixin/free-base.js'
	import {mapState} from 'vuex'
	export default{
		mixins:[freeBase],
		components:{
			avatar,
			freeBadge,
			freePopup
		},
		
		props:{
			item:{
				type:Object,
				default:{}
			},
			index:{
				type:Number,
				default:-1
			},
			
		},
		methods:{
			long(e)
			{
				console.log(e)
				let x = 0
				let y = 0
				// #ifdef APP-PLUS-NVUE
				if(e.changedTouches.length)
				{
					
					x  = e.changedTouches[0].screenX
					y  = e.changedTouches[0].screenY
					this.$refs.list_pop.show(x,y)
				}
				// #endif
				// #ifdef MP
				x  = e.changedTouches[0].screenX
				y  = e.changedTouches[0].screenY
				this.$refs.list_pop.show(x,y)
				// #endif
				// #ifdef H5
				x  = e.changedTouches[0].pageX
				y  = e.changedTouches[0].pageY
				this.$refs.list_pop.show(x,y)
				// #endif
			},
			
			// 每个弹出层的事件
			popEvent(event) {
				switch(event){
					case 'isTop' :
						this.$emit('changeTop',this.index)
						break;
					case 'removeConversation':
						this.chat.removeChatItem(this.item.id,this.item.chat_type)
						console.log('删除')
						break;
						 
				}
			},
			navTo() {
				let obj = {
					name:this.item.name,
					avatar:this.item.avatar ? this.item.avatar : '../../static/default.jpg',
					chat_type:this.item.chat_type,
					id:this.item.id
				}
				uni.navigateTo({
					url:"../../pages/chat/chat?params="+encodeURIComponent(JSON.stringify(obj)),
					fail:(err) => {
						console.log(err)
					}
				})
				this.read()
			},
			read() {
				this.chat.readChatItem(this.item.id,this.item.chat_type)
			}
		}, 
		data() {
			return {
				menu:[
					{
						name:this.item.isTop ? '取消置顶' : '置顶' ,
						event:'isTop'
					},
					{
						name:'删除该聊天记录',
						event:"removeConversation"
					},
					
				]
			}
		},
		computed:{
			...mapState({
				chat:state=>state.user.chat
			}),
			getHeight(){
				return this.menu.length * 100
			}
 		}
	}
</script>

<style scoped>
	.bgc{
		background-color: #e4e4e4;
	}
	
</style>
