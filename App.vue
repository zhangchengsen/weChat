<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS-NVUE
			// 加载公共图标库
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace', {
			    'fontFamily': "iconfont",
			    'src': "url('https://at.alicdn.com/t/font_1365296_2ijcbdrmsg.ttf')"
			});
			// #endif
			this.$store.dispatch('initlogin')
			console.log('App Launch')
			this.$store.commit('initRecord')
		},
		onShow: function() {
			console.log('App Show')
			this.$store.dispatch('reconnect')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "./common/free.css";
	@import "./common/common.css";
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	@import './common/free-icon.css';
	/* #endif */
</style>
