<template>
	<view class="">
		<nav-bar showBack  :showRight="false">
			<view slot = "leftContent">
				<input type="text" value="" v-model="inputVal" :placeholder="'\ue6e3'+'搜索' + placeHolder " class="mx-3 mt-1 px-2 text-dark iconfont" style="width: 600rpx;font-size: 32rpx;" @confirm="confirm" />
			</view>
		</nav-bar>
		<view class="" v-if="!searchType && !list.length">
			<view class="mt-5">
				<view class="flex justify-center">
					<text class="text-center font text-muted">搜索指定内容</text>
				</view>
			
			</view>
			<view class="mt-3 flex align-center justify-center">
				<text class="text-hover-primary size" @click="changeType('chat')">聊天记录</text>
				<text class="text-muted mx-3 size">|</text>
				<text class="text-hover-primary size" @click="changeType('user')">用户</text>
				<text class="text-muted mx-3 size">|</text>
				<text class="text-hover-primary size" @click="changeType('group')">群聊</text>
			</view>
		</view>
		<view class="" v-if="list.length">
			<list-item :title="item.username" :src = "item.avatar" v-for="(item,index) in list"  :key = "index" type="user"  @click = "lookUser(item.id)"></list-item>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/free-ui/free-nav.vue'
	import listItem from '../../components/free-ui/free-list-item.vue'
	export default {
		components:{
			navBar,
			listItem
		},
		data() {
			return {
				searchType:'',
				inputVal:'',
				list:[]
			}
		},
		computed:{
			placeHolder() {
				switch(this.searchType) {
				     case 'chat':
				        return '聊天记录'
				     case 'user':
				        return '用户'
					case 'group':
					   return '群聊'
				     default:
				        return ''
				} 
			}
		},
		methods:{
			lookUser(id) {
				uni.navigateTo({
					url:'../chat/chat-user?id=' + id
				})
			},
			changeType(type) {
				this.searchType = type 
			},
			confirm() {
				this.list.length = 0
				let obj = {
					keyword:this.inputVal
				}
				this.$http.post('/search/user',obj)
				.then(res=>{
					this.list.push(res)
				})
			}
		}
	}
</script>

<style scoped>
	.size{
		font-size: 32rpx;
	}
</style>
