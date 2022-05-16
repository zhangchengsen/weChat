<template>
	<view class="">
		<nav-bar :title ="totalNoreadnum ? '微信('+ totalNoreadnum+')' : '微信'"></nav-bar>
		
		<view class="bg-white" style="" >
			<view class="flex align-center flex-row justify-center" style="height: 80rpx;background-color: #FA5251;" v-if=" showTime&&(!chat || !chat.isOnline)" >
				<text class="text-white" style="font-size: 32rpx;">当前处于离线状态</text>
				<text @click="relaunch" class=" ml-2 rounded p-1 text-white border-white" style="font-size: 32rpx;border-style: solid;border-color: #fff;border-width: 1rpx;" >重新登录</text>
			</view>
			<template v-if="list.length">
				<!-- 聊天列表 -->
				<block v-for="(item,index) in list" :key = "item.id">
					<free-List-Item  @changeTop = "changeTop" v-if="item.istop" :item = 'item' :index = "index" ></free-List-Item>
				</block>
				<block v-for="(item,index) in list" :key = "item.id">
					<free-List-Item  @changeTop = "changeTop" v-if="!item.istop" :item = "item" :index = "index" ></free-List-Item>
				</block>
			</template>
			<template v-else>
				<view class="" style="padding: 10rpx;">
					<text style="font-size: 18rpx;" class="font-weight-bold">您的消息列表是空的</text>
					<text style="font-size: 14rpx;color: #494F54;margin-left: 10rpx;">记得给好友发给信息哦 ~</text>
				</view>
				
			</template>
			
		</view>
		<free-popup :bodyWidth="100" :bodyHeight="300" ref = "popup"></free-popup>
		<!-- <view class="position-absolute left-0 right-0 flex align-center justify-center" style="bottom: 3%;">
				<text style="color: #7f7f7f;">© 2021-2022 Chanork 版权所有  |</text>
				<text class="text-dark ml-1"> 浙ICP备2021034336号-2</text>
		</view> -->
		<Number></Number>
	</view>
	
</template>

<script>
	import freePopup from '../../components/free-ui/free-popup.vue'
	import freeListItem from '@/components/free-ui/free-index-list.vue'
	import $Time from '@/common/free-lib/time.js'
	import $U from '../../common/free-lib/util.js'
	import navBar from '@/components/free-ui/free-nav.vue'
	import auth from '../../common/mixin/auth.js'
	import Number from '@/components/free-ui/free-number.vue'
	import {mapState} from 'vuex'
	export default {
		components:{
			navBar,
			freeListItem,
			freePopup,
			Number
		},
		mixins:[auth],
		data() {
			return {
				showTime:false
			}
		},
		onLoad() {
			 // #ifdef APP-PLUS-NVUE
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace',{
				"fontFamily":"iconfont",
				"src":"url('https://at.alicdn.com/t/font_1365296_vumpzwvr0z.ttf')"
			});
			 // #endif
			// this.$store.dispatch('getOffline')
			setTimeout(()=>{
				this.showTime = true
			},300)
		},
		methods: {
			changeTop(index) {
				let item = this.list[index]
				let data = item.isTop
				this.$delete(item,'isTop')
				this.$set(item,'isTop',!data)
			},
			relaunch() {
				this.$store.dispatch('logout')
				setTimeout(()=>{
					uni.reLaunch({
						url:'../common/login'
					})
				},200)
				
			}
		},
		computed:{
			...mapState({
				list:state=>state.user.chatList,
				totalNoreadnum:state=>state.user.totalNoreadnum,
				chat:state=>state.user.chat
			})
		}
		
	}
</script>

<style>
	
</style>
