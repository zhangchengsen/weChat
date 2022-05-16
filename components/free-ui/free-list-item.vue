<template>

	<view class="flex align-center bg-white" style="width: 100%;" @click="emit" :class="bodyClass">
		<!-- 图片 -->
		<view v-if="src || type === 'user'" class="flex align-center justify-center" style="height: 110rpx;width: 130rpx;">
			<image  :src="src ? src : '../../static/default.jpg' " class="rounded" style="width: 78rpx;height: 78rpx; " mode="widthFix"></image>
		</view>
		<view v-if=" type === 'group'" class="flex align-center justify-center" style="height: 110rpx;width: 130rpx;">
			<image  :src="src ? src : '../../static/groupdefault.jpg' " class="rounded" style="width: 78rpx;78rpx " mode="widthFix"></image>
		</view>
		
		<slot name="leftIcon"></slot>
		<!-- 图片 -->
		<view class="flex  align-center  flex-1" :class="borderBottom ? 'border-bottom' : '' ">
			<slot name="innerIcon"></slot>
			<view class="flex align-center justify-between flex-1">
				<view class="flex align-center ml-1" :class="marginLeft ? 'ml-3' : ''">
					<!-- 标题 -->
					<text class="py-3 pl-1 text-ellipsis" style="font-size: 33rpx;max-width: 470rpx;">{{title}}</text>
					<!-- 标题 -->
					<!-- 副标题 -->
					<slot name="subImage">
					<text class="text-muted text-ellipsis" style="margin-left: 20rpx;font-size: 33rpx;max-width: 400rpx;">{{subTitle}}</text>
					</slot>
					<!-- 副标题 -->
				</view>
				
				
				
				<view class="flex align-center pr-2">
					<slot name="rightImg"></slot>
					<text v-if="rightText" style="font-size: 30rpx;color: #848484;margin-left: 5rpx;max-width: 400rpx;" class="iconfont text-ellipsis">{{rightText}}</text>
					<text v-if="showRight" class="iconfont">&#xe60c;</text>
					
				</view>
			</view>
			
		</view>
	</view>
</view>
	
</template>

<script>
	export default{
		props:{
			marginLeft:{
				type:Boolean,
				default:false
			},
			leftIcon:{
				type:String,
				default:''
			},
			title:{
				type:String,
				default:''
			},
			src:{
				type:String,
				default:''
			},
			showRight:{
				type:Boolean,
				default:false
			},
			rightText:{
				type:String,
				default:''
			},
			subTitle:{
				type:String,
				default:''
			},
			borderBottom:{
				type:Boolean,
				default:true
			},
			bodyClass:{
				type:String,
				default:""
			},
			type:{
				type:String,
				default:''
			}
			// showAudio:{
			// 	type:Boolean,
			// 	default:true
			// }
		},
		methods:{
			emit() {
				this.$emit('click')
			}
		}
	}
</script>

<style>
</style>
