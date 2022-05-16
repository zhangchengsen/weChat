<template>
	<view class="mr-2 flex align-center " style="height: 90rpx;" @click="$emit('click')" >
		<text style="font-size: 32rpx;padding-top: 8rpx;padding-bottom: 8rpx;" class=" px-2   rounded" :class="bgColor+ ' ' +textColor  " :style="bodyStyle">{{text}}</text>
	</view>
</template>

<script>
	export default{
		props:{
			text:{
				type:String,
				default:''
			},
			bgColor:{
				type:String,
				default:'main-bg-color'
			},
			textColor:{
				type:String,
				default:'text-white'
			},
			bodyStyle:{
				type:String,
				default:''
			},
			
		}
	}
</script>

<style>
</style>
