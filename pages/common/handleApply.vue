<template>
	<view class="page">
		<view class="" v-if="!isRefresh">
			<nav-bar showBack bgWhite :subTitle="'用户信息'" :showRight="false">
				
			</nav-bar>
			<view class="border-bottom" style="height: 1rpx;">
				
			</view>
			<view class="">
				<list-item :title="item.user.username" :src = "item.user.avatar" v-for="(item,index) in applyList"  :key = "index" type="user"  >
					<free-button @click="navTo(item.id)" :text="'接受'" slot="rightImg"></free-button>
				</list-item>
			</view>
			<view class="flex align-center justify-center" style="background-color: #EDEDED;height: 100rpx;">
				<text class="text-muted" style="font-size: 32rpx;" v-if="applyList.length >= 10">{{page_text}}</text>
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
		
			navTo(id) {
				uni.navigateTo({
					url:'addfriends?id=' + id +'&type=agree'
				})
			}
			
		},
		onReachBottom() {
			if(this.page_text != '上拉加载更多' || this.applyList.length) return 
			let len = this.applyList.length
			this.current_page++
			this.page_text = '加载中...'
				
			this.$store.dispatch('getApply',this.current_page)
			.then(()=>{
				if(this.currentNum === -1)
				this.page_text = '没有更多了'
				else
				this.page_text = '上拉加载更多'
				
			})
		},
		onLoad(e) {
			this.id = e.id
		},  
		onShow(){
			this.$store.dispatch('getApply')
		},
		beforeDestroy() {
		},
		data() {
			return {
				id:0,
				lookme:1,
				lookhim:1,
				nickname:'',
				list:[],
				isRefresh:false,
				current_page:1,
				page_text:'上拉加载更多'
			}
		},
		onPullDownRefresh() {
			this.isRefresh = true
			this.$store.dispatch('getApply')
			.then(()=>{
				this.isRefresh = false
				uni.stopPullDownRefresh()
			})
		},
		computed:{
			...mapState({
				applyList:state=>state.user.applyList,
				currentNum:state=>state.user.currentNum
			})
		}
	}
</script>

<style>

</style>



