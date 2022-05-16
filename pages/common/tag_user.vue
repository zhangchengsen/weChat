<template>
	<view class="">
		<nav-bar :title ="'标签用户'" :showRight="false"></nav-bar>
		<view class="">
			
			<free-list-item v-for="(item,index) in list" :title="item.friendInfo.nickname ? item.friendInfo.nickname : item.friendInfo.username"  @click="navTo(item.friendInfo.id)" :src="item.friendInfo.avatar ?item.friendInfo.avatar : '../../static/default.jpg' " showRight ></free-list-item>
			
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/free-ui/free-nav.vue'
	import freeListItem from '@/components/free-ui/free-list-item.vue'
	export default{
		components:{
			navBar,
			freeListItem
		},
		onLoad(e) {
			this.id = e.id
			this.getUsers()
		},
		
		methods:{
			navTo(id) {
				uni.navigateTo({
					url:'../chat/chat-user?id='+id
				})
			},
			
			getUsers() {
				this.$http.get('/tag/read/' + this.id)
				.then(res => {
					console.log(res)
					this.list = res.friends
				})
				.catch(err=>{
					console.log(err)
				})
				
			}
		},
		data() {
			return {
				list:[],
				id:0,
				
			}
		}
		
	}
</script>

<style>
</style>
