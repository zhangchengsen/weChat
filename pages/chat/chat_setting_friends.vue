<template>
	<view>
		<nav-bar showBack :showRight="false"  :subTitle="'设置朋友动态权限'"  >
		</nav-bar>
		<list-item :title="'让他看我'"  >
			<switch slot="rightImg" :checked="!!form.lookme" @change="submit('lookme')"></switch>
		</list-item>
		<list-item :title="'看他'"  >
			<switch slot="rightImg" :checked="!!form.lookhim" @change="submit('lookhim')"></switch>
		</list-item>
	</view>
</template>

<script>
	import navBar from '../../components/free-ui/free-nav.vue'
	import listItem from '../../components/free-ui/free-list-item.vue' 
	export default {
		components:{
			listItem,
			navBar
		},
		onLoad(e) {
			this.id = e.id - 0
			this.form = {
				lookme:e.lookme - 0,
				lookhim:e.lookhim - 0
			}
			
			
		},
		data() {
			return {
				form:{
					lookme:0,
					lookhim:0
				},
				id:0
			}
		},
		methods:{
			submit(type) {
				if(type === 'lookme') this.form.lookme = this.form.lookme ? 0 : 1
				else this.form.lookhim = this.form.lookhim ? 0 : 1
				console.log(this.form)
				this.$http.post('/setmonent/' + this.id , this.form)
				.then(res=>{
					this.toast('修改成功')
				})
			}
		}
	}
</script>

<style>

</style>
