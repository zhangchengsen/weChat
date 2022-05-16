<template>
	<view class="page">
		<view class="" v-if="show">
			<nav-bar showBack :subTitle="'用户信息'" showRight>
				<view slot = "rightIcon" :icon="'\ue6fd'" @click="showPop()" >
					<text class="iconfont mr-1" style="">&#xe6fd;</text>
				</view>
			</nav-bar>
			<view style="height: 30rpx;" class="bg-white"></view>
			<free-msg :src="userInfo.avatar ? userInfo.avatar: '../../static/default.jpg' " :title="userInfo.nickname ? userInfo.nickname : userInfo.username" :showStar ="!!userInfo.star && !userInfo.isblack">
				<view slot="inner">
					
					<text class="text-muted" style="font-size: 30rpx;">地区:	浙江 杭州</text>
				</view>
			</free-msg>
			<view style="height: 30rpx;"  class="bg-white border-bottom"></view>
			<view class="" v-if ="!userInfo.friend || !userInfo.isblack ">
				<list-item @click="navTo('chat_remark')" :title="'签名'" :subTitle="tagText" showRight v-if="userInfo.friend"></list-item>
				<divider :height="20"></divider>
				<list-item :title="'朋友圈'" @click="navToGroup" showRight>
					<view class="flex align-center" slot="subImage" v-if="userInfo && this.userInfo.moments &&userInfo.moments.length">
						<template  v-if="userInfo.moments[0].image.length">
							<view class="flex align-center  ml-2" v-for="(item,index) in userInfo.moments[0].image">
								<image :src="item" style="width: 65rpx;height: 65rpx;" class=""></image>
							</view>
						</template>
						<template  v-else-if="userInfo.moments[0].video">
							<view class="flex align-center  ml-2" >
								<image :src="userInfo.moments[0].video+'?x-oss-process=video/snapshot,t_10,m_fast,w_300,f_png'" style="width: 65rpx;height: 65rpx;" class=""></image>
							</view>
						</template>
						<template v-else>
							<view class="flex align-center  ml-2" >
								<text class="text-muted text-ellipsis" style="font-size: 30rpx;max-width:400rpx">{{userInfo.moments[0].content}}</text>
							</view>
						</template>
						
						
						
					</view>
				</list-item>
				<list-item :title="'更多信息'"  showRight></list-item>
				<divider :height="20"></divider>
				<view class="bg-white flex align-center justify-center" v-if="userInfo.friend" @click="navTo('chat')" style="height: 100rpx;" hover-class="bg-light">
					<text class="text-primary iconfont" >&#xe64e;发信息</text>
				</view>
				<view class="bg-white flex align-center justify-center" v-else @click="navTo('../common/addfriends?id='+id)" style="height: 100rpx;" hover-class="bg-light">
					<text class="text-primary iconfont" >添加好友</text>
				</view>
			</view>
			
			<view class="" v-if="userInfo.friend && userInfo.isblack">
				<divider :height="20"></divider>
				<view class="bg-white flex align-center justify-center" style="height: 100rpx;" hover-class="bg-light" >
					<text class="text-primary iconfont" @click="changeBlackList(list[3])" >取消拉黑</text>
					
				</view>
			</view>
			
			
		</view>
		
		<!-- 弹出层 -->
		<popup ref = "pop" bottom isBlack>
			<scroll-view style="height: 520rpx" scroll-y :show-scrollbar="false" >
				<list-item @click="popEvent(item)" :title="item.title" v-for="(item,index) in list" :key = "index" :leftIcon="item.icon"  >
					<text class="iconfont" slot="leftIcon">{{item.icon}}</text>
				</list-item>
				
			</scroll-view>
		</popup>
		<!-- 弹出层 -->
		
	</view>
</template>

<script>
	import divider from '../../components/free-ui/free-divider.vue'
	import freeMsg from '../../components/free-ui/free-msg.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	import freeNavIcon from '../../components/free-ui/free-nav.vue'
	import listItem from '../../components/free-ui/free-list-item.vue'
	import popup from '../../components/free-ui/free-popup.vue'
	import auth from '../../common/mixin/auth.js'
	export default {
		components:{
			freeMsg,
			navBar,
			freeNavIcon, 
			divider,
			listItem,
			popup
		},
		mixins:[auth],
		methods:{
			showPop() {
				this.$refs.pop.show()
				
			},
			
			navTo(url) {
				
				if(url ===`chat_remark`)
				{
					url = `chat_remark?id=${this.id}&tag=${JSON.stringify(this.tagList)}&remark=${this.userInfo.nickname}`
				}
				if(url === `chat`) {
					let obj = {
						name:this.userInfo.nickname ? this.userInfo.nickname : this.userInfo.username,
						avatar:this.userInfo.avatar ? this.userInfo.avatar : '../../static/default.jpg',
						chat_type:'user',
						id:this.id
					}
					return uni.navigateTo({
						url:'chat?params='+encodeURIComponent(JSON.stringify(obj))
					})
				}
				uni.navigateTo({
					url
				})
			},
			
			popEvent(item) {
				if(item.navigation) {
					if(item.type === 'chat_complaint') {
						item.type = `chat_complaint?id=${this.id}`
					}
					return uni.navigateTo({
						url:item.type === 'chat_setting_friends' ? `chat_setting_friends?id=${this.id}&lookme=${this.userInfo.lookme ? 1 : 0}&lookhim=${this.userInfo.lookhim? 1 :0}`: item.type
					})
				}
				else {
					this[item.type](item)
					
				}
				
			},
			
			setStarFriends(e) {
				
				this.$http.post('/isstar/'+this.id,{isstar:this.userInfo.star})
				.then(res=>{
					e.title = this.userInfo.star ?'取消新标好友':"设置星标好友"
					uni.showToast({
						icon:'none',
						title:'设置成功'
					})
					
				})
				.catch(err=>{
					this.userInfo.star = this.userInfo.star ? 0 : 1
				})
				this.$refs.pop.hide()
				
				
			},
			navToGroup() {
				let params = encodeURIComponent(JSON.stringify(
				{
					name:this.userInfo.nickname ? this.userInfo.nickname : this.userInfo.username,
					avatar:this.userInfo.avatar ? this.userInfo.avatar : '../../static/default.jpg',
					id:this.id
				}
				)) 
				uni.navigateTo({
					url:"../find/circle_of_friends?params=" + params
				})
			},
			changeBlackList(item) {
				this.$refs.pop.hide()
				if(!this.userInfo.isblack)
				{
					uni.showModal({
						cancelText:'取消',
						confirmColor:'#FA5251',
						confirmText:'确定',
						title:'确定拉黑该用户吗',
						success: (res) => {
							if(res.confirm) {
								this.userInfo.isblack = !this.userInfo.isblack
								this.$http.post('/isblack/'+this.id,{isblack:1})
								.then(res=>{
									console.log(res) 
									uni.showToast({
										icon:'none',
										title:'设置成功'
									})
									item.title = '取消拉黑'
								})
								.catch(err=>{
									
								})
								
							}
						}
					})
				}
				
				else {
					this.$http.post('/isblack/'+this.id,{isblack:0})
					.then(res=>{
						console.log(res)
						this.userInfo.isblack = !this.userInfo.isblack
						item.title = '加入黑名单'
						uni.showToast({
							icon:'none',
							title:'设置成功'
						})
					})
					
					
				}
			}
			
		},
		onLoad(e) {
			this.id = e.id
			if(!this.id) {
				uni.navigateBack({
					delta:1
				})
				return this.toast('非法参数')
			}
			uni.showLoading()
			
			
		},  
		onShow() {
			this.$http.get('/view/user/' + this.id)
			.then(res => {
				
				this.userInfo = {...res}
				
				this.tagList = this.userInfo.tags && this.userInfo.tags.length ? this.userInfo.tags : []
				console.log(res,this.tagList)
				this.list = [
					{
						title:'把他推荐给朋友',
						icon:'\ue86d',
						type:'chat_share?type=card',
						navigation:true
						
					},
					{
						title: this.userInfo.star ? '取消星标好友' : '设为星标朋友',
						icon:'\ue613',
						type:'setStarFriends'
					},
					{
						title:'设置朋友圈和动态权限',
						icon:'\ue6b0',
						type:'chat_setting_friends',
						navigation:true
					},
					{
						title:this.userInfo.isblack ? '取消拉黑' : '加入黑名单',
						icon:'\ue667',
						type:'changeBlackList'
					},
					{
						title:'投诉',
						icon:'\ue61c',
						type:'chat_complaint',
						navigation:true
					}
					
				]
				uni.hideLoading()
				this.show = true
				
			})
			.catch(err=>{
				console.log(JSON.stringify(err))
				console.log(err)
				uni.hideLoading()
				this.toast(err)
			})
		},
		mounted(){
			// uni.$on('updateMes',(e) => {
			// 	this.tagList = e.tagList
			// 	// this.remarkName = e.remarkName
			// })
		},
		beforeDestroy() {
			// uni.$off('updateMes')
		},
		data() {
			return {
				id:0,
				list:[],
				tagList:[],
				// remarkName:'',
				popVis:false,
				// isBlack:false,
				// star:false,
				userInfo:{},
				show:false
			}
		},
		computed:{
			tagText() {
				if(!this.tagList.length) return '未设置'
				let tagList = []
				this.tagList.forEach((item)=>{
					tagList.push(item)
				})
				return tagList.reduce((pre,cur)=>{return pre+ ' ' + cur },'')
			}
		}
	}
</script>

<style>

</style>
