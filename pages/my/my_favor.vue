<template>
	<view class="" style="background-color: #EDEDED;flex:1;">
		<nav-bar showBack bgWhite :showRight="false"  :subTitle="'收藏'"></nav-bar>
		<view class="m-3  rounded">
			<text class="p-2 py-3 font-weight-bold">聊天记录</text>
			<text v-if=" type === 'send' " class="text-muted" style="font-size: 30rpx;">(轻点即可发送)</text>
		</view>
		<view :class="list.length ?  'pb-2' : '' ">
			<view class="rounded m-4"  v-for="(item,index) in list" :key = "index" >
				<view class="" @click="send(item)" @longpress="long(item,index)" hover-class="bgc">
					<text v-if="item.type === 'text'" class="text-muted p-2 bg-white " style="font-size: 32rpx;">{{item.data}}</text>
					<view class="p-2 bg-white " v-else-if=" item.type === 'image' || item.type === 'video'">
						<free-image :open="false"  :item = "item" :maxX="300"></free-image>
					</view>
					<view class=" " v-else-if="item.type === 'emoticon'">
						<image :src="item.data"  mode="widthFix" class="bg-white p-2" style="width: 250rpx;height: 250rpx;"></image>
					</view>
				</view>
				
				
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import navBar from '@/components/free-ui/free-nav.vue'
	import freeImage from '../../components/free-ui/free-image.vue'
	export default {
		components:{
			navBar,
			freeImage
		},
		onLoad(e) {
			if(e) {
				this.type = e.type
			}
			this.getFavaorList()
		},
		methods:{
			getFavaorList() {
				this.$http.get('/fava/list/' + this.current_page)
				.then(res=>{
					console.log(res)
					this.list = res
					this.current_page++
				})
			},
			send(item) {
				uni.$emit('sendItem',{type:item.type,data:item.data})
			},
			long(item,index){
				uni.showActionSheet({
					itemList:['删除'],
					success: (res) => {
						if(res.tapIndex !== 0) return
						uni.showModal({
							confirmColor:'#FA5251',
							cancelText:'取消',
							confirmText:'确定',
							title:'是否要删除该收藏',
							success: (res) => {
								if(res.confirm) {
									let obj = {
										id:item.id
									}
									this.$http.post('/fava/remove',obj)
									.then(res=>{
										this.list.splice(index,1)
										this.toast('删除成功')
									})
								}
							}
						})
					}
				})
			}
		},
		onPullDownRefresh(){
			
		},
		data (){
			return {
				list:[],
				current_page:1,
				type:''
			}
		}
	}
</script>

<style scoped>
	.light{
		background-color: #EDEDED;
	}
</style>
