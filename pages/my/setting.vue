<template>
	<view class="page" style="">
		<nav-bar showBack title="我的设置" bgWhite :showRight="false">
			
		</nav-bar>
		
		<view class="mt-2 bg-white border-bottom flex align-center justify-center" hover-class="bg-light" @click="relaunch">
			<text class="text-primary py-3"  style="font-size: 36rpx;">一键重启</text>
		</view>
		<view class=" bg-white flex align-center justify-center" hover-class="bg-light" @click="logout">
			<text class="text-primary py-3"  style="font-size: 36rpx;">退出登录</text>
		</view>
	</view>
</template>

<script>
	import freeListItem from '../../components/free-ui/free-list-item.vue'
	import navBar from '@/components/free-ui/free-nav.vue'
	import auth from '../../common/mixin/auth.js'
	export default{
		mixins:[auth],
		components:{
			navBar,
			freeListItem,
		},
		mounted() {
		},
		data() {
			return {
				userInfo:{
					avatar:'../../static/ymtx.jpg',
					nickname:'IT黑马',
					username:'zhangchengsen003'
				},
				changeType:'',
				text:'',
			}
		},
		methods:{
			relaunch() {
				uni.reLaunch({
					url:'../common/login'
				})
			},
			navTo(){
				uni.navigateTo({
					url:'card'
				})
			},
			logout() { 
				
				this.$http.get('/logout')
				.then(res=>{
					this.$store.dispatch('logout')
					uni.reLaunch({
						url:'../common/login'						
					})
					
				})
			}
			
		},
		computed:{
		}
	}
</script>

<style>
</style>
