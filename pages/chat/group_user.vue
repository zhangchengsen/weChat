<template>
	<view class="">
		<nav-bar showBack  :bgWhite='true' :subTitle="'选择'" :showRight="false" >
		</nav-bar>
		<view class="" style="background-color: #EDEDED;">
			<input class="m-2 bg-white px-2 rounded" style="width: 710rpx;height: 80rpx;font-size: 32rpx;" placeholder="搜索" v-model="inputVal" placeholder-class="text-center"   />
		</view>
		<scroll-view scroll-y="true" class="position-fixed left-0 right-0 bottom-0" :style=" 'top:'+ sHeight +'px;'">
			
			<view class="" style="background-color: #EDEDED;">
				<text style="font-size: 28rpx;" class="text-muted px-2 py-1">群成员</text>
			</view>
			<free-list-item  @click="deleteUser(item,index)" v-for="(item,index) in searchList" :key='index' :title="item.nickname ? item.userInfo.nickname : (item.userInfo.nickname ? item.userInfo.nickname : item.userInfo.username)" :src = "item.userInfo.avatar ? item.userInfo.avatar : '../../static/default.jpg'">
				
			</free-list-item>
			
			<view class="flex align-center justify-center" v-if="inputVal&&!searchList.length">
				<text class="font-weight-bold mt-2" style="font-size: 36rpx;">暂时没有搜索结果</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import freeConfirm from '@/components/free-ui/free-confirm.vue'
	import freeAvatar from '@/components/free-ui/free-avatar.vue'
	import freeListItem from '@/components/free-ui/free-list-item.vue'
	import navBar from '@/components/free-ui/free-nav.vue'
	import {mapState} from 'vuex'
	export default {
		components:{
			freeAvatar,
			navBar,
			freeListItem,
			freeConfirm
		},
		methods:{
			
			deleteUser(item,index) {
				uni.showModal({
					title:'确定要踢出该成员吗',
					confirmColor:'#007AFF',
					confirmText:'确定',
					cancelText:'取消',
					success:(res) => {
						if(res.confirm) {
							let obj = {
								group_id:this.id,
								user_id:item.user_id
							}
							this.$http.post('/group/kickoff',obj)
							.then(res=>{
								uni.showToast({
									title:'踢出成功',
									mask:true,
									icon:'none'
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:2
									})
								},400)
								
							})
						}
					}
				})
			},
			submit() {
				let obj = {
					ids:this.ids
				}
				this.$http.post('/addgroup',obj)
				.then((res)=>{
					this.toast('添加成功')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				})
				.catch(err=>{
					this.toast(err)
				})
				
			}
			
		},
		mounted() {
			let info = uni.getSystemInfoSync()
			this.sHeight = info.statusBarHeight + uni.upx2px(200)
		},
				
		onLoad(e) {
			this.id = e.id - 0
			let obj = {
				group_id:this.id
			}
			this.$http.post('/user/group',obj)
			.then(res=>{
				console.log('res',res)
				this.group_users = res.group_users
			})
			.catch(err=>{
				console.log(err)
			})
		},
		computed:{
			...mapState({
				
			}),
			
			
			
			searchList() {
				if(!this.inputVal) return this.group_users
				return this.group_users.filter(v=>{
					return v.nickname.indexOf(this.inputVal ) !== -1 ||
					v.userInfo.nickname.indexOf(this.inputVal ) !== -1 ||
					v.userInfo.username.indexOf(this.inputVal ) !== -1 
				})
			},
			
			
		},
		data() {
			return {
				inputVal:'',
				sHeight:20,
				group_users:[],
				type:'',
				id:0
			}
		}
	}
</script>

<style>
</style>
