<template>
	<view class="" >
		<nav-bar showBack  :bgWhite='true' :subTitle="'选择'" :showRight="type === 'card' || type === 'add' ?  false: true" >
			<view class="" slot='rightIcon'>
				<free-button v-if="(type !== 'card' && type !== 'add') || type === 'invite'" @click="changeMode"  :text="buttonText"></free-button>
			</view>
			
		</nav-bar>
		<view class="" style="background-color: #EDEDED;">
			<input class="m-2 bg-white px-2 rounded" style="width: 710rpx;height: 80rpx;font-size: 32rpx;" placeholder="搜索" v-model="inputVal" placeholder-class="text-center"   />
		</view>
		
		
		<scroll-view scroll-y="true" class="position-fixed left-0 right-0 bottom-0" :style=" 'top:'+ top +'px;'">
			<free-list-item @click="navTo()" :title="'更多联系人'" :borderBottom="false" :bodyClass="'px-2'" ></free-list-item>
			<view class="" style="background-color: #EDEDED;">
				<text style="font-size: 28rpx;" class="text-muted px-2 py-1">最近联系人</text>
			</view>
			<free-list-item @click="chooseObj(item,index)"  v-for="(item,index) in listForChoose" :key='index' :title="item.name ? item.name : item.username" :src = "item.avatar ? item.avatar : '../../static/default.jpg'">
				<view slot="rightImg" v-if="mode" :style="item.choose ? 'background-color: #07c160;' :'background-color: #EDEDED;'" style="width: 40rpx;height: 40rpx;border-width: 2rpx;" class="rounded-circle border"></view>
			</free-list-item>
			
			<view class="flex align-center justify-center" v-if="inputVal&&!searchList.length">
				<text class="font-weight-bold mt-2" style="font-size: 36rpx;">暂时没有搜索结果</text>
			</view>
		</scroll-view>
		
		
		<!-- 弹出层 -->
		<free-confirm ref="confirm">
			<view class="m-2" v-if=" type !== 'card' ">
				<text class="font-md text-dark font-weight-bold" style="font-size: 40	rpx;">创建群聊</text>
				<scroll-view scroll-x="true" class="my-3"  style="width: 560rpx;" :show-scrollbar="false">
					<view class="flex">
						<view class="mr-1 flex" v-for="(item,index) in chooseItem" :key="index">
							<free-avatar :size="70" :src="item.avatar ? item.avatar : '../../static/default.jpg'" ></free-avatar>
						</view>
					</view>
				</scroll-view>
				<view class="">
					<view class="flex align-center mb-3">
						<free-avatar :size="70" :src="cur_person.avatar ? cur_person.avatar : '../../static/default.jpg'" ></free-avatar>
						<text class="ml-2" style="font-size: 32rpx;">{{cur_person.name || cur_person.username}}</text>
					</view>
					<text class="text-muted p-2"  style="font-size: 32rpx;background-color: #EDEDED;">{{type === 'add' ? '将他/她加入群聊' : '是否要创建群聊' }}</text>
				</view>
				<!-- <input placeholder="给朋友留言" v-model="leaveMes" class="text-muted border-bottom m-2 px-2" style="font-size: 32rpx;width: 520rpx;" /> -->
				
			</view>
			<view class="m-2" v-else>
				<text class="font-md text-dark font-weight-bold" style="font-size: 40	rpx;">发送名片</text>
				<scroll-view scroll-x="true" class="my-3"  style="width: 560rpx;" :show-scrollbar="false">
					<view class="flex align-center">
							<free-avatar :size="70" :src="cur_person.avatar ? cur_person.avatar : '../../static/default.jpg' " ></free-avatar>
							<text class="ml-2 text-ellipsis" style="max-width: 400rpx;">{{cur_person.username}}</text>
					</view>
				</scroll-view>
				<view class="">
					<text class="text-muted p-2"  style="font-size: 32rpx;background-color: #EDEDED;">【名片】</text>
				</view>
				<!-- <input placeholder="给朋友留言" v-model="leaveMes" class="text-muted border-bottom m-2 px-2" style="font-size: 32rpx;width: 520rpx;" /> -->
				
			</view>
		</free-confirm>
		<!-- 弹出层 -->
		
	</view>
</template>

<script>
	import freeConfirm from '../../components/free-ui/free-confirm.vue'
	import freeAvatar from '../../components/free-ui/free-avatar.vue'
	import freeListItem from '@/components/free-ui/free-list-item.vue'
	import freeButton from '../../components/free-ui/free-button.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	import {mapState} from 'vuex'
	export default {
		components:{
			freeAvatar,
			navBar,
			freeButton,
			freeListItem,
			freeConfirm
		},
		methods:{
			navTo() {
				uni.navigateTo({
					url:"chat_mail"
				})
			},
			
			changeMode() {
				if(this.mode) 
				{
					if(this.type !== 'invite') {
						if(!this.chooseItem.length) return this.mode = false
					}
					else {
						if(!this.chooseItem.length) return this.toast('至少邀请一个人创建群聊')
					}
					this.$refs.confirm.show((f)=>{
						f()
						this.submit()
					})
					console.log(this.ids)
				}
				
				this.mode = true
				
			},
			chooseObj(item,index) {
				console.log(item)
				if(this.mode)
				{
					if(item.choose) {
						 this.listForChoose[index].choose = false
						 return this.listForChoose = [...this.listForChoose]
					}
					if(this.chooseItem.length > 8) return uni.showToast({
						title:'最多选择9个哦',
						icon:'none'
					})
					this.listForChoose[index].choose = !item.choose
					this.listForChoose = [...this.listForChoose]
				}
				else {
					this.cur_person = {...item}
					
					this.$refs.confirm.show((f)=>{
						if(this.type === 'card') {
							uni.$emit('sendCard',{id:item.user_id,username:item.username,avatar:item.avatar})
						}
						if(this.type === 'add') {
							let obj = {
								user_id:this.cur_person.user_id,
								group_id:this.id
							}
							this.$http.post('/group/invite',obj)
							.then(res=>{
								this.toast('添加成功')
							})
							
						}
						f()
					})
				}
				
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
			this.sHeight = info.statusBarHeight
			let list = []
			if(this.type === 'invite') this.mode = true
			this.list.forEach(v=>{
				v.list.forEach(item=>{
					list.push(item)
				})
			})
			for(var i = 0 ; i < list.length ; i++) {
				list[i].choose = false
			}
			this.listForChoose = [...list]
			
		},
		onLoad(e) {
			if(e && e.type )
			{
				this.type = e.type
				console.log(this.type)
			}
			if(e && e.id )
			{
				this.id = e.id - 0
			}
		},
		computed:{
			...mapState({
				list:state=>state.user.newList,
				indexList:state=>state.user.indexList
			}),
			top() {
				return this.sHeight + uni.upx2px(200)
			},
			chooseItem() {
				
				return this.listForChoose.filter(v=>v.choose)
			},
			buttonText() {
				if(this.type === 'invite') return `建群(${this.chooseItem.length})`
				if(!this.mode) return '多选'
				return `发送(${this.chooseItem.length})`
				
			},
			searchList() {
				if(!this.inputVal) return this.listForChoose
				return this.listForChoose.filter(v=>{
					return v.title.indexOf(this.inputVal) !== -1
				})
			},
			ids() {
				let ids = []
				this.chooseItem.forEach(v=>ids.push(v.user_id))
				return ids
			}
			
		},
		data() {
			return {
				leaveMes:'',
				inputVal:'',
				mode:false,
				sHeight:20,
				func:null,
				listForChoose:[],
				type:'',
				cur_person:{},
				id:0
			}
		}
	}
</script>

<style>

</style>
