
import { mapMutations, mapGetters } from 'vuex'

const tclProductRecoveryMixin = {
    computed: {
        ...mapGetters([
            // sunwoda
            'tclSchedulingInfo',
            'tclGuideTip',
            'isRecyclable'
        ])
    },
    methods: {
        ...mapMutations({
            // sunwoda
            saveTclSchedulingInfo: 'TCL_SAVE_SCHEDULINGINFO',
            saveTclGuideTip: 'TCL_SAVE_GUIDETIP',
            saveWorkingStatus: 'FTA_SAVE_WORKINGSTATUS',
            saveFooterBtns: 'FOOTER_BTNS'
        }),
        tclProductRecovery (information) {
            let curUrl = information.url || ''
            // 1.开始工作准备页面 /ready?baseStatus=0&logicStatus=10
            // 2.未获取到调度任务(空闲) /home?baseStatus=0&logicStatus=2
            // 3.获取到调度任务(任务) /sunwodaGarbageCarry/task?baseStatus=0&logicStatus=7
            // 4.导航去某个点 /commonNavigate?baseStatus=1&logicStatus=3
            // 5.到达装货点 /sunwodaGarbageCarry/loadPoint?baseStatus=5&logicStatus=3
            // 6.到达卸货点 /sunwodaGarbageCarry/unloadPoint?baseStatus=5&logicStatus=15
        
            // 准备开始出发
            // if (curUrl && curUrl.indexOf('/sunwodaGarbageCarry/task?baseStatus=0&logicStatus=7') > -1) {
            if (information.robotBaseStatus === 0 && information.robotLogicStatus === 7) {
                this.saveTclGuideTip(`请装<strong>4个空桶</strong>上车`)
                this.saveFooterBtns([{
                    title: '出 发',
                    disable: false,
                    type: 44,
                    hasBgColor: true
                }])
                if (this.$route.path !== '/tclProductRecovery/task') {
                    this.$router.replace({ path: '/tclProductRecovery/task' })
                }
            }
            // 到达装尾料点
            if (curUrl && curUrl.indexOf('/tclProductRecovery/loadPoint') > -1) { // ?baseStatus=5&logicStatus=3
                this.saveTclGuideTip(`请拿下空桶，放上尾料`)
                this.saveFooterBtns([{
                    title: '装车完成（车未满）',
                    disable: false,
                    type: 43,
                    hasBgColor: true
                }, {
                    title: '装车完成（车已满）',
                    disable: false,
                    type: 39,
                    hasBgColor: true,
                    bgColor: 'red'
                }])
                this.saveTclSchedulingInfo({
                    ...this.tclSchedulingInfo,
                    workingCondition: '当前到达',
                    isNavigate: 3,
                    currentOrder: {
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        stationName: this.stationInfo.externalStationName || this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName || '装尾料点'
                    }
                })
                this.saveWorkingStatus('到达装尾料点')
                if (this.$route.path !== '/tclProductRecovery/loadPoint') {
                    this.$router.replace({ path: '/tclProductRecovery/loadPoint' })
                }
            }
            // 到达尾料回收点---等待卸货
            if (curUrl && curUrl.indexOf('/tclProductRecovery/unloadPoint') > -1) { // ?baseStatus=5&logicStatus=15
                this.saveTclGuideTip(`请将尾料桶卸车并装<strong>4个空桶</strong>上车`)
                this.saveFooterBtns([{
                    title: '卸车完成',
                    disable: false,
                    type: 40,
                    hasBgColor: true
                },
                {
                    title: '停止工作',
                    disable: false,
                    type: 42,
                    hasBgColor: false
                }])
                this.saveTclSchedulingInfo({
                    ...this.tclSchedulingInfo,
                    workingCondition: '当前到达',
                    isNavigate: 3,
                    currentOrder: {
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        stationName: this.stationInfo.externalStationName || this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName || '尾料回收点'
                    }
                })
                this.saveWorkingStatus('到达尾料回收点')
                if (this.$route.path !== '/tclProductRecovery/unloadPoint') {
                    this.$router.replace({ path: '/tclProductRecovery/unloadPoint' })
                }
            }
        }
    }
}

export default tclProductRecoveryMixin
