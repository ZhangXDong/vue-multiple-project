import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/index.js'

import '@util/publicImport.js'

//	version
import versionData from './version.js'
Vue.prototype.$version = versionData

Vue.config.productionTip = false

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
