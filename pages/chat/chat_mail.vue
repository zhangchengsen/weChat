<template>
	<view class="" style="">
		<nav-bar showBack  :bgWhite='true' :subTitle="'选择'">
			<free-button @click="changeMode" slot= 'rightIcon' :text="'选择'"></free-button>
		</nav-bar>
		
		
		
		<scroll-view scroll-y="true" class="position-fixed left-0 right-0 bottom-0" :style="'top:' + ( sHeight ) + 'px;'" :scroll-into-view="scrollInto">
			
			
			<block v-for="(item,index) in address" :key = "index">
				<view  v-if=" item.data && item.data.length " :id="'item-'+ item.letter" style="height: 60rpx;background-color: #ededed;" class="flex align-center">
					<text class="ml-2" style="font-size: 24rpx;color: #6a6a6a;">{{item.letter}}</text>
				</view>
				<free-list-item @click="chooseObj(item)" v-for="(item1,index1) in item.data" :key="index1" :title="item1" :src = "'../../static/juju.jpg'">
					<view slot="rightImg" v-if="mode" :style="item.choose ? 'background-color: #07c160;' :'background-color: #EDEDED;'" style="width:  40rpx;height: 40rpx;border-width: 2rpx;" class="mr-5 rounded-circle border"></view>
				</free-list-item>	
			</block>
			
		</scroll-view>
		
		
		
		
		<!-- 索引列表 -->
		<view class="position-fixed right-0 bottom-0" :style=" 'top:' + sHeight + 'px;' " style="width: 50rpx;background-color: #EDEDED;" @touchstart="touchstart" @touchmove="touchstart" @touchend="touchend">
			<text v-for="(item,index) in letterList" :style="'height:'+ letterHeight + 'px;'" :key="index" style="font-size: 26rpx;text-align: center;">{{item}}</text>
		</view>
		<!-- 索引列表 -->
		<!-- 中间字母 -->
		<view class="rounded-circle position-fixed flex align-center justify-center" v-if="letterVis" style="width: 80rpx;height: 80rpx;background-color: #EDEDED;" :style="letterStyle" >
			<text style="font-size: 42rpx;">{{letter}}</text>
		</view>
		<!-- 中间字母 -->
		<!-- 弹出层 -->
		<free-confirm ref="confirm">
			<view class="m-2">
				<text class="font-md text-dark font-weight-bold" style="font-size: 40	rpx;">发送给:</text>
				<scroll-view scroll-x="true" class="my-3"  style="width: 560rpx;" :show-scrollbar="false">
					<view class="flex">
						<view class="mr-1" v-for="(item,index) in chooseItem" :key="index">
							<free-avatar :size="60" :src="'../../static/images/mail/friend.png'" ></free-avatar>
						</view>
					</view>
				</scroll-view>
				<view class="">
					<text class="text-muted p-2"  style="font-size: 32rpx;background-color: #EDEDED;">[个人名片] 昵称</text>
				</view>
				<input placeholder="给朋友留言" v-model="leaveMes" class="text-muted border-bottom m-2 px-2" style="font-size: 32rpx;width: 520rpx;" />
			</view>
		</free-confirm>
		<!-- 弹出层 -->
	</view>
	
</template>

<script>
	import freeConfirm from '../../components/free-ui/free-confirm.vue'
	import freeButton from '../../components/free-ui/free-button.vue'
	import freeListItem from '../../components/free-ui/free-list-item.vue'
	import navBar from '../../components/free-ui/free-nav.vue'
	export default{
		components:{
			freeListItem,
			freeButton,
			navBar,
			freeConfirm
		},
		data() {
			return {
				sHeight:0,
				list:[
					{
						title:'新的朋友',
						src:"../../static/images/mail/friend.png",
						event:'newFriend'
					},
					{
						title:'群聊',
						src:"../../static/images/mail/group.png",
						event:'newFriend'
					},
					{
						title:'标签',
						src:"../../static/images/mail/tag.png",
						event:'newFriend'
					}
				],
				letterList:[
					'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
				],
				address:[
					{
						letter:'A',
						data:['阿里','打算放无色地方','啊啊飒飒的']
					},
					{
						letter:'B',
						data:['不完善','不规范的','报关单发给对方']
					},
					{
						letter:'C',
						data:['ccc']
					},
					{
						letter:'D',
						data:['打算的撒的撒','的不规打范的','的撒的撒打算的撒个']
					},
					{
						letter:'E',
						data:['二锅头如果','额萨达萨达','eaass']
					},
					{
						letter:'F',
						data:['fSADSA','法撒旦是','佛挡杀佛单身公害ass']
					},
					{
						letter:'G',
						data:['fSADSA','法撒旦是','佛挡杀佛单身公害ass']
					},
					{
						letter:'H',
						data:['fSADSA','法撒旦是','佛挡杀佛单身公害ass']
					},
					{
						letter:'I',
						data:['fSADSA','法撒旦是','佛挡杀佛单身公害ass']
					},
					{
						letter:'J',
						data:['fSADSA','法撒旦是','佛挡杀佛单身公害ass']
					},
					{
						letter:'K',
						data:['fSADSA','法撒旦是','佛挡杀佛单身公害ass']
					},
					{
						letter:'L',
						data:['fSADSA','法撒旦是','佛挡杀佛单身公害ass']
					},
					{
						letter:'M',
						data:['MMM']
					},
					{
						letter:'N',
						data:['fSADSA','法撒旦是','佛挡杀佛单身公害ass']
					},
					{
						letter:'O',
						data:['OOO']
					},
					{
						letter:'P',
						data:['PPP']
					},
					{
						letter:'Q',
						data:['QQQ']
					},
					{
						letter:'R',
						data:['RRR']
					},
					{
						letter:'S',
						data:['fSADSA','法撒旦是','佛挡杀佛单身公害ass']
					},
					{
						letter:'T',
						data:['ttttttt','tttttt','tttt']
					},
					{
						letter:'U',
						data:['uuu','uuuuu']
					},
					{
						letter:'V',
						data:['VVV']
					},
					{
						letter:'W',
						data:['WWW']
					},
					{
						letter:'X',
						data:['XXX']
					},
					{
						letter:'Y',
						data:['YYY']
					},
					{
						letter:'Z',
						data:['ZZZ','ZZZZ','ZZZZZZ','ZZZZ','ZZZZZZ','ZZZZ','ZZZZZZ','ZZZZ']
					}
					
					
					
				],
				screenHeight:568,
				letterHeight:20,
				scrollInto:'',
				timer:null,
				screenWidth:375,
				letterVis:false,
				letter:'',
				leaveMes:'',
				inputVal:'',
				mode:false,
				func:null,
			}
		},
		methods:{
			changeMode() {
				console.log('cmode')
				if(this.mode) 
				this.$refs.confirm.show((f)=>{
					f()
				})
				this.mode = true
				
			},
			chooseObj(item) {
				
				console.log('cobj')
				if(this.mode)
				{
					if(item.choose) return item.choose = !item.choose
					if(this.chooseItem.length > 8) return uni.showToast({
						title:'最多选择9个哦',
						icon:'none'
					})
					item.choose = !item.choose
				}
				else {
					this.$refs.confirm.show((f)=>{
						f()
					})
				}
				
			},
			touchstart(e) {
				let index = Math.floor((e.touches[0].pageY - this.sHeight) / this.letterHeight)
				index = index
				if(index < 0||index >25) return 
				let letter = this.letterList[index]
				
				if(this.address[index].data && this.address[index].data.length)  
				{
					this.scrollInto = 'item-' + letter
					console.log(letter,this.scrollInto)
				}
				if(this.timer) clearTimeout(this.timer)
				this.timer = null
				this.letterVis = true
				this.letter = letter
				this.timer = setTimeout(()=>{
					this.letterVis = false
				},800)
				
				
			},
			touchEnd() {
				
			},
			
		},
		mounted() {
			let info  = uni.getSystemInfoSync()
			this.screenHeight = info.screenHeight
			this.screenWidth = info.screenWidth
			let statusHeight= info.statusBarHeight
			let letterHeight = (this.screenHeight - statusHeight - uni.upx2px(90)) / 26 -2 
			this.letterHeight = letterHeight
			this.sHeight =  statusHeight + uni.upx2px(90)
			
		},
		
		computed:{
			letterStyle () {
				return 'left:'+ ( this.screenWidth / 2 - uni.upx2px(40) )+'px;top:'+ ( this.screenHeight
				 / 2 - uni.upx2px(40) ) +'px;'
				
			},
			
			top() {
				return this.sHeight + uni.upx2px(200)
			},
			chooseItem() {
				
				return this.list.filter(v=>v.choose)
			},
			buttonText() {
				if(!this.mode) return '多选'
				return `发送(${this.chooseItem.length})`
				
			},
			searchList() {
				if(!this.inputVal) return this.list
				return this.list.filter(v=>{
					return v.title.indexOf(this.inputVal) !== -1
				})
			}
				
			
			
		}
	}
</script>

<style>
</style>
