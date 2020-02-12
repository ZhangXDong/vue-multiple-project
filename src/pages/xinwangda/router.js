import Vue from 'vue'
import Router from 'vue-router'
import router from '@/router/index.js' // 公共路由

Vue.use(Router)

export default new Router({
	base: '/xinwangda/',
	routes: [
		{
			path: '/',
			name: 'main',
			redirect: '/free', // 默认选中 free 路由
			component: () => import('./views/main.vue'),
			children: [
				...router,
				// 垃圾清运
				{
					path: '/sunwodaGarbageCarry/task',
					name: 'garbageCarryTask',
					component: () =>
						import('./views/garbageCarry/task.vue')
				},
				{
					path: '/sunwodaGarbageCarry/loadPoint',
					name: 'garbageCarryloadPoint',
					component: () =>
						import('./views/garbageCarry/loadPoint.vue')
				},
				{
					path: '/sunwodaGarbageCarry/unloadPoint',
					name: 'garbageCarryunloadPoint',
					component: () =>
						import('./views/garbageCarry/unloadPoint.vue')
				},
				// 物料搬运
				{
					path: '/sunwodaMaterialCarry/loadPoint',
					name: 'materialCarryloadPoint',
					component: () =>
						import('./views/materialCarry/loadPoint.vue')
				},
				{
					path: '/sunwodaMaterialCarry/unloadPoint',
					name: 'materialCarryunloadPoint',
					component: () =>
						import('./views/materialCarry/unloadPoint.vue')
				},
				{
					path: '/sunwodaMaterialCarry/waitDump',
					name: 'materialCarrywaitDump',
					component: () =>
						import('./views/materialCarry/waitDump.vue')
				},
				{
					path: '/sunwodaMaterialCarry/lastUnloadPoint',
					name: 'materialCarrylastUnloadPoint',
					component: () =>
						import('./views/materialCarry/lastUnloadPoint.vue')
				}
			]
		},
	]
})
