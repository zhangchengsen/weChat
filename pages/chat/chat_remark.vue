<template>
	<view style="background-color: #EDEDED;flex:1;" class="">
		<nav-bar showBack judgeBack @back="back" :bgWhite='true' :subTitle="'设置备注和标签'" >
			<free-button @click="finish" slot= 'rightIcon' text="确定"></free-button>
		</nav-bar>
		<!-- 备注名和标签 -->
		<view class="" style="background-color: #EDEDED;">
			<text style="font-size: 28rpx;" class="text-muted p-2	">备注名</text>
		</view>
		<input type="text" value="" v-model="remarkName" :placeholder="preName" class="bg-white py-2 px-3" style="width: 750rpx;height: 80rpx;font-size:32rpx;" />
		<view class="" style="background-color: #EDEDED;">
			<text style="font-size: 28rpx;" class="text-muted p-2	">标签</text>
		</view>
		<view class="flex align-center bg-white flex-wrap" >
			<text @click="navTo()" v-for="(item,index) in tagList" :key="index" style="border-width: 1rpx;border-style: solid;font-size: 30rpx;" class="px-2 py-1 main-text-color border-main m-1 rounded-circle">{{item}}</text>
			<text @click="navTo()"  style="border-width: 1rpx;border-style: solid;font-size: 30rpx;color: #c1c1c1;border-color: #ccc;" class="px-2 py-1 m-1 rounded-circle">添加 +</text>
			
		</view>
		
		<!-- 备注名和标签 -->
	</view>
</template>

<script>
	import freeButton from '../../components/free-ui/free-button.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	export default {
		components:{
			navBar,
			freeButton
		},
		mounted() {
			this.preName = this.remarkName ? this.remarkName : ''
			uni.$on('updateTag',(e)=>{
				this.tagList.push(e.text)
				this.haveChanged = true
			})
			uni.$on('removeTag',(e)=>{
				this.tagList.splice(e.index,1)
				this.haveChanged = true
			})
		},
		onLoad(e){
			this.preName = e.remark
			this.tagList = JSON.parse(e.tag)
			this.id = e.id
			
		},
		beforeDestroy() {
			uni.$off('updateTag')
			uni.$off('removeTag')
		},
		methods:{
			navTo() {
				uni.navigateTo({
					url:`user-tag-set?detail=${JSON.stringify(this.tagList)}`
				})
			},
			finish() {
				uni.$emit('updateMes',{
					tagList:this.tagList,
					remarkName:this.remarkName
				})
				let obj = {
					nickname:this.remarkName,
					tags:this.tagList.join(',')
				}
				this.$http.post('/setfriendtag/'+this.id,obj)
				.then(res=>{
					this.toast('修改成功','success')
					setTimeout(()=>{
						this.goBack()
					},500)
				})
				.catch(err=>{
				})
			},
			back() {
				if(!this.haveChanged && !this.remarkName) return this.goBack()
				uni.showModal({
					cancelText:'取消',
					confirmColor:'#007AFF',
					confirmText:'确定',
					title:'是否保存修改',
					success: (res) => {
						if(res.confirm) {
							// uni.$emit('updateMes',{
							// 	tagList:this.tagList,
							// 	remarkName:this.remarkName
							// })
							let obj = {
								nickname:this.remarkName,
								tags:this.tagList.join(',')
							}
							this.$http.post('/setfriendtag/'+this.id,obj)
							.then(res=>{
								this.toast('修改成功','success')
								setTimeout(()=>{
									this.goBack()
								},500)
							})
							.catch(err=>{
								
							})
						}
						else{
							this.goBack()
						}
					}
				})
			},
			goBack() {
				uni.navigateBack({
					delta:1
				})
			}
		},
		data() {
			return {
				tagList:['我是你爹','IT黑马'],
				remarkName:'',
				haveChanged:false,
				preName:'',
				id:0
				
			}
		},
		computed:{
		}
	}
</script>

<style>

</style>
