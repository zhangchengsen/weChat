<template>
	<image @click="toPreview"  @load="load" :src="item.type === 'video' ? item.options.poster :item.data" class="rounded" style="border-radius: 5rpx;margin-bottom: 5rpx;"  :style="'width: '+ x +'px;height:'+ y +'px;'"></image>
</template>

<script>
	export default{
		props:{
			item:{
				type:Object,
				default:{}
			},
			maxX:{
				type:Number,
				default:0
			},
			maxY:{
				type:Number,
				default:0
			},
			open:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			// 图片加载
			load(e) {
				console.log(e)
				let x = e.detail.width
				let y = e.detail.height
				let maxX = this.maxX ? uni.upx2px(this.maxX) : uni.upx2px(310)
			    let maxY = this.maxY ? uni.upx2px(this.maxY) : maxX * y / x
				if(x > maxX) x = maxX
				if(y > maxY) y = maxY
				this.x = x
				this.y = y
				if(this.item.type === 'video')  this.$emit('imgLoad',{x:this.x,y:this.y})
			},
			toPreview() {
				console.log(this.open,'open')
				if(!this.open) return
				if(this.item.type === 'audio') this.$emit('preview',this.item.content)
				else this.$emit('previewVideo',this.item.content)
			}
		},
		data() {
			return {
				x:300,
				y:300,
			}
		},
		mounted() {
			console.log(this.item)
		}
	}
</script>

<style>
</style>
