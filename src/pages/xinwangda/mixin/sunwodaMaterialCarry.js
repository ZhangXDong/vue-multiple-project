
import { mapMutations, mapGetters } from 'vuex'

const sunwodaMaterialCarryMixin = {
    computed: {
        ...mapGetters([
            // sunwoda
            'sunwodaSchedulingInfo',
            'sunwodaGuideTip',
            'isRecyclable'
        ])
    },
    methods: {
        ...mapMutations({
            // sunwoda
            saveSunwodaSchedulingInfo: 'SUNWODA_SAVE_SCHEDULINGINFO',
            saveSunwodaGuideTip: 'SUNWODA_SAVE_GUIDETIP',
            saveSunwodaIsRecyclable: 'SUNWODA_SAVE_ISRECYCLABLE',
            saveWorkingStatus: 'FTA_SAVE_WORKINGSTATUS',
            saveFooterBtns: 'FOOTER_BTNS'
        }),
        sunwodaMaterialCarry (information) {
            let curUrl = information.url || ''
            // 2.未获取到调度任务(空闲) /home?baseStatus=0&logicStatus=2
            // 3.获取到调度任务，导航去上料点 /jackUpCommonNavigate?baseStatus=1&logicStatus=3
            // 4.导航到电梯排队点 /jackUpCommonNavigate?baseStatus=1&logicStatus=13
            // 5.导航到电梯口(docking起始点、docking终止点) /jackUpCommonNavigate?baseStatus=1&logicStatus=9
            // 6.导航进电梯 /jackUpCommonNavigate?baseStatus=1&logicStatus=10
            // 7.导航出电梯，前往电梯口 /jackUpCommonNavigate?baseStatus=1&logicStatus=11
            // 8.到达上料点 /sunwodaMaterialCarry/loadPoint?baseStatus=5&logicStatus=3
            // 9.到达卸料点 /sunwodaMaterialCarry/unloadPoint?baseStatus=5&logicStatus=15
            // 10.到达物料退回点（上料点）-卸车 /sunwodaMaterialCarry/waitDump
            // 11.最后一个下料点-返回2层 /sunwodaMaterialCarry/lastUnloadPoint
        
            // 梯控和导航的异常处理 
            // 
            //               不校验        |                           校验（不允许提前到达，需要弹窗提示）
            //                导航         |                          docking
            // 业务导航  |  docking等待区   |   docking起始点    |    docking过渡   |   docking终止点    （点位校验）
        
            // 导航  |  异常   |   自恢复    |    弹窗通知   |   人处理（可达、不可达）  |   任务流恢复
            // 提前到达：
            // 提前到达不能前端处理，因为需要人把车推到电梯指定点位后，点击提前到达
            
            // 1.出现异常弹窗提示
            // 2.是否可以提前到达
            // 3.请把我移动到某某位置
        
            // 到达上料点
            if (curUrl && curUrl.indexOf('/sunwodaMaterialCarry/loadPoint') > -1) { // ?baseStatus=5&logicStatus=3 
                this.saveSunwodaGuideTip(`请将指定货架推入车辆背驼位置`)
                this.saveFooterBtns([{
                    title: '出 发',
                    disable: false,
                    type: 43,
                    hasBgColor: true
                }])
                this.saveSunwodaSchedulingInfo({
                    ...this.sunwodaSchedulingInfo,
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
                if (this.$route.path !== '/sunwodaMaterialCarry/loadPoint') {
                    this.$router.replace({ path: '/sunwodaMaterialCarry/loadPoint' })
                }
            }
            // 到达卸料点
            if (curUrl && curUrl.indexOf('/sunwodaMaterialCarry/unloadPoint') > -1) { // ?baseStatus=5&logicStatus=3
                this.saveSunwodaGuideTip(`请取下指定物料`)
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
                this.saveSunwodaSchedulingInfo({
                    ...this.sunwodaSchedulingInfo,
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
                this.saveWorkingStatus('到达卸料点')
                if (this.$route.path !== '/sunwodaMaterialCarry/unloadPoint') {
                    this.$router.replace({ path: '/sunwodaMaterialCarry/unloadPoint' })
                }
            }
            // 到达最后一个卸料点
            if (curUrl && curUrl.indexOf('/sunwodaMaterialCarry/lastUnloadPoint') > -1) { // ?baseStatus=5&logicStatus=3
                this.saveSunwodaGuideTip(`请将一个空货架推上车`)
                this.saveFooterBtns([{
                    title: '返回2层',
                    disable: false,
                    type: 43,
                    hasBgColor: true
                }])
                this.saveSunwodaSchedulingInfo({
                    ...this.sunwodaSchedulingInfo,
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
                this.saveWorkingStatus('到达最后一个卸料点')
                if (this.$route.path !== '/sunwodaMaterialCarry/lastUnloadPoint') {
                    this.$router.replace({ path: '/sunwodaMaterialCarry/lastUnloadPoint' })
                }
            }
            // 到达退回物料卸料点（上料点）
            if (curUrl && curUrl.indexOf('/sunwodaMaterialCarry/waitDump') > -1) { // ?baseStatus=5&logicStatus=3
                this.saveSunwodaGuideTip(`请将被退回货架推离车辆`)
                this.saveFooterBtns([{
                    title: '卸车完成',
                    disable: false,
                    type: 43,
                    hasBgColor: true
                }])
                this.saveSunwodaSchedulingInfo({
                    ...this.sunwodaSchedulingInfo,
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
                this.saveWorkingStatus('到达最后一个卸料点')
                if (this.$route.path !== '/sunwodaMaterialCarry/waitDump') {
                    this.$router.replace({ path: '/sunwodaMaterialCarry/waitDump' })
                }
            }
        }
    }
}

export default sunwodaMaterialCarryMixin
