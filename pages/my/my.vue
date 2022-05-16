<template>
	<view class="flex-1" style="background-color: #EDEDED;">
		<view class="bg-white">
			<!-- 占位 -->
			<view class="bg-white" style="padding-top: 120rpx;"></view>
			<!-- 占位 -->
			<!--  -->
			<!-- '../../static/ymtx.jpg' -->
			
			<free-msg @click="navTo('my_setting')" :src="user.avatar ? user.avatar :'../../static/default.jpg'" :content="user.id" :title="user.nickname ? user.nickname : user.username"></free-msg>
			
			<view class="pt-3" style="height: 120rpx;">
				<text  class="border rounded-circle" style="margin-left: 190rpx;font-size: 28rpx;color: #6c6c6c;padding: 8rpx;width: 110rpx;">+ 状态</text>
			</view>
			<free-divider :height="15" :bgc="'#ededed'"></free-divider>
			<free-list-item showRight  :title="'支付'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe66c;</text>
			</free-list-item>
			<free-divider :height="15" :bgc="'#ededed'"></free-divider>
			<free-list-item @click="navTo('my_favor')" showRight  :title="'收藏'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xea2d;</text>
			</free-list-item>
			<free-list-item showRight  :title="'相册'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe608;</text>
			</free-list-item>
			<free-list-item showRight  :title="'表情'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe605;</text>
			</free-list-item>
			<free-divider :height="15" :bgc="'#ededed'"></free-divider>
			<free-list-item showRight @click="navTo('setting')"  :title="'设置'" >
				<text slot="leftIcon" class="iconfont p-2 font-lg">&#xe612;</text>
			</free-list-item>
			
			<Number></Number>
		</view>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import freeListItem from '../../components/free-ui/free-list-item.vue'
	import freeDivider from '../../components/free-ui/free-divider.vue'
	import freeMsg from '../../components/free-ui/free-msg.vue'
	import auth from '../../common/mixin/auth.js'
	import Number from '@/components/free-ui/free-number.vue'
	export default{
		mixins:[auth],
		components:{
			freeDivider,
			freeListItem,
			freeMsg,
			Number
		},
		methods:{
			navTo(url) {
				uni.navigateTo({
					url
				})
			}
		},
		computed:{
			...mapState({
				user:state=>state.user.user
			})
		}
	}
</script>


<style>
</style>
