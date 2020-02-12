import { mapMutations, mapGetters } from 'vuex'

const barcodeNavigateMixin = {
    computed: {
        ...mapGetters([
            'scheduleCurrentOrder',
            'gatherOrder',
            'stationInfo'
        ]),
    },
    methods: {
        ...mapMutations({
            saveScheduleCurrentOrder: 'SCHEDULE_SAVE_CURRENTORDER',
            saveScheduleGuideTip: 'SCHEDULE_SAVE_GUIDETIP',
            saveWorkingStatus: 'FTA_SAVE_WORKINGSTATUS',
            saveFooterBtns: 'FOOTER_BTNS'
        }),
        barcodeNavigate(information) {
            // 导航中
            if (information.robotBaseStatus === 1) {
                this.saveWorkingStatus('导航中')
                // 导航去储位中
                if (information.robotLogicStatus === 3) { 
                    // this.saveScheduleGuideTip(`正在前往目标位置`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                        isNavigate: 2
                    })
                    this.saveFooterBtns([{
                        title: '暂停',
                        disable: false,
                        type: 12
                    }, {
                        title: '到达',
                        disable: false,
                        type: 15
                    }])
                }
            }
            // 导航-暂停
            if (information.robotBaseStatus === 3) {
                // this.saveScheduleGuideTip(`机器人处于暂停状态`)
                this.saveWorkingStatus('暂停中')
                // 导航去储位暂停中
                if (information.robotLogicStatus === 3) {
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                        isNavigate: 2
                    })
                    this.saveFooterBtns([{
                        title: '继续',
                        disable: false,
                        type: 13
                    }, {
                        title: '到达',
                        disable: true,
                        type: 15
                    }])
                }
            }
            // 导航-到达
            if (information.robotBaseStatus === 5) {
                this.saveWorkingStatus('到达')
                // 到达储位
                if (information.robotLogicStatus === 3) { 
                    // this.saveScheduleGuideTip(`到达目标位置`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '当前到达',
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                        isNavigate: 3
                    })
                    this.saveFooterBtns([])
                }
            }
            if (this.$route.path !== '/barcodeNavigate') {
                this.$router.replace({ path: '/barcodeNavigate' })
            }
        }
    }
}
export default barcodeNavigateMixin