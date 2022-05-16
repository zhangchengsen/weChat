<template>
	<text v-if="noreadnum" :class="position ? 'position-absolute' : '' " class="free-badge  bg-danger rounded-circle text-white font-sm " :style="position">{{noreadnum}}</text>
</template>

<script>
	export default{
		props:{
			position:{
				type:String,
				default:''
			},
			noreadnum:{
				type:String,
				default:''
			}
		}
	}
</script>

<style scoped>
	.free-badge{
		padding-left: 14rpx;padding-right: 14rpx;padding-top: 6rpx;padding-bottom: 6rpx;
	}
</style>
