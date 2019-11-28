import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import '@assets/iconfont/iconfont.js'

import versionData from './version.js'
Vue.prototype.$version = versionData

import qs from 'qs'
Vue.prototype.$qs = qs

//  global scss
import '@style/common.scss'

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
