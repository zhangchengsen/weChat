<template>
	<view class="flex mx-3 flex-wrap ">
		<view class="m-1 flex align-center justify-center position-relative" style="width: 210rpx;height: 210rpx;" v-for="(item,index) in imageList" :key = "index">
			
			<image  @click="preview(index)" :src="item" class="rounded" style="width:200rpx;height: 200rpx;"></image>
			<text class="position-absolute  iconfont text-white  rounded-circle" style="font-size: 36rpx;top: -10rpx;right: -5rpx;background-color: rgba(0,0,0,.4);padding-left: 15rpx;padding-right: 15rpx;" @click="changeImg(index)">x</text>
			
		</view>
		<view v-if="imageList.length < 9" class="m-1 flex rounded justify-center border" style="width: 210rpx;height: 210rpx;">
			<text class="text-muted pb-1" @click="changeImg()" style="line-height: 210rpx;font-size: 120rpx;">+</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			imageList:{
				type:Array,
				default:[]
			}
		},
		
		data() {
			return {
			}
		},
		methods:{
			changeImg(index = -1) {
				if(index !== -1) return this.$emit('deleteImage',index)
				uni.chooseImage({
					count:9 - this.imageList.length,
					success: (res) => {
						console.log(res)
						this.$emit('upload',res.tempFilePaths)
					}
				})
			},
			preview(index) {
				uni.previewImage({
					current:index,
					urls:this.imageList
				})
			}
		}
		
		
	}
</script>

<style>
</style>
