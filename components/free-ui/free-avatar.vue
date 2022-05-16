<template>
	<image :src="src" mode="aspectFill"   @click="$emit('click')" :class="type + ' '+rounded ? 'rounded' : '' " :style="trueSize + bodyStyle" ></image>
</template>

<script>
	export default{
		props:{
			src:{
				type:String,
				default:''
			},
			type:{
				type:String,
				default:'rounded'
			},
			size:{
				type:[String,Number],	
				default:'92'
			},
			bodyStyle:{
				type:String,
				default:''
			},
			rounded:{
				type:Boolean,
				default:false
			}
			
		},
		computed:{
			trueSize() {
				return `width: ${this.size}rpx;height: ${this.size}rpx;`
			}
		}
	}
</script>

<style>
</style>
