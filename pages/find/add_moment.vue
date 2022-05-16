<template>
	<view class="bg-white ">
		<nav-bar showBack bgWhite   >
			<free-button @click="submit()" slot= 'rightIcon' text="发表"></free-button>
		</nav-bar>
		<view>
			<textarea value="" v-model="content" placeholder="输入这一刻的想法" class="p-2 font-md mb-3" />
			<!-- <list-item :title="'群公告'"  showRight></list-item> -->
			
			<upload-image @deleteImage="deleteImage" v-if="type === 'image'" @upload="uploadImage" :imageList = "imageList"></upload-image>
			<view class="" v-if="type === 'video'">
				<view class="flex align-center justify-center bg-light rounded" style="height: 350rpx;" hover-class="bg-hover-light" v-if="!video" @click="chooseVideo">
					<text class="text-muted" style="font-size: 100rpx;">+</text>
				</view>
				<view class="flex align-center justify-center flex-column" v-if="video">
					<video  :src="video" controls></video>
					<view  class="bg-light my-3 flex align-center justify-center " style="height: 100rpx;" hover-class="bg-hover-light"  @click="chooseVideo" >
						<text class="font-md text-muted text-center" style="width: 600rpx;" >点击切换视频</text>
					</view>
				</view>
				
			</view>
			
			<list-item marginLeft :title="'所在位置'" :subTitle="location" :rightText="'位置'" showRight @click="getLocation"></list-item>
			<list-item marginLeft v-if="seeText !== '仅自己'" @click="openMind" :title="'提醒谁看'" :rightText="remindText" showRight></list-item>
			<list-item marginLeft @click="openSee" :title="'谁可以看'"  :rightText="seeText"  showRight></list-item>
			<view class="" style="height: 100rpx;">
				
			</view>
		</view>

	</view>
</template>

<script>
	import uploadImage from '../../components/free-ui/free-upload-image.vue'
	import listItem from '../../components/free-ui/free-list-item.vue'
	import navBar from '@/components/free-ui/free-nav.vue'
	import freeButton from '../../components/free-ui/free-button.vue'
	export default {
		computed:{
			seeText() {
				let text ;
				if(!this.see && !this.seeType) return '公开'
				switch (this.seeType) {
					case 'all':
						text = '公开'
					break;
					case 'only':
						text = `${this.see.split(',').length}位好友可见  （重新选择）`
					break
					case "except":
						text = `${this.see.split(',').length}位好友不可见 （重新选择）`
					break
					case "none":
						text = '仅自己'
					break
					
				}
				return text
				
			},
			remindText() {
				let list = this.remindList.map(v=>v.username)
				if(this.remindList.length > 2) {
					return list[0] + ',' + list[1]+'...等人'
				}
				else return list.join(',')
			}
		},
		components:{
			navBar,
			freeButton,
			listItem,
			uploadImage
		},
		onLoad(e){
			this.type = e.type
			uni.$on('see',(see)=>{
				console.log('see',see)
				this.see = see.ids.join(',')
				this.seeType = see.see
				
			})
			uni.$on('remind',remind=>{
				console.log('remind',remind)
				this.remindList =  remind
				this.remind = remind.map(v=>v.user_id).join(',')
			})
		},
		beforeDestroy() {
			uni.$off('see',()=>{})
			uni.$off('remind',()=>{})
		},
		
		methods:{
			uploadImage(e) {
				
				e.forEach(v=>{
					this.$http.upload('/upload',{
						filePath:v
					})
					.then(res=>{
						this.imageList.push(res)
					})
				})
			},
			chooseVideo() {
				uni.chooseVideo({
					success: (res) => {
						uni.showLoading({
							title:'视频大小会影响上传时间哦'
						})
						this.$http.upload('/upload',{
							filePath:res.tempFilePath
						})
						.then(res=>{
							console.log('video',res)
							this.video = res
							uni.hideLoading()
						})
						.catch(()=>{
							uni.hideLoading()
							this.toast('上传失败')
						})
					}
				})
			},
			deleteImage(e) {
				this.imageList.splice(e,1)
			},
			submit() {
				let type = 'content'
				if(this.imageList.length) type = 'image'
				else if(this.video) type = 'video'
				if(type === 'image' && !this.imageList.length) return this.toast('图片未添加')
				if(type === 'video' && !this.video) return this.toast('音频未加载')
				let see = this.seeType
				if(see === 'except' || see === 'only') see += ':'+this.see
				let obj = {
					content:this.content,
					image:this.imageList.join(','),
					video:this.video,
					location:this.location,
					remind: this.seeText === '仅自己' ? '' : this.remind,
					type,
					see
				}
				console.log('朋友圈 ',obj)
				this.$http.post('/moment/create',obj)
				.then(res=>{
					console.log(res)
					uni.showToast({
						title:'发布成功',
						mask:true
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
				})
				.catch(err=>{
					console.log(err)
				})
				
			},
			getLocation() {
				uni.chooseLocation({
					success:(res)=>{
						console.log(res.name)
						this.location = res.name
					}
				})
			},
			openMind() {
				uni.navigateTo({
					url:'mind_see?type=mind'
				})
			},
			openSee() {
				uni.navigateTo({
					url:'mind_see?type=see'
				})
			}
		},
		data() {
			return {
				imageList:[],
				type:'',
				video:'',
				content:'',
				location:'',
				see:'',
				remind:'', 
				seeType:'',
				remindList:[]
				// seeMap:{
				// 	''
				// }
			}
		}
	}
</script>

<style>

</style>
