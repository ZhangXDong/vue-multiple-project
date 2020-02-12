import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router/index.js' // 公共路由

Vue.use(Router)

export default new Router({
	base: '/tcl/',
	routes: [
		{
			path: '/',
			name: 'main',
			redirect: '/free', // 默认选中 free 路由
			component: () => import('./views/main.vue'),
			children: [
				...router,
				// 成品回收、原料配送公用
				{
					path: '/tclScene/task',
					name: 'tclTask',
					component: () =>
						import('./views/tclScene/task.vue')
				},
				{
					path: '/tclScene/loadPointA',
					name: 'tclUnloadPointA',
					component: () =>
						import('./views/tclScene/loadPointA.vue')
				},
				{
					path: '/tclScene/loadPointB',
					name: 'tclUnloadPointB',
					component: () =>
						import('./views/tclScene/loadPointB.vue')
				},
				{
					path: '/tclScene/unloadPointA',
					name: 'tclUnloadPointA',
					component: () =>
						import('./views/tclScene/unloadPointA.vue')
				},
				{
					path: '/tclScene/unloadPointB',
					name: 'tclUnloadPointB',
					component: () =>
						import('./views/tclScene/unloadPointB.vue')
				},
				{
					path: '/tclScene/waitDump',
					name: 'tclWaitDump',
					component: () =>
						import('./views/tclScene/waitDump.vue')
				},
				// 成品回收
				{
					path: '/tclProductRecovery/task',
					name: 'productRecoveryTask',
					component: () =>
						import('./views/productRecovery/task.vue')
				},
				{
					path: '/tclProductRecovery/loadPointA',
					name: 'productRecoveryLoadPointA',
					component: () =>
						import('./views/productRecovery/loadPointA.vue')
				},
				{
					path: '/tclProductRecovery/loadPointB',
					name: 'productRecoveryLoadPointB',
					component: () =>
						import('./views/productRecovery/loadPointB.vue')
				},
				{
					path: '/tclProductRecovery/waitDump',
					name: 'productRecoveryWaitDump',
					component: () =>
						import('./views/productRecovery/waitDump.vue')
				},
				// 原料配送
				{
					path: '/tclMaterialDelivery/loadPoint',
					name: 'materialDeliveryLoadPoint',
					component: () =>
						import('./views/materialDelivery/loadPoint.vue')
				},
				{
					path: '/tclMaterialDelivery/unloadPointA',
					name: 'materialDeliveryUnloadPointA',
					component: () =>
						import('./views/materialDelivery/unloadPointA.vue')
				},
				{
					path: '/tclMaterialDelivery/unloadPointB',
					name: 'materialDeliveryUnloadPointB',
					component: () =>
						import('./views/materialDelivery/unloadPointB.vue')
				},
				{
					path: '/tclMaterialDelivery/waitDump',
					name: 'materialDeliveryWaitDump',
					component: () =>
						import('./views/materialDelivery/waitDump.vue')
				},
			]
		},
	]
})
