<template>
	<div ref="pop" style="z-index: 10;" class="free-popup" v-if = "status">
		<!-- 蒙版 -->
		<div  @click="hide()" class="position-fixed left-0 right-0 top-0 bottom-0" :style="color">
		</div>
		<view  class=" bg-white" :style=" bottom ? 'bottom:0;left:0;right:0;' : 'left:'+x+'px;top:'+y+'px;' + bodyStyle " :class="bodyClass+ ' ' + (fixed ? 'position-fixed' : 'position-absolute') ">
			<slot></slot>
		</view>
	</div>
	
</template>

<script>
	// import {mapState} from 'vuex'
	// #ifdef APP-PLUS-NVUE
	const animation = uni.requireNativePlugin('animation')	// #endif
	
	export default {
		
		props:{
			fixed:{
				type:Boolean,
				default:true
			},
			bottom:{
				type:Boolean,
				default:false
			},
			bodyStyle:{
				type:String,
				default:''
			},
			
			isBlack:{
				type:Boolean,
				default:false
			},
			bodyClass:{
				type:String,
				default:''
			},
			// 高度和宽度传进来是字符串
			bodyWidth:{
				type:Number,
				default:0
			},
			bodyHeight:{
				type:Number,
				default:0
			},
			chat:{
				type:Boolean,
				default:false
			},
			center:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			show(x = -1,y = -1) {
				let left = x != -1 ? x : 0
				let top = y != -1 ? y : 0
				try{
					if(!this.fixed) {
						this.x = left - uni.upx2px(this.bodyHeight) - 15
						this.y = top - uni.upx2px(this.bodyHeight / 2)
						this.status = true
						return 
					}
					if(!this.center)
					{
						console.log('不是中心')
						if(!this.maxX) {
							let data = uni.getSystemInfoSync()
							// console.log('屏幕',data.windowWidth,'bodyWidth',this.bodyWidth,'最后',this.maxX)
							this.maxX = data.windowWidth - uni.upx2px(this.bodyWidth)
							this.maxY = data.windowHeight - uni.upx2px(this.bodyHeight)
							if(this.chat) this.maxY -= uni.upx2px(105)
						}
						left = left > this.maxX ? this.maxX : left
						top = top > this.maxY ? this.maxY : top
						this.x = left 
						this.y = top
						console.log('x',this.x,'y',this.y)
						this.status = true
						this.$nextTick(()=>{
							// #ifdef APP-PLUS-NVUE
							animation.transition(this.$refs.pop, {
							    styles: {
							        opacity: 1,
							        transform: 'scale(1,1)',
									transformOrigin:"left top"
							    },
							    duration: 100, //ms
							    timingFunction: 'ease',
							    }, function () {
							        console.log('动画完成')
							    })
							// #endif
						})
					}
					else {
						let info = uni.getSystemInfoSync()
						this.x = info.screenWidth / 2  -  uni.upx2px(this.bodyWidth / 2)
						this.y = info.screenHeight / 2  - uni.upx2px(this.bodyHeight / 2)
						this.status = true
					}
					
				}
				catch(e){
					console.log(e)
				}
			},
			hide() {
				this.$nextTick(()=>{
					// #ifdef APP-PLUS-NVUE
					animation.transition(this.$refs.pop, {
					    styles: {
					        opacity: 0,
					        transform: 'scale(0,0)',
							transformOrigin:"left top"
					    },
					    duration: 100, //ms
					    timingFunction: 'ease',
					    }, ()=>{
							this.status = false
						})
					// #endif
					// #ifndef APP-PLUS-NVUE
					this.status = false
					// #endif
				})
				
			},
			
		},
		data() {
			return {
				status:false,
				x:-1,
				y:-1,
				maxX:0,
				maxY:0
			}
			
		},
		
		mounted() {
		},
		computed:{
			
			color() {
				let i =  this.isBlack ? '.5' : '0'
				return `background-color: rgba(0,0,0,${i});`
			},
			box() {
				return `width:${this.bodyWidth}rpx;height:${this.bodyHeight}rpx;`
			}
		},
	}
</script>

<style scoped>
	.free-popup {
		/* #ifdef APP-PLUS-NVUE */
		opacity: 0;
		transform: scale(0,0);
		/* #endif */
		
	}
</style>
