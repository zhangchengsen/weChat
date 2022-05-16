import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import request from 'common/free-lib/request.js'

Vue.config.productionTip = false
Vue.prototype.toast = (title,icon = 'none') => {
	uni.showToast({
		title,
		icon
	})
}
Vue.prototype.$http = request
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
