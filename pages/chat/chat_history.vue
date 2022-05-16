<template>
	<view class="" >
		<nav-bar showBack  :bgWhite='true'  :title="'与'+name+'的聊天记录'" :showRight="false" >
			<!-- <free-button v-if="type !== 'card'" @click="changeMode" slot= 'rightIcon' :text="buttonText"></free-button> -->
		</nav-bar>
		<view class="" style="background-color: #EDEDED;">
			<input class="m-2 bg-white px-2 rounded" style="width: 710rpx;height: 80rpx;font-size: 32rpx;" placeholder="搜索" v-model="inputVal" placeholder-class="text-center"   />
		</view>
		
		
		<scroll-view scroll-y="true" :show-scrollbar="false" class=" px-3 position-fixed left-0 right-0 bottom-0" :style="'top:'+sHeight+'px;'" style="background-color: #E9E8E5;" :scroll-with-animation="true" >
			<!-- 聊天信息 -->
			<chat-item ref="chatItem" :id="'id' + index" @preview="preview" :index = 'index'  :preTime="index ? renderList[index - 1].create_time : 0 " :item = "item" v-for="(item,index) in renderList" :key = "index" @withDraw = 'withDraw' :shownickname="true" @remove="remove" :popFunc = 'false'></chat-item>
			<view class="" style="height: 10rpx;">
				
			</view>
			<!-- 聊天信息 -->
		</scroll-view>
		
		
		
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	import freeListItem from '../../components/free-ui/free-list-item.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	import chatItem from '../../components/free-ui/chat-item.vue'
	export default {
		components:{
			freeListItem,
			navBar,
			chatItem
		},
		onLoad(e) {
			let info = uni.getSystemInfoSync()
			this.sHeight = info.statusBarHeight + uni.upx2px(220)
			this.name = e.name
			this.list = this.chat.getChatDetail()
			
			
			console.log(this.list)
		},
		data() {
			return {
				inputVal:'',
				list:[],
				name:'',
				sHeight:0
			}
		},
		computed:{
			...mapState({
				user:state=>state.user.user,
				chat:state=>state.user.chat
			}),
			renderList() {
				if(!this.inputVal) return this.list
				return this.list.filter(v=>{
					return  v.data.indexOf(this.inputVal) !== -1
				})
			}
		}
		
	}
</script>

<style>

</style>