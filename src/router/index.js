const router = [
    {
    	path: '/action',
		name: 'action',
		redirect: '/menu', // 默认选中 menu 路由
		component: () => import('@common/views/action.vue'),
		children: [
			{
				path: '/menu',
				name: 'menu',
				component: () => import('@common/views/menu.vue')
			},
			{
				path: '/relocation',
				name: 'relocation',
				component: () => import('@common/views/relocation.vue')
			}
		]
	}
]

export default router
