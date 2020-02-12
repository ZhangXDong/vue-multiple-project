const publicBusiness = { // 公共业务
    state: {
        gatherOrder: null, // 集合单信息
        footerBtns: [ // 底部按钮
            {
                title:'到达',
                type: 15,
                disable: false,
                hasBgColor: true,   // 是否有背景颜色 true默认深蓝色
                bgColor: '#2E9B24', // 背景颜色
            },
            {
                title:'暂停',
                type: 12,
                disable: false,
                hasBgColor: true,   // 是否有背景颜色 true默认深蓝色
                bgColor: '#3F50B5', // 背景颜色
                showNum: false, // 是否展示确认数量
            }
        ],

        // 顶升
        showJackUp: false, // 顶升操作
        showJackUpWork: false, // 顶升工作中
        jackUpPercent: 0, // 顶升百分比
        jackUpStatus: -1, // 顶升状态

        // 按钮防暴击弹窗
        allButtonCannotClick: false, // 防止按钮多次点击
        allButtonCannotClickTimer: null, // 防按钮暴击定时器

        stationInfo: null, // 前往/到达的储位信息

        // 业务调度下的状态
        scheduleCurrentOrder: { 
            taskId: '', // 主单号
            originalCode: '', // 原单号（工单号）
            taskNumber: '', // 任务号
            stationName: '', // 储位号
            workingCondition: '当前到达',
            floorInfo: null, // 楼层信息
        },
        scheduleGuideTip: '默认指引文案', // 导航指引文案
    },
    mutations: {
        GATHER_ORDER: (state, payload) => {
            state.gatherOrder = payload
        },
        FOOTER_BTNS: (state, payload) => {
            state.footerBtns = payload
        },
        SHOW_JACKUP: (state, payload) => {
            state.showJackUp = payload
        },
        SHOW_JACKUP_WORK: (state, payload) => {
            state.showJackUpWork = payload
        },
        JACKUP_PERCENT: (state, payload) => {
            state.jackUpPercent = payload
        },
        JACKUP_STATUS: (state, payload) => {
            state.jackUpStatus = payload
        },
        ALL_BUTTON_CANNOT_CLICK: (state, payload) => { // 2s 后，设置为可点击状态
            state.allButtonCannotClick = payload
            state.allButtonCannotClickTimer && clearTimeout(state.allButtonCannotClickTimer)
            state.allButtonCannotClickTimer = setTimeout(() => {
                state.allButtonCannotClick = false
            }, 1000)
        },
        
        STATION_INFO: (state, payload) => {
            state.stationInfo = payload
        },
        SCHEDULE_SAVE_CURRENTORDER: (state, payload) => {
            state.scheduleCurrentOrder = payload
        },
        SCHEDULE_SAVE_GUIDETIP: (state, payload) => {
            state.scheduleGuideTip = payload
        },
    }
}

export default publicBusiness
