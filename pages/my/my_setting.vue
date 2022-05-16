<template>
	<view class="" style="">
		<nav-bar showBack title="个人资料" :showRight="false">
			
		</nav-bar>
		<free-list-item @click="changeAvatar" :title="'头像'" showRight>
			<free-avatar :size="76" :src="user.avatar ? user.avatar : '../../static/default.jpg'" slot="rightImg"></free-avatar>
			
		</free-list-item>
		<free-list-item @click="show('nickname')" :title="'昵称'" showRight>
			<text class="text-muted" slot="rightImg">{{user.nickname ? user.nickname :'未设置'}}</text>
		</free-list-item>
		<free-list-item  :title="'账号'" >
			<text class="text-muted" slot="rightImg">{{user.username}}</text>
		</free-list-item>
		<free-list-item @click="navTo" :title="'二维码名片'" showRight>
			<text slot="rightImg" class="iconfont">&#xe614;</text>
		</free-list-item>
		<free-confirm ref="confirm" :bodyHeight="300" :confirmColor="'#007AFF'" >
			<view class="pt-1">
				<text class="m-2 text-center font-weight-bold" style="font-size: 40rpx;" >{{confirmTitle}}</text>
				<input class="m-4 border-bottom" type="text" v-model="text" :placeholder="placeHolder"  />
			</view>
			
			
		</free-confirm>
	</view>
</template>

<script>
	import freeListItem from '../../components/free-ui/free-list-item.vue'
	import navBar from '@/components/free-ui/free-nav.vue'
	import freeAvatar from '../../components/free-ui/free-avatar.vue'
	import freeConfirm from '../../components/free-ui/free-confirm.vue'
	import {mapState} from 'vuex'
	export default{
		components:{
			navBar,
			freeAvatar,
			freeListItem,
			freeConfirm
		},
		data() {
			return {
				userInfo:{
					avatar:'../../static/ymtx.jpg',
					nickname:'IT黑马',
					username:'zhangchengsen003'
				},
				changeType:'',
				text:'',
			}
		},
		methods:{
			navTo(){
				let obj = {
					id:this.user.id,
					avatar: this.user.avatar ? this.user.avatar  : '../../static/default.jpg',
					nickname:this.user.nickname ? this.user.nickname : this.user.username ,
					type:'friend'
				}
				uni.navigateTo({
					url:'card?params=' + encodeURIComponent(JSON.stringify(obj))
				})
			},
			toast(title = '',icon = 'none'){
				uni.showToast({
					title,
					icon
				})
			},
 			changeAvatar() {
				uni.chooseImage({
					count:1,
					success: (e) => {
						console.log(e)
						let onProgress = (progress) => {
							console.log('上传进度 ',progress)
						}
						this.avatar = e.tempFilePaths[0],
						this.$http.upload('/upload',{filePath:this.avatar},onProgress)
						.then(url=>{
							let obj = {
								avatar:url
							}
							uni.showLoading({
								title:'上传中...'
							})
							this.$http.post('/update',obj)
							.then(res=>{
								this.$store.commit('changeUserInfo',{key:'avatar',value:url})
								uni.hideLoading()
								this.toast('修改成功','success')
							}).catch(err=>{
								uni.hideLoading()
								console.log(err)
							})
						})
						.catch(err=>{
							console.log(err)
							this.toast('上传失败'+JSON.stringify(err))
						})
					}
				})
			},
			show(title) {
				this.changeType = title
				try{
					console.log(this.userInfo[title])
					this.$refs.confirm.show((close)=>{
						if(!this.text.trim()) return this.toast('请输入要填写的内容')
						let obj = {
							nickname:this.text
						}
						this.$http.post('/update',obj)
						.then(res=>{
							this.userInfo[title] = this.text
							this.$store.commit('changeUserInfo',{key:'nickname',value:this.text})
							this.text = ''
							this.toast('修改成功')
						})
						if(close) close()
					})
				}
				catch(err) {
					console.log(JSON.stringify(err))
				}
				
			},
			submit() {
				
			}
		},
		computed:{
			...mapState({
				user:state=>state.user.user
			}),
			confirmTitle() {
				if(this.changeType === 'nickname') {
					return '修改昵称'
				}
				else return '修改账号'
			},
			placeHolder() {
				if(this.changeType === 'nickname') {
					return '填写昵称'
				}
				else return '填写账号'
			}
		}
	}
</script>

<style>
</style>
