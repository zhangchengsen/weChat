<template>
	<view class=" flex p-2 mt-1 border-bottom" style="width: 100%;">
		<free-avatar :src="item.avatar ? item.avatar : '../../static/default.jpg'" :size="80" ></free-avatar>
		<view class="flex-1 flex  flex-column pl-2 ">
			<text class="my-2  " style="font-size: 32rpx;color: #586b95;">{{item.user_name}}</text>
			<text class="font mb-2 " style="width: 540rpx;">{{item.content}}</text>
			<view class=" flex flex-wrap" style="width: 560rpx;">
				<free-image v-if=" item.image.length === 1 " :item="({data:item.image[0]})" :maxX="400" @previewVideo="previewImg"></free-image>
				<image @click="previewImg(item.image,index)" v-if="item.image.length > 1" v-for="(item1,index) in item.image" :src="item1" mode="aspectFill" class="mr-2 mb-2 bg-secondary" style="width: 160rpx;height:160rpx;"></image>
				<view class="py-2" style="margin-bottom: 5rpx;" v-if="item.video">
					<video :src="item.video" :poster="item.video+'?x-oss-process=video/snapshot,t_10,m_fast,w_300,f_png'" controls style="height: 300rpx;width: 500rpx;"></video>
				</view>
			</view>
			<view v-if="item.location">
				<text class="my-1" style="color: #586b95;font-size: 30rpx;">{{item.location}}</text>
			</view>
			<view class="flex align-center justify-between">
				<text class="font text-muted">{{item.created_at| getTime}}</text>
				<div @click="handle" >
					<text class="iconfont text-hover-primary mr-4" >&#xe62a;</text>
				</div>
				
			</view>
			<!-- 点赞 -->
			<view class=" mt-2" style="background-color:#f5f5f5 ;max-width: 500rpx;" v-if=" item.likes.length">
				<view class=" flex align-start p-2" :class="item.likes.length ? 'border-bottom' : '' ">
					<text class="flex-shrink iconfont font text-hover-primary ml-1">&#xe637;</text>
					<view class="flex flex-1 flex-wrap ml-1">
						<text v-for="(like,sindex) in item.likes" :key = "sindex" class="font  " style="color: #586b95;">{{sindex === item.likes.length - 1 ? like.name  :  like.name + ','}}</text>
					</view>
				</view>
			</view>
			<!-- 点赞 -->
			<!-- 评论 -->
			<view class="" style="background-color:#f5f5f5 ;max-width: 500rpx;margin-top: 1rpx;" v-if="item.comments.length">
				<view class=" flex align-start p-2">
					<text class="flex-shrink iconfont font text-hover-primary ml-1">&#xe64e;</text>
					<view class="flex flex-1 flex-column  ml-1" >
						<view class="flex"   v-for="(comment,cindex) in item.comments" :key = "cindex">
							<text @click="reply(comment)" class=" " style="color: #586b95;font-size: 32rpx;">{{comment.user.name+ (comment.reply && comment.reply.name ? '' : ':')}}</text>
							
								<text v-if="comment.reply && comment.reply.name" class="text-dark"   style="font-size: 32rpx;margin-left: 4rpx;margin-right: 4rpx;">回复</text>
								<text v-if="comment.reply && comment.reply.name" style="color: #586b95;font-size: 32rpx;">{{comment.reply.name+":"}}</text>
							
							
							<text class=" ml-1 text-dark " style="font-size: 32rpx;">{{comment.content}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 评论 -->
			
		</view>
		<free-popup :fixed = "false"  ref = "popup" :bodyWidth="370" :bodyHeight="60">
			<view class="bg-dark flex align-center " style="width: 370rpx;height: 60rpx;">
				<text class="iconfont text-white  flex-1 text-center" style="font-size: 32rpx;" @click="admire">&#xe637;{{item.likes.findIndex(v=>v.id === user.id) === -1 ? '点赞' : '取消点赞' }}</text>
				<text @click="toComment" class="iconfont text-white  flex-1 text-center" style="font-size: 32rpx;">&#xe64e;评论</text>
			</view>
		</free-popup>
	</view>
</template>

<script>
	import freeAvatar from '../../components/free-ui/free-avatar.vue'
	import freeImage from '../../components/free-ui/free-image.vue'
	import freePopup from './free-popup.vue'
	import {mapState} from 'vuex'
	import $T from '../../common/free-lib/time.js'
	export default{
		components:{
			freeAvatar,
			freeImage,
			freePopup
		},
		props:{
			item:{
				type:Object,
				default:{}
			},
			index:{
				type:Number,
				default:0
			}
		},
		methods:{
			previewImg(item,current=0) {
				let arr = []
				if(typeof(item) === 'string') 
				{
					arr.push(item)
				}
				else arr = item
				uni.previewImage({
					current:current,
					urls:arr,
					fail: (err) => {
						console.log(err)
					}
				})
			},
			handle(e) {
				// #ifdef MP
				this.$refs.popup.show(e.detail.x - uni.upx2px(250),e.detail.y-uni.upx2px(15))
				return
				// #endif
				// #ifdef APP-NVUE
				this.$refs.popup.show(e.position.x-e.position.width - uni.upx2px(250),e.position.y-uni.upx2px(15))
				// #endif
				// #ifdef H5
				this.$refs.popup.show(e.detail.x - uni.upx2px(280),e.currentTarget.offsetTop )
				return 
				// #endif
				
				this.$emit('show',{item:this.item})
			},
			admire() {
				this.$refs.popup.hide()
				let obj = {
					id:this.item.moment_id
				}
				this.$http.post('/moment/like',obj).then(res=>{
					if(res === '取消点赞成功') {
						this.item.likes.splice(this.item.likes.findIndex(v=>v.id === this.user.id),1)
					}
					else {
						this.item.likes.push(
							{
								id:this.user.id,
								avatar:this.user.avatar,
								name:this.user.nickname || this.user.username
							}
						)
						this.toast('点赞成功')
					}
				})
				
			},
			toComment() {
				console.log(this.index)
				this.$emit('toComment',{index:this.index})
			},
			reply(comment) {
				this.$emit('toComment',{id:comment.user.id,name:comment.user.name,index:this.index})
			}
			
		},
		data() {
			return {
				
			}
		},
		filters:{
			getTime(value) {
				return $T.gettime(value)
			}
		},
		computed:{
			...mapState({
				user:state=>state.user.user
			})
		}
	}
</script>

<style>
</style>
