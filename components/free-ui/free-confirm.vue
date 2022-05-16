<template>
	<popup center ref = "confirm" :bodyClass="'rounded'" :isBlack="true" :bodyHeight="bodyHeight" :bodyWidth="600" >
		<view class="bg-white position-relative" :style="'height:'+bodyHeight+'rpx;'" style="width: 600rpx;">
			<slot></slot>
			<view class="position-absolute left-0 right-0 bottom-0 rounded flex align-center" style="" >
				<view @click="confirm" class="flex align-center justify-center flex-1 border-top border-right" >
					<text  class="py-2" :style="'color:' + confirmColor + ';'" style="font-size: 36rpx;">确定</text>
				</view>
				<view @click="cancel" class="flex align-center justify-center flex-1 border-top " >
					<text class="py-2" style="font-size: 36rpx;">取消</text>
				</view>
				
			</view>
		</view>
	</popup>
</template>

<script>
	import popup from './free-popup.vue'
	export default{
		components:{
			popup
		},
		props:{
			bodyHeight:{
				type:Number,
				default:450
			},
			confirmColor:{
				type:String,
				default:''
			}
		},
		
		data() {
			return {
				callback:null
			}
		},
		methods:{
			confirm() {
				this.callback(()=>{
					this.$refs.confirm.hide()
				})
			},
			cancel() {
				this.$refs.confirm.hide()
			},
			show(callback = false) {
				if(callback) {
					this.callback = callback
				}
				this.$refs.confirm.show()
				
			}
		}
	}
</script>

<style>
</style>
