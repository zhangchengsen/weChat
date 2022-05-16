<template>
	<view>
		<video style="width: 750rpx;" :src="url" :style="'height:' + height + 'px;'" controls autoplay></video>
		<view @click="back()" class="position-fixed flex align-center justify-center bg-white" style="top: 30rpx;left: 30rpx;width: 60rpx;height: 60rpx;opacity: 0.3;border-radius: 10rpx;">
			<text class="iconfont" style="font-size: 40rpx;">&#xe620;</text>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(e) {
			let info = uni.getSystemInfoSync()
			this.height = info.screenHeight
			
			this.url = e.url
		},
		data(){
			return {
				url:'',
				height:500
			}
		},
		methods:{
			back() {
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	
</style>
