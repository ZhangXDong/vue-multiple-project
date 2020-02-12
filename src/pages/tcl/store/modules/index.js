
const tclData = {
    state: {
        // 垃圾清运
        tclSchedulingInfo: {
            workingCondition: '正在前往：',
            isNavigate: 6, // 标识任务状态 ： 1-准备拣选 2-导航到储位 3-到达储位 4-集并区 5-停车区 6-电梯排队中
            currentOrder: {
                taskId: '', // 主单ID
                originalCode: '', // 原单号
                taskNumber: '',
                stationName: ''
            }
        },
        tclGuideTip: '默认指引文案', // 指引文案
        tclIsRecyclable: '',  // 是否可回收 100101-可回收 100102-不可回收
        // 物料搬运
        tclRPMData: null, // 卸料点明细数据
    },
    mutations: {
        TCL_SAVE_SCHEDULINGINFO: (state, payload) => {
            state.tclSchedulingInfo = payload
        },
        TCL_SAVE_GUIDETIP: (state, payload) => {
            state.tclGuideTip = payload
        },
        TCL_SAVE_ISRECYCLABLE: (state, payload) => {
            state.tclIsRecyclable = payload
        },
        TCL_SAVE_RPMDATA: (state, payload) => {
            state.tclRPMData = payload
        }
    },
    actions: {

    }
}
  
export default tclData
  