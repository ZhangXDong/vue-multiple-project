
const sunwodaData = {
    state: {
        // 垃圾清运
        sunwodaSchedulingInfo: {
            workingCondition: '正在前往：',
            isNavigate: 6, // 标识任务状态 ： 1-准备拣选 2-导航到储位 3-到达储位 4-集并区 5-停车区 6-电梯排队中
            currentOrder: {
                taskId: '', // 主单ID
                originalCode: '', // 原单号
                taskNumber: '',
                stationName: ''
            }
        },
        sunwodaGuideTip: '默认指引文案', // 指引文案
        sunwodaIsRecyclable: '',  // 是否可回收 100101-可回收 100102-不可回收
        // 物料搬运
        sunwodaRPMData: null, // 卸料点明细数据
    },
    mutations: {
        SUNWODA_SAVE_SCHEDULINGINFO: (state, payload) => {
            state.sunwodaSchedulingInfo = payload
        },
        SUNWODA_SAVE_GUIDETIP: (state, payload) => {
            state.sunwodaGuideTip = payload
        },
        SUNWODA_SAVE_ISRECYCLABLE: (state, payload) => {
            state.sunwodaIsRecyclable = payload
        },
        SUNWODA_SAVE_RPMDATA: (state, payload) => {
            state.sunwodaRPMData = payload
        }
    },
    actions: {

    }
}
  
export default sunwodaData
  