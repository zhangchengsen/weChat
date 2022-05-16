<template>
	<view class="">
		<nav-bar showBack blur :scrollTop="scrollTop"  >
			<text name="rightIcon" class="iconfont" style="">{{'\ue62a'}}</text>
		</nav-bar>
		<view class="position-relative" style="height: 610rpx;">
			<image src="../../static/bgc.jpg" mode="aspectFill" class="" style="height: 590rpx;width: 100%;" ></image>
			<image :src="avatar" class="rounded position-absolute bottom-0" style="width: 120rpx;height: 120rpx;right: 45rpx;" ></image>
			<text class="position-absolute text-white" style="right:200rpx;bottom: 40rpx;">{{name}}</text>
		</view>
		
		
		<!-- 一条动态 -->
		<free-moment-list @toComment="toComment" @show="show" v-for="(item,index) in momentList" :key="index" :item="item" :index = "index"></free-moment-list>
		<!-- 一条动态 -->
		<view class="flex align-center justify-center" style="height: 70rpx;width: 750rpx;" v-if="loadMore">
			<text style="font-size: 36rpx;background-color: #f6f6f6;"  >{{loadMore}}</text>
		</view>
		
		
		
		<!-- 底部 -->
		
		<view v-if="commentVis" class="position-fixed left-0 right-0 bottom-0 top-0" @click="commentVis = false;mode = '';text=''">
		</view>
		
		<view v-if="commentVis " class="position-fixed left-0  right-0 flex align-center" style="height: 105rpx;background-color: #f6f8f5;" :style="toBottom" >
			
			<textarea  v-model="text" :placeholder="commentName ? '回复'+commentName+':' : '' "  :focus="true"  fixed style="font-size: 32rpx;background-color: white;height: 75rpx;" class="ml-2 rounded flex-1 p-2" auto-height   />
			
			<free-icon-button  @click = "changeMode"  :icon="'\ue605'" ></free-icon-button>
			
			<text ref="text" :style="text?'color: white;background-color: #07C160;font-size: 28rpx;': 'color:#eee;background-color:#ccc;' " class=" px-2 py-1 mr-1 rounded"  @click="send" >发送</text>
		</view>
		<view class="bg-white flex align-center flex-wrap position-fixed left-0 bottom-0 right-0" v-if="mode === 'emoticon' && commentVis" style="height: 300rpx;">
			<text v-for="(item,index) in faceList" :key = "index" @click="text+=item" class="text-center" style="width: 107rpx;height: 100rpx;line-height: 100rpx;">{{item}}</text>
		</view>
		<Number></Number>
	</view>
</template>

<script>
	import Number from '@/components/free-ui/free-number.vue'
	import freeMomentList from '../../components/free-ui/free-moment-list.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	import freePopup from '../../components/free-ui/free-popup.vue'
	import freeIconButton from '../../components/free-ui/free-icon-button.vue'
	import {mapState} from 'vuex'
	export default {
		methods:{
			show(e) {
				
				
				
				this.obj = {...e.item}
				
			},
			send() {
				console.log(this.obj)
				let obj = {
					id:this.obj.moment_id,
					content:this.text,
					reply_id:this.reply_id - 0
				}
				this.$http.post('/moment/comment',obj)
				.then(res=>{
					this.momentList[this.current_index].comments.push({
						content:this.text,
						user:{
							id:this.user.id,
							name:this.user.nickname ? this.user.nickname : this.user.username
						},
						reply:this.reply_id ? {
							id:this.reply_id,
							name:this.commentName
						} : null
						
					})
					this.text = ''
					this.commentVis = false
					this.toast('评论已发送','success');
				})
				
			},
			changeMode() {
				uni.hideKeyboard()
				this.mode = 'emoticon'
			},
			
			getMomentList() {
				if(this.loadMore !== '上拉加载更多') return
				this.loadMore = '加载中...'
				let url = '/moment/timeline/' + this.page
				let obj = {
					user_id:0
				}
				if(this.params.id) {
					
					url =  '/moment/list/' + this.page
					if(this.user.id != this.params.id)
					{
						obj["user_id"] = this.params.id - 0
					}
				}
				this.$http.get(url,obj).then(res=>{
					console.log(res)
					this.loadMore = '上拉加载更多'
					if(this.page === 1) {
						this.momentList = [...res]
						if(res.length < 10) {
							this.loadMore = ''
							this.page--
						}
					}
					else {
						if(res.length < 10) {
							this.loadMore = '没有更多了' 
							this.page--
						}
						this.momentList = [...this.momentList,...res]
					}
					if(this.inRefresh) {
						this.inRefresh = false
						uni.stopPullDownRefresh()
					}
					this.page++
				})
				.catch(err=>{
					console.log(err)
					this.loadMore = '加载失败'
					this.page--
				})
			},
			toComment(e) {
				if(e.id) {
					this.reply_id = e.id
					this.commentName = e.name
				}
				else {
					this.reply_id = 0
					this.commentName = ''
				}
				this.obj = this.momentList[e.index - 0]
				this.current_index = e.index - 0
				this.commentVis = true
			}
			
			
		},
		onPageScroll(e) {
			// #ifndef MP
			this.scrollTop = e.scrollTop
			// #endif
			// #ifdef MP
			this.scrollTop = e.scrollTop
			// #endif
		},
		
		components:{
			freeMomentList,
			Number,
			navBar,
			freePopup,
			freeIconButton
		},
		data() {
			return {
				commentName:'',
				reply_id:0,
				inRefresh:false,
				momentList:[],
				page:1,
				loadMore:'上拉加载更多',
				mode:'',
				text:'',
				commentVis:false,
				obj:{},
				scrollTop:0,
				faceModal:false,
				current_index:0,
				faceList:["😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","😗","😙","😚","😇","😐","😑","😶","😏","😣","😥","😮","😯","😪","😫","😴","😌","😛","😜","😝","😒","😓","😔","😕","😲","😷","😖","😞","😟","😤","😢","😭","😦","😧","😨","😬","😰","😱","😳","😵","😡","😠"],
				params:{}
			}
		},
		computed:{
			...mapState({
				user:state=>state.user.user
			}),
			toBottom() {
				if(this.mode === 'emoticon') {
					return 'bottom:300rpx;'
				}
				return 'bottom:0;'
			},
			name() {
				if(this.params && this.params.name) return this.params.name
				else return this.user.nickname || this.user.username
			},
			avatar() {
				if(this.params && this.params.avatar) return this.params.avatar
				return this.user.avatar || '../../static/default.jpg'
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.loadMore = '上拉加载更多'
			this.inRefresh = true
			this.getMomentList()
			
		},
		onReachBottom() {
			console.log('到达')
			console.log(this.page)
			this.getMomentList()
		},
		onLoad(e){
			if(e && e.params)
			 {
				 
				 // let params = decodeURIComponent(e.params)
				 // this.params = JSON.parse(params)
				this.params = JSON.parse(decodeURIComponent(e.params)) 
			 }
		},
		onShow() {
			this.page = 1
			this.loadMore = '上拉加载更多'
			this.inRefresh = true
			this.getMomentList()
		}
	}
</script>

<style>

</style>
