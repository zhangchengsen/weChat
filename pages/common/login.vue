<template>
	<view class=""  style="">
		
		<view class="" v-if="!show">
			
		</view>
		<view class="" v-else>
			<view class="flex align-center justify-center " style="height: 400rpx;">
				<text class="mt-2" style="font-size: 50rpx;color: #fff;">欢迎来到网页版Wechat</text>
			</view>
			<view class="flex align-center justify-center flex-column">
				<input class="mx-3 px-2 mb-2 mt-2 rounded" style="height: 100rpx;width: 80%;background-color: #EDEDED;" type="text" v-model = "username" placeholder="请输入用户名" />
				<input class="mx-3 px-2 mb-3 mt-1 rounded"  style="height: 100rpx;width: 80%;background-color: #EDEDED;" type="text" v-model = "password" placeholder="请输入密码" @confirm="loginOrReg" />
				<input class="mx-3 px-2 mb-3 mt-1 rounded"  style="height: 100rpx;width: 80%;background-color: #EDEDED;" type="text" v-if="type !== 'login'" v-model = "repassword" placeholder="请再次输入密码" @confirm="loginOrReg" />
				<view class="mx-3 px-2 mb-3 rounded main-bg-color flex align-center justify-center" style="height: 90rpx;width: 80%;"  @click="loginOrReg"  >
					<text class="text-white font-md pointer" style="" >{{type === 'login' ? '登陆' : '注册'}}</text>
				</view>
			</view>
			
			
			<view class="mt-2 flex align-center justify-center">
				<text class="text-muted px-2 pointer" v-if="type === 'login'" @click="changeType('register')" style="font-size: 32rpx;color: #e3e3e3">注册账号</text>
				<text class="text-muted px-2 pointer" v-else @click="changeType('login')" style="font-size: 32rpx;">去登录</text>
				<text class="text-muted px-2" style="font-size: 32rpx;">丨</text>
				<text class=" px-2 pointer" style="font-size: 32rpx;color: #e3e3e3">忘记密码</text>
			</view>
			<view class="position-absolute left-0 right-0 flex align-center justify-center" style="bottom: 10%;">
					<text style="color: #7f7f7f;">© 2021-2022 Chanork 版权所有  |</text>
					<text class="text-white ml-1"> 浙ICP备2021034336号-1</text>
			</view>
		</view>
		
		<view class="position-fixed left-0 right-0 top-0 bottom-0" style="min-height: 100%;background-image: url(../../static/bgc.jpg);filter: blur(15px);z-index: -1;">
			
		</view>
	</view>
	
</template>

<script>
	import {mapState} from 'vuex'
	import $U from '../../common/free-lib/util.js'
	// import $http from '../../common/free-lib/request.js'
	export default {
		methods:{
			loginOrReg() {
				if(!this.username || !this.password) return uni.showToast({
					icon:'none',
					title:"用户名或密码不能为空"
				})
				let obj = {
					username:this.username,
					password:this.password,
					repassword:this.repassword
				}
				if(this.type !== "login" && !this.repassword) return uni.showToast({
					icon:'none',
					title:'请填写完整'
				}) 
				this.$http.post(`/${this.type}`,obj,{token:false})
				.then(res=>{
					if(this.type === 'login') {
						this.$store.dispatch('login',res)
						uni.switchTab({
							url:'../index/index'
						})
						
					}
					else {
						this.type = 'login'
						this.password = ''
						uni.showToast({
							title:'注册成功'
						})
					}
				})
				
				
			
			},
			changeType(type) {
				console.log(type)
				this.type = type
				this.username = ''
				this.password = ''
				this.repassword = ''
			}
		},
		created() {
			uni.showLoading({
				title:'加载中'
			})
			setTimeout(()=>{
				let token = $U.getStorage('token')
				uni.hideLoading()
				if(token) 
				return uni.switchTab({
					url:'../index/index'
				})
				this.show = true
			},800)
		},
		data() {
			return {
				username:'',
				password:'',
				repassword:'',
				show:false,
				type:'login'
			}
		}
	}
</script>

<style>

</style>
