import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router/index.js' // 公共路由

Vue.use(Router)

export default new Router({
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'main',
			component: () => import('./views/main.vue'),
			children: [
				...router,
			]
		},
	]
})
