
<template>
	<view class="page">
		<view class="" v-if="!isRefresh">
			<nav-bar showBack bgWhite :subTitle="'用户信息'" :showRight="false">
				
			</nav-bar>
			<view class="border-bottom" style="height: 1rpx;">
				
			</view>
			<view class="">
				<list-item :title="item.name" :src = "item.avatar" v-for="(item,index) in list"  :key = "index" type="group"  @click="navTo(item)" >
				</list-item>
			</view>
			<view class="flex align-center justify-center" style="background-color: #EDEDED;height: 100rpx;">
				<text class="text-muted" style="font-size: 32rpx;" v-if="page_text">{{page_text}}</text>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import divider from '../../components/free-ui/free-divider.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	import listItem from '../../components/free-ui/free-list-item.vue'
	import auth from '../../common/mixin/auth.js'
	import freeButton from '../../components/free-ui/free-button.vue'
	import {mapState} from 'vuex'
	export default {
		components:{
			navBar,
			divider,
			listItem,
			freeButton
		},
		mixins:[auth],
		methods:{
		
			navTo(item) {
				let obj = {
					name:item.name,
					avatar:item.avatar,
					chat_type:'group',
					id:item.id
				}
				uni.navigateTo({
					url:"../chat/chat?params="+encodeURIComponent(JSON.stringify(obj))
				})
			},
			getGroupList() {
				if(!this.isRefresh && (!this.page_text||this.page_text === '没有更多了')) return 
				this.page_text = '加载中'
				this.$http.get('/user/group/'+ this.current_page)
				.then(res=>{
					if(this.isRefresh) {
						this.isRefresh = false
						uni.stopPullDownRefresh()
					}
					if(this.current_page === 1) {
						this.list = res
						if(res.length <= 10) {
							this.page_text = ''
							
						}
					}
					else {
						this.list = [...this.list,...res]
						this.current_page++
						this.page_text = '上拉加载更多'
						if(res.length < 10) this.page_text = '没有更多了'
					}
					console.log(this.list)
					
				})
				.catch(err=>{
					if(this.isRefresh) {
						this.isRefresh = false
						uni.stopPullDownRefresh()
					}
					this.toast(err,'发生错误')
				})
			}
			
		},
		onReachBottom() {
			this.getGroupList()
		},
		onLoad() {
			this.getGroupList()
		},  
		onShow(){
		},
		beforeDestroy() {
		},
		data() {
			return {
				
				list:[],
				isRefresh:false,
				current_page:1,
				page_text:'上拉加载更多'
			}
		},
		onPullDownRefresh() {
			this.isRefresh = true
			this.current_page = 1
			this.getGroupList()
			
		},
		computed:{
			...mapState({
			})
		}
	}
</script>

<style>

</style>
