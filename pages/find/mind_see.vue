<template>
	<view class="" style="">
		<nav-bar showBack :title ="type === 'see' ? '好友是否可见' : '提醒'">
			<free-button  @click="edit" slot= 'rightIcon' :text="'确定'"></free-button>
		</nav-bar>
		
		<template v-if="type === 'see'">
			<view class="" style="background-color: #EDEDED;">
				<!-- 选择可见类型 -->
				<free-list-item @click="chooseSee(index)" v-for="(item,index) in seeList" :key = "index" :title="item.key">
					<view slot="rightImg"  :style="index === current_index ? 'background-color: #07c160;' :'background-color: #EDEDED;'" style="width: 40rpx;height: 40rpx;border-width: 2rpx;" class="rounded-circle border"></view>
				</free-list-item>
				<!-- 选择可见类型 -->
			</view>
		</template>
		<template v-else>
			<view class="" style="background-color: #EDEDED;">
				<input class="m-2 bg-white px-2 rounded" style="width: 710rpx;height: 80rpx;font-size: 32rpx;" placeholder="搜索" v-model="inputVal" placeholder-class="text-center"   />
			</view>
		</template>
		<scroll-view scroll-y="true" v-if="(current_index === 1 || current_index === 2) ||type !== 'see'" class="position-fixed left-0 right-0 bottom-0" :style=" 'top:'+ sHeight +'px;'">
			
			<view class="" style="background-color: #EDEDED;height: 30rpx;">
				
			</view>
			<view class="" v-if="!inputVal">
				<free-list-item @click="chooseObj(item,index)"  v-for="(item,index) in listForChoose" :key='index' :title="item.name ? item.name : item.username" :src = "item.avatar ? item.avatar : '../../static/default.jpg'">
					<view slot="rightImg"  :style="item.choose ? 'background-color: #07c160;' :'background-color: #EDEDED;'" style="width: 40rpx;height: 40rpx;border-width: 2rpx;" class="rounded-circle border"></view>
				</free-list-item>
			</view>
			<view class="" v-else>
				<free-list-item @click="searchObj(item)"  v-for="(item,index) in searchList" :key='index' :title="item.name ? item.name : item.username" :src = "item.avatar ? item.avatar : '../../static/default.jpg'">
					<view slot="rightImg"  :style="item.choose ? 'background-color: #07c160;' :'background-color: #EDEDED;'" style="width: 40rpx;height: 40rpx;border-width: 2rpx;" class="rounded-circle border"></view>
				</free-list-item>
			</view>
			
			<view class="flex align-center justify-center" v-if="inputVal&&!searchList.length">
				<text class="font-weight-bold mt-2" style="font-size: 36rpx;">暂时没有搜索结果</text>
			</view>
		</scroll-view>
		
		
	</view>
	
</template>

<script>
	
	import freeListItem from '@/components/free-ui/free-list-item.vue'
	import navBar from '@/components/free-ui/free-nav.vue'
	import freeBadge from '../../components/free-ui/free-badge.vue'
	import {mapState} from 'vuex'
	import freeButton from '../../components/free-ui/free-button.vue'
	export default{
		data() {
			return {
				sHeight:0,
				
				
				screenHeight:568,
				scrollInto:'',
				timer:null,
				screenWidth:375,
				letterVis:false,
				letter:'',
				statusHeight:0,
				type:'',
				seeList:[
					{
						key:'公开',
						value:'all'
					},
					{
						key:'指定好友可见',
						value:'only'
					},
					{
						key:'除指定好友外可见',
						value:'except'
					},
					{
						key:'仅个人',
						value:'none'
					}
				],
				current_index:0,
				listForChoose:[],
				inputVal:''
			}
		},
		onLoad(e) {
			this.type = e.type
		},
		methods:{
			searchObj(item) {
				let index = this.listForChoose.findIndex(v=>v.user_id === item.user_id)
				if(index !== -1) {
					this.listForChoose[index].choose = !item.choose
					this.listForChoose = [...this.listForChoose]
				}
			},
			edit() {
				if(this.type === 'see')
				{
					let ids = this.chooseItem.map(v=>v.user_id)
					let see = this.seeList[this.current_index].value
					uni.$emit('see',{ids,see})
				}
				else {
					
					uni.$emit('remind',this.chooseItem)
				}
				uni.navigateBack({
					delta:1
				})
				
			},
			chooseObj(item,index) {
				
				if(item.choose) {
					 this.listForChoose[index].choose = false
					 return this.listForChoose = [...this.listForChoose]
				}
				
				this.listForChoose[index].choose = !item.choose
				this.listForChoose = [...this.listForChoose]
				
			},
			chooseSee(index) {
				this.current_index = index
			},
			c() {
			},
			
			navTo(url) {
				uni.navigateTo({
					url,
					fail: (err) => {
						console.log(err)
					}
				})
			}
			
		},
		onShow() {
			this.$store.dispatch('getContacts')			
		},
		mounted() {
			let info = uni.getSystemInfoSync()
			if(this.type === 'see')
			this.sHeight = info.statusBarHeight + uni.upx2px(500)
			else this.sHeight = info.statusBarHeight + uni.upx2px(210)
			let list = []
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
		components:{
			navBar,
			freeListItem,
			freeBadge,
			freeButton
		},
		computed:{
			...mapState({
				list:state=>state.user.newList,
			}),
			chooseItem() {
				return this.listForChoose.filter(v=>v.choose)
			},
			searchList() {
				if(!this.inputVal) return this.listForChoose
				return this.listForChoose.filter(v=>{
					return v.username.indexOf(this.inputVal) !== -1
				})
			}
			
			
			
		}
	}
</script>

<style>
</style>
