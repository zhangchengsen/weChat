import Vue from 'vue'
import Vuex from 'vuex'
import audio from './module/audio.js'
import user from './module/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
	  audio,
	  user
  }
})
