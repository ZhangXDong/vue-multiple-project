const baseInfo = {
    state: {
        robotInfo: null, // 机器人基本信息
        workingMode: '空闲', // 工作模式
        workingStatus: '空闲', // 工作状态
        robotStatus: null, // 机器人状态
        positionSuccess: false, // 是否定位成功
        robotForcosState: {
            robotForcosState: '' // 机器人Frocos状态
        },
        robotLastState: null, // 机器人上一个状态
        reconnectPrompt: false, // 是否连接系统
        priorityStatus: {display: false, status: ''}, //优先级
        
        followModuleAvailable: false, // 跟随按钮是否显示
        followDisabled: false, // 跟随按钮是否可用
        followInfo: { // 跟随下的状态
            vehicleState: '',
            statusIndicators: '',
            actionButtons: [{
                title:'继续跟随',
                type: 13,
                disable: false,
                hasBgColor: true,   // 是否有背景颜色 true默认深蓝色
                bgColor: '#2E9B24' // 背景颜色
            },
            {
                title:'停止跟随',
                type: 19,
                disable: false,
                hasBgColor: true,   // 是否有背景颜色 true默认深蓝色
                bgColor: '#3F50B5' // 背景颜色
            }]
        },
        startNormal: false, // 开机启动中 loading
        startNormalText: '',
        errorShutDownLoaidng: true, // 超时或者网络错误时，是否关闭loading
        // 充电下的状态
        chargingInfo: {
            workingCondition: '正在充电中',
            baseStatus: '',
            stationName: '',
            actionButtons: [{
                title:'到达',
                type: 15,
                disable: false,
                hasBgColor: true,   // 是否有背景颜色 true默认深蓝色
                bgColor: '#2E9B24' // 背景颜色
            },
            {
                title:'暂停',
                type: 12,
                disable: false,
                hasBgColor: true,   // 是否有背景颜色 true默认深蓝色
                bgColor: '#3F50B5' // 背景颜色
            }]
        },
        ftaVersion: null, // fta 版本
        configuration: { //弹窗提示
            dialogVisible: false,
            statusCode: '',
            msg: '',
            btn: '确 定',
            isWarning: false
        },
        
    },
    mutations: {
        FTA_SAVE_ROBOTINFO: (state, payload) => {
            state.robotInfo = payload
        },
        FTA_SAVE_WORKINGMODE: (state, payload) => {
            state.workingMode = payload
        },
        FTA_SAVE_WORKINGSTATUS: (state, payload) => {
            state.workingStatus = payload
        },
        FTA_SAVE_ROBOTSTATUS: (state, payload) => {
            state.robotStatus = payload
        },
        FTA_SAVE_POSITIONSUCCESS: (state, payload) => {
            state.positionSuccess = payload
        },
        FTA_SAVE_FOLLOWINFO: (state, payload) => {
            state.followInfo = payload
        },
        FTA_SAVE_ROBOTFORCOSSTATE: (state, payload) => {
            state.robotForcosState = payload
        },
        FTA_SAVE_ROBOTLASTSTATE: (state, payload) => {
            state.robotLastState = payload
        },
        FTA_SAVE_RECONNECTPROMPT: (state, payload) => {
            state.reconnectPrompt = payload
        },
        FTA_SAVE_PRIORITYSTATUS: (state, payload) => {
            state.priorityStatus = payload
        },
        FTA_SAVE_FOLLOWMODULEAVAILABLE: (state, payload) => {
            state.followModuleAvailable = payload
        },
        FTA_SAVE_FOLLOWDISABLED: (state, payload) => {
            state.followDisabled = payload
        },
        FTA_SAVE_STARTNORMAL: (state, payload) => {
            state.startNormal = payload
        },
        FTA_SAVE_STARTNORMALTEXT: (state, payload) => {
            state.startNormalText = payload
        },
        FTA_SAVE_CHARGINGINFO: (state, payload) => {
            state.chargingInfo = payload
        },
        FTA_SAVE_CHARGINGINFO: (state, payload) => {
            state.chargingInfo = payload
        },
        FTA_SAVE_VERSIONMSG: (state, payload) => {
            state.ftaVersion = payload
        },
        ERROR_SHUTDOWN_LOADING: (state, payload) => {
            state.errorShutDownLoaidng = payload
        },
        FTA_SAVE_CONFIGURATION: (state, payload) => {
            state.configuration = payload
        },
    }
}
  
export default baseInfo
  