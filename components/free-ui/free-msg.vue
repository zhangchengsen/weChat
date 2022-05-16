<template>
	<view class="bg-white flex align-center" style="padding-left: 45rpx;">
		<image v-if="src" :src="src" style="width: 120rpx;height: 120rpx;" mode="" class="rounded"></image>
		<view class="flex flex-column justify-between flex-1" style="margin-left: 30rpx;" @click="$emit('click')">
			<view class="flex align-center justify-between">
				<text style="" class="font-lg font-weight-bold">{{title}}</text>
				<image v-if="showStar" class="mr-3" src="../../static/images/star.png" style="width: 40rpx;height: 40rpx;"></image>
			</view>
			<view class="flex align-center justify-between" style="margin-top: 30rpx">
				<slot name="inner">
				<text style="color: #6c6c6c;font-size: 30rpx;">{{'微信号 : '+content}}</text>
				<view class="flex">
					<text style="color: #6c6c6c;" class="iconfont mr-2">&#xe86d;</text>
					<text style="color: #6c6c6c;" class="iconfont mr-2">&#xe60c;</text>
				</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			src:{
				type:String,
				default:''
			},
			title:{
				type:String,
				default:''
			},
			showStar:{
				type:Boolean,
				default:false
			},
			content:{
				type:String,
				default:''
			}
			
		}
		
	}
</script>

<style>
</style>
