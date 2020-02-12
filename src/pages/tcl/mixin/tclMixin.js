
import { mapMutations, mapGetters } from 'vuex'

const tclMixin = {
    computed: {
        ...mapGetters([
            // Tcl
            'tclSchedulingInfo',
            'tclGuideTip',
            'isRecyclable'
        ])
    },
    methods: {
        ...mapMutations({
            // Tcl
            saveTclSchedulingInfo: 'TCL_SAVE_SCHEDULINGINFO',
            saveTclGuideTip: 'TCL_SAVE_GUIDETIP',
            saveWorkingStatus: 'FTA_SAVE_WORKINGSTATUS',
            saveFooterBtns: 'FOOTER_BTNS'
        }),
        tclMaterialDelivery (information) {
            let curUrl = information.url || ''
            // 2.未获取到调度任务(空闲) /jackUpHome?baseStatus=0&logicStatus=2
            // 3.获取到调度任务，导航去上料点 /jackUpCommonNavigate?baseStatus=1&logicStatus=3
            // 4.准备出发 /tclScene/task?baseStatus=0&logicStatus=7

            // 5.到达上料点A /tclScene/loadPointA?baseStatus=5&logicStatus=
            // 6.到达上料点B /tclScene/loadPointB?baseStatus=5&logicStatus=

            // 7.到达卸料点A /tclScene/unloadPointA?baseStatus=5&logicStatus=
            // 8.到达卸料点B /tclScene/unloadPointB?baseStatus=5&logicStatus=

            // 9.回到成品仓库-卸车-任务完成 /tclScene/waitDump
        
            // 准备开始出发
            if (information.robotBaseStatus === 0 && information.robotLogicStatus === 7) { // ?baseStatus=5&logicStatus=3 
                this.saveTclGuideTip(`请将指定货架推入车辆背驼位置`)
                this.saveFooterBtns([{
                    title: '出 发',
                    disable: false,
                    type: 43,
                    hasBgColor: true
                }])
                this.saveTclSchedulingInfo({
                    ...this.tclSchedulingInfo,
                    workingCondition: '当前到达',
                    isNavigate: -1,
                    currentOrder: {
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                    }
                })
                this.saveWorkingStatus('到达上料点')
                if (this.$route.path !== '/tclScene/task') {
                    this.$router.replace({ path: '/tclScene/task' })
                }
            }
            // 到达上料点 -A型货架
            if (curUrl && curUrl.indexOf('/tclScene/loadPointA') > -1) { // ?baseStatus=5&logicStatus=3 
                this.saveTclGuideTip(`请将指定货架推入车辆背驼位置`)
                this.saveFooterBtns([{
                    title: '物料退回',
                    identify: 'materialBack',
                    disable: false,
                    type: 43,
                    txtBorderColor: '#e51c23'
                }, {
                    title: '物料接收',
                    identify: 'materialReceive',
                    disable: false,
                    type: 43,
                    hasBgColor: true
                }])
                this.saveTclSchedulingInfo({
                    ...this.tclSchedulingInfo,
                    workingCondition: '当前到达',
                    isNavigate: -1,
                    currentOrder: {
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                    }
                })
                this.saveWorkingStatus('到达上料点A')
                if (this.$route.path !== '/tclScene/loadPointA') {
                    this.$router.replace({ path: '/tclScene/loadPointA' })
                }
            }
            // 到达上料点 -B型货架
            if (curUrl && curUrl.indexOf('/tclScene/loadPointB') > -1) { // ?baseStatus=5&logicStatus=3
                this.saveTclGuideTip(`请装载SMT物料`)
                this.saveFooterBtns([{
                    title: '操作完成',
                    disable: false,
                    type: 43,
                    hasBgColor: true
                }])
                this.saveTclSchedulingInfo({
                    ...this.tclSchedulingInfo,
                    workingCondition: '当前到达',
                    isNavigate: -1,
                    currentOrder: {
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                    }
                })
                this.saveWorkingStatus('到达卸料点B')
                if (this.$route.path !== '/tclScene/loadPointB') {
                    this.$router.replace({ path: '/tclScene/loadPointB' })
                }
            }
            // 到达卸料点 -A型货架
            if (curUrl && curUrl.indexOf('/tclScene/unloadPointA') > -1) { // ?baseStatus=5&logicStatus=3 
                this.saveTclGuideTip(`请将指定货架推入车辆背驼位置`)
                this.saveFooterBtns([{
                    title: '物料退回',
                    identify: 'materialBack',
                    disable: false,
                    type: 43,
                    txtBorderColor: '#e51c23'
                }, {
                    title: '物料接收',
                    identify: 'materialReceive',
                    disable: false,
                    type: 43,
                    hasBgColor: true
                }])
                this.saveTclSchedulingInfo({
                    ...this.tclSchedulingInfo,
                    workingCondition: '当前到达',
                    isNavigate: -1,
                    currentOrder: {
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                    }
                })
                this.saveWorkingStatus('到达卸料点A')
                if (this.$route.path !== '/tclScene/unloadPointA') {
                    this.$router.replace({ path: '/tclScene/unloadPointA' })
                }
            }
            // 到达卸料点 -B型货架
            if (curUrl && curUrl.indexOf('/tclScene/unloadPointB') > -1) { // ?baseStatus=5&logicStatus=3
                this.saveTclGuideTip(`请取下指定物料`)
                this.saveFooterBtns([{
                    title: '物料退回',
                    identify: 'materialBack',
                    disable: false,
                    type: 43,
                    txtBorderColor: '#e51c23'
                }, {
                    title: '物料接收',
                    identify: 'materialReceive',
                    disable: false,
                    type: 43,
                    hasBgColor: true
                }])
                this.saveTclSchedulingInfo({
                    ...this.tclSchedulingInfo,
                    workingCondition: '当前到达',
                    isNavigate: -1,
                    currentOrder: {
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                    }
                })
                this.saveWorkingStatus('到达卸料点B')
                if (this.$route.path !== '/tclScene/unloadPointB') {
                    this.$router.replace({ path: '/tclScene/unloadPointB' })
                }
            }
            // 到达退回物料卸料点（上料点）
            if (curUrl && curUrl.indexOf('/tclScene/waitDump') > -1) { // ?baseStatus=5&logicStatus=3
                this.saveTclGuideTip(`请将货架推离车辆`)
                this.saveFooterBtns([{
                    title: '任务完成',
                    disable: false,
                    type: 43,
                    hasBgColor: true
                }])
                this.saveTclSchedulingInfo({
                    ...this.tclSchedulingInfo,
                    workingCondition: '当前到达',
                    isNavigate: -1,
                    currentOrder: {
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                    }
                })
                this.saveWorkingStatus('到达成品仓')
                if (this.$route.path !== '/tclScene/waitDump') {
                    this.$router.replace({ path: '/tclScene/waitDump' })
                }
            }
        }
    }
}

export default tclMixin
