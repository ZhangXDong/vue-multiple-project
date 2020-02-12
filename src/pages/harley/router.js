import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router/index.js' // 公共路由

Vue.use(Router)

export default new Router({
	base: '/harley/',
	routes: [
		{
			path: '/',
			name: 'main',
			redirect: '/free', // 默认选中 free 路由
			component: () => import('./views/main.vue'),
			children: [
				...router,
				{
					path: '/onTheBox',
					name: 'onTheBox', // 容器上车
					component: () => import('./views/onTheBox.vue')
				},
				{
					path: '/sorting',
					name: 'sorting', // 分拣卸车
					component: () => import('./views/sorting.vue')
				},
				//	需求剔除
				// {
				// 	path: '/unusualList',
				// 	name: 'unusualList', // 异常处理列表
				// 	component: () => import('./views/unusualList.vue')
				// },
				// {
				// 	path: '/pickUp',
				// 	name: 'pickUp', // 补拣
				// 	component: () => import('./views/pickUp.vue')
				// }
			]
		},
	]
})
