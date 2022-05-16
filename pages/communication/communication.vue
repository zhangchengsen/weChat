<template>
	<view class="" style="">
		<nav-bar :title ="'通讯录'"></nav-bar>
		<scroll-view scroll-y="true" class="position-fixed left-0 right-0 bottom-0" :style="'top:' + ( sHeight ) + 'px;'" :scroll-into-view="scrollInto">
			
			<block v-for="(item,index) in list" :key = "item.id">
				<free-list-item :title="item.title" :src = "item.src" @click="navTo(item.path)"  >
					<view class="pr-4" slot="rightImg">
						<free-badge  v-if="item.num" :noReadNum="item.num + ''"></free-badge>
					</view>
					
				</free-list-item>
			</block>
			<!-- 联系人 -->
			<block v-for="(item,index) in address" :key = "index">
				<view  :id="'item-'+ item.title" style="height: 60rpx;background-color: #ededed;" class="flex align-center">
					<text class="ml-2" style="font-size: 24rpx;color: #6a6a6a;">{{item.title}}</text>
				</view>
				<free-list-item  v-for="(item1,index1) in item.list" :key="index1" :title="item1.name ? item1.name : item1.username" :src = "item1.avatar  ? item1.avatar : '../../static/default.jpg' " @click="toUser(item1.user_id)">
					
				</free-list-item>	
			</block>
			<!-- 联系人 -->
			<view class="" style="z-index: 100;height: 100rpx;" @click="c">
			</view>
		</scroll-view>
		
		<!-- 索引列表 -->
		<view class="position-fixed right-0 bottom-0 flex flex-column" :style=" 'top:' + sHeight + 'px;' " style="width: 50rpx;background-color: #EDEDED;" @touchstart="touchstart" @touchmove="touchstart" @touchend="touchend">
			<text v-for="(item,index) in letterList" :style="'height:'+ letterHeight + 'px;'" :key="index" style="font-size: 26rpx;text-align: center;">{{item}}</text>
		</view>
		<!-- 索引列表 -->
		<!-- 中间字母 -->
		<view class="rounded-circle position-fixed flex align-center justify-center" v-if="letterVis" style="width: 80rpx;height: 80rpx;background-color: #EDEDED;" :style="letterStyle" >
			<text style="font-size: 42rpx;">{{letter}}</text>
		</view>
		<!-- 中间字母 -->
		<Number></Number>
	</view>
	
</template>

<script>
	
	import freeListItem from '@/components/free-ui/free-list-item.vue'
	import navBar from '@/components/free-ui/free-nav.vue'
	import freeBadge from '../../components/free-ui/free-badge.vue'
	import Number from '@/components/free-ui/free-number.vue'
	import {mapState} from 'vuex'
	import auth from '../../common/mixin/auth.js'
	export default{
		
		mixins:[auth],
		data() {
			return {
				sHeight:0,
				list:[
					{
						id:'friends',
						title:'新的朋友',
						src:"../../static/images/mail/friend.png",
						path:'../common/handleApply',
						num:0
					},
					{
						id:'group',
						title:'群聊',
						src:"../../static/images/mail/group.png",
						path:'../common/group_list',
						num:0
					},
					{
						id:'tag',
						title:'标签',
						src:"../../static/images/mail/tag.png",
						path:'../common/tags',
						num:0
					}
				],
				
				screenHeight:568,
				scrollInto:'',
				timer:null,
				screenWidth:375,
				letterVis:false,
				letter:'',
				statusHeight:0
			}
		},
		methods:{
			c() {
				console.log(this.letterList,this.address)
			},
			toUser(id) {
				
				uni.navigateTo({
					url:'../chat/chat-user?id='+id
				})
			},
			touchstart(e) {
				let index = Math.floor((e.touches[0].pageY - this.sHeight) / this.letterHeight)
				index = index
				if(index < 0||index >25) return 
				let letter = this.letterList[index]
				this.scrollInto = 'item-' + letter
				if(this.timer) clearTimeout(this.timer)
				this.timer = null
				this.letterVis = true
				this.letter = letter
				this.timer = setTimeout(()=>{
					this.letterVis = false
				},800)
				
				
			},
			
			touchEnd() {
				let i = 1
			},
			navTo(url) {
				uni.navigateTo({
					url,
					fail: (err) => {
						console.log(err)
					}
				})
			}
			
			
		},
		onShow() {
			this.$store.dispatch('getContacts')			
		},
		mounted() {
			if(this.applyNum) {
				 this.list[0].num = this.applyNum
				 this.list = [...this.list]
			}
			let info  = uni.getSystemInfoSync()
			this.screenHeight = info.screenHeight
			this.screenWidth = info.screenWidth
			let statusHeight= info.statusBarHeight
			this.statusHeight = info.statusHeight ? info.statusHeight : 0
			this.sHeight =  statusHeight + uni.upx2px(90)
			uni.removeTabBarBadge({
				index:1
			})
			
		},
		components:{
			navBar,
			freeListItem,
			freeBadge,
			Number
		},
		computed:{
			...mapState({
				applyNum:state=>state.user.applyNum,
				letterList:state=>state.user.indexList,
				address:state=>state.user.newList
			}),
			letterStyle () {
				return 'left:'+ ( this.screenWidth / 2 - uni.upx2px(40) )+'px;top:'+ ( this.screenHeight
				 / 2 - uni.upx2px(40) ) +'px;'
				
			},
			letterHeight () { 
				if(!this.letterList.length) return 20
				let letterHeight = (this.screenHeight - this.statusHeight - uni.upx2px(90)) / this.letterList.length - 2
				
				return letterHeight
			}
		}
	}
</script>

<style>
</style>
