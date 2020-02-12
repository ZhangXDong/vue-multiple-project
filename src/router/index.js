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
			},
			{
				path: '/followIdentify',
				name: 'followIdentify',
				component: () => import('@common/views/followIdentify.vue'),
			},
			{
				path: '/following',
				name: 'following',
				component: () => import('@common/views/following.vue'),
			},
			{
				path: '/taskTakeover',
				name: 'taskTakeover',
				component: () => import('@common/views/taskTakeover.vue'),
			}
		]
	},
	// 登录
	{
        path: '/login',
        name: '登录',
        component: () =>
        import('@common/views/login.vue')
    },
	//	空闲页面
	{
		path: '/free',
		name: 'free',
		component: () => import('@common/views/free.vue'),
	},
	{
        path: '/ready',
        name: '准备开始工作',
        component: () => import('@common/views/ready.vue')
    },
    {
        path: '/jackUpHome',
        name: '空闲顶升',
        component: () => import('@common/views/jackUpHome.vue')
    },
    {
        path: '/stopWorkHome',
        name: '空闲停止工作',
        component: () => import('@common/views/stopWorkHome.vue')
    },
	// 导航界面
	{
		path: '/navigate',
		name: 'navigate',
		component: () => import('@common/views/navigate.vue'),
	},
	{
		path: '/charging',
		name: 'charging',
		component: () => import('@common/views/charging.vue'),
	},
	{
        path: '/commonNavigate',
        name: '公共导航页面',
        component: () => import('@common/views/commonNavigate.vue')
    },
    {
        path: '/jackUpCommonNavigate',
        name: '公共导航页面可顶升',
        component: () => import('@common/views/jackUpCommonNavigate.vue')
    },
    {
        path: '/barcodeNavigate',
        name: '公共条形码页面导航',
        component: () => import('@common/views/barcodeNavigate.vue')
    },
]

export default router
