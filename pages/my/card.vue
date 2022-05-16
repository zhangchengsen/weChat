<template>
	<view class="">
		
		<nav-bar showBack :showRight="false"  :subTitle="'二维码名片'"></nav-bar>
		<view class="p-5">
			<view class="bg-white p-4 rounded">
				<view class="mb-4 flex align-center">
					<free-avatar :src="detail.avatar" :size="detail.type != 'group' ? 92 : 120"></free-avatar>
					<view class="ml-3 " v-if="detail.type != 'group'">
						<text class="font-md font-weight-bold">{{detail.nickname}}</text>
						<!-- <text class="font text-light-muted">地区</text> -->
					</view>
					
				</view>
				<view class="ml-3 mb-2" style="width: 400rpx;" v-if="detail.type === 'group'">
					<text class="font-md font-weight-bold" style="width: 500rpx;">{{detail.nickname + '121212121'}}</text>
				</view>
				<view class="">
					
					<image  :src="src" mode="" style="width: 550rpx;height: 550rpx;" class="mb-4 bg-secondary border p-1"></image>
					<view class="flex align-center w-100" style="">
						<text class="text-light-muted text-center">扫一扫二维码图案,加我即讯</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import freeAvatar from '../../components/free-ui/free-avatar.vue'
	import navBar from '@/components/free-ui/free-nav.vue'
	import auth from '../../common/mixin/auth.js'
	import $C from '../../common/free-lib/config.js'
	import {mapState} from 'vuex'
	export default {
		components:{
			navBar,
			freeAvatar
		},
		mixins:[auth],
		data() {
			return {
				detail:{
					
				}
			}
		},
		onLoad(e) {
			if(!e.params) {
				uni.navigateBack({
					delta:1
				})
				this.toast('非法参数')
			}
			this.detail = JSON.parse(e.params)
			console.log(this.detail)
			this.src = $C.codeUrl + `/${this.detail.type}/qr?token=`+this.user.token+"&id="+this.detail.id
		},
		computed:{
			...mapState({
				user:state=>state.user.user
			})
		}
		
	}
</script>

<style>

</style>
