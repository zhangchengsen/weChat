<template>
	<view class="" :style="'height:'+height +'rpx;background-color:'+bgc+';'">
		
	</view>
</template>

<script>
	export default{
		props:{
			height:{
				type:Number,
				default:20
			},
			bgc:{
				type:String,
				default:'#ededed'
			}
		}
	}
</script>

<style>
</style>
