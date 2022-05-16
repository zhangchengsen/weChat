<template>
	<view @click="$emit('click',$event)"  class="flex align-center justify-center" style="height: 90rpx;width: 90rpx;"  hover-class="bg-light">
		<text  class="iconfont font-md" >{{icon}}</text>
	</view>
</template>

<script>
	export default{
		props:{
			icon:{
				type:String,
				default:""
			},
			
			
			
		}
	}
</script>

<style scoped>
	.bgc{
		background-color: #eee;
	}
</style>
