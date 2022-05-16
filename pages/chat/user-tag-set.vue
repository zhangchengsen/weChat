<template>
	<view style="background-color: #EDEDED;flex:1;" class="">
		<nav-bar showBack :bgWhite='true' :subTitle="'设置备注和标签'" >
			<free-button @click="setNewTag()" slot= 'rightIcon' :textColor=" '' " :bgColor="'' " text="添加" :bodyStyle="input ? 'color:#fff;background-color:#07c160;': 'color:#bcbcbc;background-color:#e2e2e2;'"></free-button>
		</nav-bar>
		
		<view class="flex m-2 py-2 border-bottom" >
			<input v-model="input" style="border-style: dashed;border-width: 1rpx;font-size: 30rpx;border-color: #cfcfcf;width: 200rpx;height: 55rpx;" placeholder="添加标签..." class="text-muted rounded-circle bg-white mx-2 px-2 my-1 " maxlength="4" @confirm="setNewTag" confirm-type="send" />
		</view>
		<view class="">
			<text class="text-muted mx-2" style="font-size: 30rpx;">所有标签</text>
			<view class="flex align-center flex-wrap border-bottom">
				<text style="font-size: 30rpx;" v-for="(item,index) in tagList" :key = "index" class=" rounded-circle bg-white border m-2 px-2 py-1" @click="remove(index)" >{{item}}</text>
			</view>
			<view class="flex align-center flex-wrap">
				<text @click="easyAdd(item)" style="font-size: 24rpx;" v-for="(item,index) in finalEasyTag" :key = "index"  class="text-muted rounded-circle bg-white border m-2 px-2 py-1"  >{{item + ' +'}}</text>
			</view>
		</view>
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
		onLoad(e){
			if(e.detail)
			this.tagList = JSON.parse(e.detail)
			this.tagList.forEach(v=>{
				this.tagMap[v] = 1
			})
		},
		mounted(){
			
		},
		
		methods:{
			remove(index) {
				uni.showModal({
					confirmColor:"#FA5251",
					title:'删除"' +this.tagList[index]+'"这个标签吗',
					confirmText:'确定',
					cancelColor:'取消',
					success: (res) => {
						if(res.confirm) {
							this.tagList.splice(index,1)
							uni.$emit('removeTag',{index})
						}
					}
				})
			},
			setNewTag() {
				console.log(this.tagList.length)
				if(this.tagList.length > 5) return this.toast('请不要超过6个标签哦')
				if(this.tagMap[this.input]) return uni.showToast({
					title:'标签重复了，换一个试试吧',
					icon:'none'
				})
				this.tagMap[this.input] = 1
				this.tagList.push(this.input)
				uni.$emit('updateTag',{
					text:this.input
				})
				this.input = ''
				
			},
			
			easyAdd(item) {
				console.log(this.tagList.length)
				if(this.tagList.length > 4) return this.toast('请不要超过5个标签哦')
				if(this.tagMap[item]) return uni.showToast({
					title:'标签重复了，换一个试试吧',
					icon:'none'
				})
				this.tagList.push(item) 
				this.tagList = [...this.tagList ]
				this.tagMap[item] = 1
				this.tagMap = {...this.tagMap}
				this.easyTag = [...this.easyTag.filter(v=>v!=item)]
				uni.$emit('updateTag',{
					text:item
				})
			}
		},
		data() {
			return {
				tagList:[],
				tagMap:{},
				easyTag:['家人','爱人','兄弟','同学'],
				input:''
			}
		},
		computed:{
			finalEasyTag() {
				let list = []
				this.easyTag.forEach(v=>{
					if(!this.tagMap[v]) list.push(v)
				})
				return list
			}
		}
	}
</script>

<style>

</style>
