<template>
	<view class="">
		<nav-bar :title ="'发现'"></nav-bar>
		<view class="">
			<free-list-item @click="navTo('circle_of_friends')" showRight :title="'朋友圈'">
				<text slot = "innerIcon" class="iconfont font-lg p-2" >&#xe667;</text>
				<view slot = "rightImg" class="  p-1">
					
					<view class="position-relative" v-if="notice && notice.user_id">
						
						<free-avatar :size="'76'" :src="notice.avatar ? notice.avatar : '../../static/default.jpg'"></free-avatar>
						<view   class="bg-danger rounded-circle position-absolute" style="top: 2rpx;right: 2rpx;width: 20rpx;height: 20rpx;" ></view>
					</view>
				</view>
			</free-list-item>
			<free-divider :height="15" :bgc="'#ededed'"></free-divider>
			<!-- <free-list-item showRight  :title="'视频号'" :rightText="'等100个好友点赞'">
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe667;</text>
				<view slot = "rightImg" class=" position-relative p-1">
					<free-avatar :size="'76'" :src="'../../static/juju.jpg'"></free-avatar>
					<view   class="bg-danger rounded-circle position-absolute" style="top: 2rpx;right: 2rpx;width: 20rpx;height: 20rpx;" ></view>
				</view>
			</free-list-item> -->
			<free-divider :height="15" :bgc="'#ededed'"></free-divider>
			<free-list-item showRight  :title="'扫一扫'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe86d;</text>
			</free-list-item>
			<free-list-item showRight  :title="'摇一摇'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe63d;</text>
			</free-list-item>
			<free-divider :height="15" :bgc="'#ededed'"></free-divider>
			<free-list-item showRight  :title="'搜一搜'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe611;</text>
			</free-list-item>
			<free-list-item showRight  :title="'看一看'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe610;</text>
			</free-list-item>
			<free-divider :height="15" :bgc="'#ededed'"></free-divider>
			<free-list-item showRight  :title="'购物'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe658;</text>
			</free-list-item>
			<free-list-item showRight  :title="'游戏'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe60a;</text>
			</free-list-item>
			<free-divider :height="15" :bgc="'#ededed'"></free-divider>
			<free-list-item showRight  :title="'更多'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe62a;</text>
			</free-list-item>
			<free-divider :height="15" :bgc="'#ededed'"></free-divider>
		</view>
		<Number></Number>
	</view>
	
</template>

<script>
	import freeAvatar from '../../components/free-ui/free-avatar.vue'
	import freeListItem from '../../components/free-ui/free-list-item.vue'
	import navBar from '@/components/free-ui/free-nav.vue'
	import freeDivider from '../../components/free-ui/free-divider.vue'
	import {mapState} from 'vuex'
	import Number from '@/components/free-ui/free-number.vue'
	import auth from '../../common/mixin/auth.js'
	export default{
		mixins:[auth],
		data() {
			return {
				sHeight:0
			}
		},
		onShow(){
			console.log(this.notice)
		},
		methods:{
			// getStatusBarHeight() {
			// 	// #ifndef APP-PLUS-NVUE
				
			// 	// #endif
			// 	let statusHeight= plus.navigator.getStatusbarHeight()
			// 	this.sHeight =  statusHeight
			// 	console.log(this.sHeight)
			// }
			navTo(url) {
				this.chat.readMoments()
				setTimeout(()=>{
					uni.navigateTo({
						url,
					})
				},300)
				
				
			}
		},
		components:{
			navBar,
			freeListItem,
			freeAvatar,
			freeDivider,
			Number
		},
		computed:{
			...mapState({
				chat:state=>state.user.chat,
				notice:state=>state.user.notice
			})
		}
	}
</script>

<style>
</style>
