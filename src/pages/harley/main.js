import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@assets/iconfont/iconfont.js'

import baseUrl from '@/common/getUrl.js';
Vue.prototype.$baseUrl = baseUrl()

import versionData from './version.js'
Vue.prototype.$version = versionData

import qs from 'qs'
Vue.prototype.$qs = qs

import store from './store/index.js'

//  global scss
import '@style/common.scss'

Vue.config.productionTip = false

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
