<template>
	<view class="">
		<nav-bar :title ="'标签'"></nav-bar>
		<view class="">
			<free-list-item v-for="(item,index) in list" :title="item.name"  @click="navTo(item.id)" showRight ></free-list-item>
			<view class="flex align-center justify-center" style="height: 70rpx;width: 750rpx;" v-if="loadMore">
				<text style="font-size: 36rpx;background-color: #f6f6f6;"  >{{loadMore}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '../../components/free-ui/free-nav.vue'
	import freeListItem from '../../components/free-ui/free-list-item.vue'
	export default{
		components:{
			navBar,
			freeListItem
		},
		onLoad() {
			this.getTags()
		},
		onPullDownRefresh() {
			this.page = 1
			this.loadMore = '上拉加载更多'
			this.inRefresh = true
			this.getTags()
		},
		methods:{
			
			navTo(id) {
				uni.navigateTo({
					url:'tag_user?id=' + id 
				})
			},
			getTags() {
				if(this.loadMore !== '上拉加载更多') return 
				this.loadMore = '加载中...'
				this.$http.get('/tag/list/' + this.page)
				.then(res=>{
					console.log(res)
					this.loadMore = '上拉加载更多'
					if(this.page === 1) {
						this.list = [...res]
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
						this.list = [...this.list,...res]
					}
					if(this.inRefresh) {
						this.inRefresh = false
						uni.stopPullDownRefresh()
					}
					this.page++
				})
				.catch(err=>{
					this.page--
				})
			}
		},
		data() {
			return {
				loadMore:'上拉加载更多',
				list:[],
				page:1,
				inRefresh:false
			}
		}
		
	}
</script>

<style>
</style>
