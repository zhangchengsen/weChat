<template>
	<!-- 导航  -->
	<view  :class="getBgc" >
		<view class="position-fixed fixed-top " :class="getBgc" :style="blur ?'background-color:rgba(255,255,255,'+isGradient+');' :'' ">
			<view class="" :style="'height:' + sHeight + 'px;'"></view>
			<view class="flex w-100 align-center">
				<view class="flex align-center flex-1" :class="showRight ? 'justify-between' :'' " >
					<view class="flex align-center">
						<text v-if="showBack" @click="back()" class="pl-3  iconfont" style="margin-top: 5rpx;" >&#xe60d;</text>
						<slot name="leftContent"></slot>
						<text v-if="subTitle" style="font-size: 32rpx;margin-left: 10rpx;" class="font-weight-bold">{{subTitle}}</text>
					</view>
					
					
					<view class=" ml-3 flex align-center justify-center" style="color: #000;height: 90rpx;" >
						<text style="font-size: 32rpx;max-width: 450rpx;" class="font-weight-bold text-ellipsis">{{title}}</text>
						
					</view>
					<slot name="rightIcon">
					<view class="flex" v-if="showRight &&!blur">
						<free-icon-button  @click="toSearch" :icon = "'\ue6e3'"></free-icon-button>
						<free-icon-button :icon="'\ue682'" @click ="show"></free-icon-button>
					</view>
					<free-icon-button v-if="blur" :icon="'\ue682'" @click ="toPublish"></free-icon-button>
					</slot>
				</view>
			</view>
			
		</view>
		
		<free-popup ref = "popup" :bodyStyle="'background-color:rgba(51, 57, 62,0.9);'" :bodyWidth="300" :bodyHeight="menu.length * 100" >
			<view class="flex flex-column border flex-1 " style="width: 250rpx;" :style="'height: '+(menu.length*100)+'rpx;'">
				<view class="flex align-center" v-for="(item,index) in menu" :key ='index'>
					<text class="iconfont pl-2 text-white"  style="font-size: 33rpx;">{{item.icon}}</text>
					<text class="flex-1 pl-2 text-white" style="font-size: 32rpx;line-height: 100rpx;" >{{item.name}}</text>
				</view>
				
			</view>
		</free-popup>
		<!-- 占位  -->
		<view class="" v-if="!blur" :style="topStyle"  >
			
		</view>
		<!-- 占位  -->
	</view>
	
	<!-- 导航  -->
</template>

<script>
	import freePopup from '../../components/free-ui/free-popup.vue'
	import freeIconButton from '../../components/free-ui/free-icon-button.vue'
	export default{
		props:{
			blur:{
				type:Boolean,
				default:false
			},
			subTitle:{
				type:String,
				default:''
			},
			bgWhite:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:''
			},
			fixed_top:{
				type:Boolean,
				default:true
			},
			showBack:{
				type:Boolean,
				default:false
			},
			showRight:{
				type:Boolean,
				default:true
			},
			judgeBack:{
				type:Boolean,
				default:false
			}, 
			scrollTop:{
				type:Number,
				default:0
			}
		},
		components:{
			freeIconButton,
			freePopup
		},
		mounted() {
			this.getStatusBarHeight()
		},
		methods: {
			toSearch() {
				uni.navigateTo({
					url:'../../pages/common/search'
				})
			},
			getStatusBarHeight() {
				// #ifdef APP-PLUS-NVUE
				let statusHeight= plus.navigator.getStatusbarHeight()
				this.sHeight =  statusHeight
				// #endif
			},
			show(e) {
				// #ifdef H5
				console.log(e)
				this.$refs.popup.show(e.currentTarget.offsetLeft,uni.upx2px(140))
				// #endif
				// #ifndef H5
				this.$refs.popup.show(uni.upx2px(465),uni.upx2px(140))
				// #endif
			},
			back() {
				if(this.judgeBack) this.$emit('back')
				else uni.navigateBack({
					delta:1
				})
				
			},
			toPublish() {
				console.log('toPublish')
				let arr = [
					{
						name:'图文',
						key:'image'
					},
					{
						name:'短视频',
						key:'video'
					},
					{
						name:'文字',
						key:'text'
					}
				]
				uni.showActionSheet({
					itemList:arr.map(v=>v.name),
					success:res=>{
						let key = arr[res.tapIndex].key
						uni.navigateTo({
							url:'../../pages/find/add_moment?type='+key
						})
					}
				})
			}
			
		},
		data() {
			return {
				sHeight:0,
				menu:[
					{
						name:'发起群聊',
						icon:'\ue633',
						event:'toGruop'
					},
					{
						name:'添加好友',
						icon:"\ue65d",
						event:'addFriends'
					},
					{
						name:'扫一扫',
						icon:"\ue86d",
						event:'scanfCode'
					},
					{
						name:'收付款',
						icon:"\ue66c",
						event:'payOrGet'
					},
					{
						name:'帮助与反馈',
						icon:"\ue62a",
						event:'helpAndFeedback'
					},
				]
			}
		},
		computed:{
			topStyle() {
				return 'height:' + (this.sHeight + uni.upx2px(90)) +'px;'
			},
 			getBgc() {
				if(this.blur) return ''
				return this.bgWhite ? 'bg-white' : 'gray'
			},
			isGradient() {
				let start = uni.upx2px(485)
				let beforeStart = uni.upx2px(350)
				let end = uni.upx2px(610)
				
				if(this.scrollTop >= end) {
					return 1
				}
				else if(this.scrollTop >= start)  {
					return 0.5
				}
				else if(this.scrollTop >= beforeStart) return 0.25
				else return 0
			}
			
		}
	}
</script>

<style>
	
</style>
