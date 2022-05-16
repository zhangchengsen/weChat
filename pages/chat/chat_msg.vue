<template>
	<view>
		<nav-bar showBack title="聊天信息" :showRight="false" >
		</nav-bar>
		<!-- 成员 -->
		
		<view class="flex flex-wrap flex-row  py-3  bg-white">
			<view class="" v-if="detail.chat_type === 'user' ">
				<view class="flex align-center"   >
					
					<view class="flex flex-column align-center  px-1">
						<free-avatar  :type="'flex'" :src="detail.avatar ? detail.avatar: '../../static/default.jpg'" :size="120"></free-avatar>
						<text class="font text-muted mb-2">{{detail.name}}</text>
					</view>
				</view> 
			</view>
			<view class="flex flex-wrap flex-row  py-3  bg-white" v-else>
				<view class="flex flex-column align-center  px-1" v-for="(item,index) in groupInfo.group_users" :key = "index">
									<free-avatar :type="'flex'" :src="item.userInfo.avatar ? item.userInfo.avatar : '../../static/default.jpg'" :size="120" rounded></free-avatar>
									<text class="font text-muted mb-2">{{item.nickname ? item.nickname : (item.userInfo.nickname ? item.userInfo.nickname : item.userInfo.username ) }}</text>
				</view>
			</view>
			
			<view @click="inviteToGroup" class="flex flex-column align-center justify-center mb-2" style="width: 150rpx;">
				<text class="text-light-muted border text-center" style="font-size: 100rpx;width: 120rpx;height: 120rpx;line-height: 120rpx;">+</text>
			</view>
		</view>
		<!-- 成员 -->
		<divider :height="20"></divider>
		<view class="" v-if="detail.chat_type === 'group'">
			<list-item @click="showConfirm('group_name')" :title="'群聊名称'" :rightText="groupInfo.name" showRight>
			</list-item>
			<list-item :title="'群二维码'" @click = 'openCode'  :rightText="'\ue614'" showRight></list-item>
			<list-item :title="'群公告'" @click="showConfirm('group_remark')" :rightText="groupInfo.remark"  showRight></list-item>
			<list-item @click="navTo('group_user?id='+detail.id)" :title="'删除群成员'" v-if="isAdmin"  showRight></list-item>
			<divider :height="20"></divider>
		</view>
		
		<list-item :title="'查找聊天记录'" @click= "navTo"  showRight></list-item>
		<divider :height="20"></divider>
	    <list-item :title="'消息免打扰'" >
			<switch slot="rightImg" :checked="currentChat.nowarn"  @change="changeConfig($event,'nowarn')"></switch>
		</list-item>
		<list-item :title="'置顶聊天'"  >
			<switch slot="rightImg" :checked="currentChat.istop"  @change="changeConfig($event,'istop')" ></switch>
		</list-item>
		<list-item :title="'强提醒'"  >
			<switch @change="changeConfig($event,'strongwarn')" :checked="currentChat.strongwarn"  slot="rightImg"></switch>
		</list-item>
		<divider :height="20"></divider>
		<view class="" v-if="detail.chat_type === 'group'">
			<list-item @click="showConfirm('group_nickname')" :title="'我在本群名称'" :rightText="currentUserInGroup.nickname || user.username " showRight></list-item>
			<list-item :title="'显示群聊成员昵称'"  >
				<switch slot="rightImg" @change="changeConfig($event,'shownickname')" :checked="currentChat.shownickname" ></switch>
			</list-item>
			<divider :height="20"></divider>
		</view>
		
		<list-item :title="'设置当前聊天背景'"  showRight></list-item>
		<list-item :title="'投诉'"  showRight></list-item>
		<divider :height="20"></divider>
		<list-item :title="'清空聊天记录'" @click="clearChat"  showRight></list-item>
		<divider :height="20"></divider>
		<view @click="exit" class="bg-white flex align-center justify-center" style="height: 100rpx;">
			<text class="text-danger">{{detail.chat_type === 'group' ? (isAdmin ? '删除并解散该群': '退出该群' ) : '删除好友'}}</text>
		</view>
		<divider :height="40" ></divider>
		<free-confirm ref="confirm" :bodyHeight="300" :confirmColor="'#007AFF'" >
			<view class="pt-1">
				<text class="m-2 text-center font-weight-bold" style="font-size: 40rpx;" >{{confirmTitle}}</text>
				<input v-if="chooseType !== 'group_remark'" class="m-4 border-bottom" type="text" v-model="text" :placeholder="placeHolder"  />
				<textarea v-else class="ml-4  border-bottom" style="height: 150rpx;width: 500rpx;" v-model="remark" :placeholder="groupInfo.remark" ></textarea>
			</view>
			
		</free-confirm>
	</view>
</template>

<script>
	import freeConfirm from '../../components/free-ui/free-confirm.vue'
	import divider from '../../components/free-ui/free-divider.vue'
	import freeAvatar from '../../components/free-ui/free-avatar.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	import listItem from '../../components/free-ui/free-list-item.vue'
	import {mapState} from 'vuex'
	export default {
		components:{
			navBar,
			freeAvatar,
			listItem,
			divider,
			freeConfirm
		},
		onLoad(e) {
			if(!e.params) {
				uni.navigateBack({
					delta:1
				})
				this.toast('无效参数')
			}
			let detail = JSON.parse(decodeURIComponent(e.params))
			detail = this.chat.getChatListItem(detail.id,detail.chat_type)
			if(!detail) return 
			this.detail = detail
			if(this.detail.chat_type === 'group') this.getGroupInfo()
			console.log('detail',this.detail)
			this.$store.dispatch('getContacts')
			console.log(this.currentChat)
		},
		methods:{
			
			clearChat() {
				uni.showModal({
					confirmText:'确定',
					cancelText:'取消',
					confirmColor:'#FA5251',
					title:'是否清除聊天记录',
					success: (res) => {
						if(res.confirm){
							this.chat.clearChatItem({id:this.detail.id,chat_type:this.detail.chat_type})
							uni.$emit('clearChatList')
						}
					}
				})
				
			},
			openCode() {
				let obj = {
					id:this.detail.id,
					avatar: this.detail.avatar ? this.detail.avatar  :'../../static/groupdefault.jpg'  ,
					nickname:this.detail.name,
					type:'group'
				}
				uni.navigateTo({
					url:'../my/card?params='+encodeURIComponent(JSON.stringify(obj))
				})
			},
			changeConfig(e,key) {
				this.detail[key] = e.target.value
				console.log(key,e.target.value)
				this.chat.updateChatItem({
					id:this.detail.id,
					chat_type:this.detail.chat_type
				},this.detail)
			},
			// 拉群
			inviteToGroup() {
				if(this.detail.chat_type === 'group')
				{
					return uni.navigateTo({
						url:'chat_share?type=add&id='+this.detail.id
					})
				}
				uni.navigateTo({
					url:'chat_share?type=invite'
				})
			},
			changeGroupRemark(close) {
				let obj = {
					group_id:this.detail.id,
					remark:this.remark
				}
				this.$http.post('/remark',obj)
				.then(res=>{
					this.toast('修改成功')
					this.groupInfo.remark = this.remark
					this.remark = ''
					this.$refs.confirm.cancel()
				})
			},
			// 修改群名称
			changeGroupName(close) {
				let obj = {
					group_id:this.detail.id,
					group_name:this.text
				}
				this.$http.post('/name/group',obj)
				.then(res=>{
					this.toast('修改成功')
					this.groupInfo.name = this.text
					uni.$emit('changeGroupName',this.text)
					this.text = ''
					if(close) close()
				})
			},
			// 修改我在群中的名称
			changeGroupNickname(close) {
				let obj = {
					group_id:this.detail.id,
					group_nickname:this.text
				}
				this.$http.post('/nickname/group',obj)
				.then(res=>{
					
					this.toast('修改成功')
					this.currentUserInGroup.nickname = this.text
					let index = this.groupInfo.group_users.findIndex(v=>v.user_id === this.user.id)
					this.groupInfo.group_users[index].nickname = this.text
					this.text = ''
					this.$refs.confirm.cancel()
				})
			},
			showConfirm(type) {
				// 不是管理员不让修改
				if(!this.isAdmin && type != 'group_nickname') return this.toast('只有管理员才可以修改哦')
				this.chooseType = type
				this.$refs.confirm.show((close)=>{
					if(!this.text.trim() && !this.remark.trim()) return this.toast('请输入要填写的内容')
					if(type === 'group_name')
					this.changeGroupName(close)
					else if(type === 'group_remark')
					this.changeGroupRemark()
					else this.changeGroupNickname()
					
					
				})
			},
			// 获取群信息
			getGroupInfo() {
				let obj = {
					group_id:this.detail.id
				}
				this.$http.post('/user/group',obj)
				.then(res=>{
					this.groupInfo = {...res}
					let id =  this.user.id
					let index = this.groupInfo.group_users.findIndex(v=>v.user_id === id)
					this.currentUserInGroup = {...this.groupInfo.group_users[index]}
					console.log('我在群中的信息',this.currentUserInGroup)
				})
				
				
			},
			navTo(url = '') {
				if(url)
				return uni.navigateTo({
					url
				})
				
				uni.navigateTo({
					url:`chat_history?chat_type=${this.detail.chat_type}&id=${this.detail.id}&name=${this.detail.name}`
				})
			},
			exit() {
				if(this.detail.chat_type === 'user') {
					//删除好友
					uni.showModal({
						cancelText:'取消',
						confirmColor:'#FA5251',
						confirmText:'确定',
						title:'是否删除该好友',
						success: (res) => {
							if(res.confirm) {
								let obj = {
									friend_id:this.detail.id
								}
								this.$http.post('/breakup',obj)
								.then(res=>{
									uni.showToast({
										title:'删除成功',
										icon:'none',
										mask:true
									})
									setTimeout(()=>{
										uni.reLaunch({
											url:'../index/index'
										})
									},600)
									
								})
							}
						}
					})
					
				}
				else {
					uni.showModal({
						cancelText:'取消',
						confirmColor:'#FA5251',
						confirmText:'确定',
						title:'解散/退出该群',
						success: (res) => {
							if(res.confirm) {
								let obj = {
									group_id:this.detail.id
								}
								this.$http.post('/exit/group',obj)
								.then(res=>{
									this.toast('操作成功')
									setTimeout(()=>{
										uni.switchTab({
											url:'../index/index'
										})
									},500)
									
								})
							}
						}
					})
					
					
				}
			}
		},
		data(){
			return {
				remark:'',
				detail:{
					id:0,
					chat_type:'user',
					avatar:'',
					name:'',
					istop:false,	//是否置顶
					shownickname:0,  //是否显示昵称
					nowarn:0,	//消息免打扰,
					strongwarn:0,	//是否开启强提醒
					user_id:0,	//群管理员id
					remark:'',
					invite_confirm:0	//邀约确认
				},
				groupInfo:{},
				currentUserInGroup:{},
				chooseType:'',
				text:''
			}
		},
		computed:{
			...mapState({
				chatList:state=>state.user.chatList,
				chat:state=>state.user.chat,
				user:state=>state.user.user
			}),
			currentChat() {
				let index = this.chatList.findIndex(v=>{
					return v.id == this.detail.id && v.chat_type === this.detail.chat_type
				})
				
				if(index === -1 ) return {}
				return this.chatList[index]
			},
			confirmTitle() {
				if(this.chooseType === 'group_name') return '修改群名称'
				else if(this.chooseType === 'group_remark') return '修改群公告'
				else return '修改我在群聊中的名称'
			},
			placeHolder() {
				if(this.chooseType === 'group_remark') return '填写群公告'
				return '填写名称'
			},
			isAdmin() {
				if(this.detail.chat_type === 'user') return false
				return this.user.id === this.groupInfo.user_id
			}
		}
		
	}
</script>

<style>

</style>
