<template>
	<view>
		<nav-bar showBack  :bgWhite='true' :subTitle="'投诉'">
			<free-button @click="submit" slot= 'rightIcon' :text="'发送'"></free-button>
		</nav-bar>
			<picker mode="selector" @change="changePickerVal" :range="list">
					<free-list-item   :title="pickerVal ? pickerVal:'请选择选择分类'"  showRight>
						<view slot="leftIcon" style="width: 20rpx;" ></view>
					</free-list-item>	
			</picker>
		<textarea v-model="text" placeholder="请填写投诉内容..." class="bg-white  font-md p-2 "></textarea>
	</view>
</template>

<script>
	import freeListItem from '../../components/free-ui/free-list-item.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	import freeButton from '../../components/free-ui/free-button.vue'
	export default {
		components:{
			navBar,
			freeButton,
			freeListItem
		},
		data() {
			return {
				id:0,
				pickerVal:'',
				list:['分类一','分类二','分类三','分类四','分类五','分类六','分类七'],
				text:''
			}
		},
		methods:{
			changePickerVal(e) {
				this.pickerVal = this.list[e.target.value]
			},
			submit() {
				let obj = {
					category:'user',
					reported_id:this.id - 0,
					reported_type:this.pickerVal,
					content:this.text
				}
				console.log(obj)
				this.$http.post('/report',obj)
				.then(res=>{
					this.toast('举报成功')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				})
			}
			
		},
		onLoad(e) {
			this.id  = e.id
		}
	}
</script>

<style>

</style>
