<template>
	<view class="position-fixed left-0 right-0 flex align-center justify-center" :style="'bottom:' +bottom+';'">
			<text style="color: #7f7f7f;">© 2021-2022 Chanork 版权所有  |</text>
			<text class="text-dark ml-1"> 浙ICP备2021034336号-2</text>
	</view>
</template>

<script>
	export default {
		props: {
			bottom: {
				type:String,
				default:"10%"
			},
			
			
		}
	}
</script>

<style>
</style>