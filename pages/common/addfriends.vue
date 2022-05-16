<template>
	<view class="page">
		<nav-bar showBack bgWhite :subTitle="'用户信息'" showRight>
			<view slot = "rightIcon" :icon="'\ue6fd'"  >
				<text class="iconfont mr-1" style="">&#xe6fd;</text>
			</view>
		</nav-bar>
		<view class="p-2" style="background-color: #EDEDED;">
			<text class="text-muted" style="font-size: 32rpx;">备注名</text>
		</view>
		<view class="w-100 bg-white  " style="height: 60rpx;line-height: 60rpx;">
			<input type="text" class="w-100 p-2" value="" style="height: 60rpx;font-size: 32rpx;" v-model="nickname" />
		</view>
		<view style="height: 30rpx;"  class="bg-white border-bottom"></view>
		<divider :height="20"></divider>
		<list-item :title="'不看他'"  >
			<switch slot="rightImg" :checked="!!lookhim" @change="lookhim = lookhim ? 0 : 1"></switch>
		</list-item>
		<list-item :title="'不让他看我'"  >
			<switch slot="rightImg" :checked="!!lookme" @change="lookme = lookme ? 0 : 1"></switch>
		</list-item>
		<divider :height="20"></divider>
		<view class="bg-white flex align-center justify-center" style="height: 100rpx;" hover-class="bg-light" @click="submit">
			<text class="text-primary iconfont" >{{type === 'agree' ? '成为好友' : '点击添加'}}</text>
		</view>
		<!-- 弹出层 -->
		
	</view>
</template>

<script>
	import divider from '../../components/free-ui/free-divider.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	import listItem from '../../components/free-ui/free-list-item.vue'
	import auth from '../../common/mixin/auth.js'
	export default {
		components:{
			navBar,
			divider,
			listItem,
		},
		mixins:[auth],
		methods:{
			submit() {
				let {nickname,lookme,lookhim} = this
				let obj = {
					nickname,lookhim,lookme,
					
				}
				if(!this.type) 
				{
					obj.friend_id = this.id
					this.$http.post('/addfriends',obj)
					.then(res=>{
						this.toast('发送申请成功','success')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,
							})	
						},1000)
						
					})
				}
				// 成为好友
				else{
					obj.status = 'agree'
					this.$http.post('/handlefriends/' + this.id , obj)
					.then(res=>{
						this.toast('添加成功','success')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,
							})	
							this.$store.dispatch('getContacts')
						},1000)
						
						
					})
				}
				
			}
		},
		onLoad(e) {
			this.id = e.id
			this.type = e.type ? e.type : ''
			console.log(this.id)
		},  
		mounted(){
			
		},
		beforeDestroy() {
		},
		data() {
			return {
				id:0,
				lookme:1,
				lookhim:1,
				nickname:'',
				type:''
			}
		},
		computed:{
		}
	}
</script>

<style>

</style>
