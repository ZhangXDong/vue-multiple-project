import { mapMutations, mapGetters } from 'vuex'

const jackUpCommonNavigateMixin = {
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
        jackUpCommonNavigate(information) {
            console.log('jackUpCommonNavigate');
            // 导航中
            if (information.robotBaseStatus === 1) {
                this.saveWorkingStatus('导航中')
                // 导航去储位中
                if (information.robotLogicStatus === 3) { 
                    this.saveScheduleGuideTip(`正在前往目标位置`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                        isNavigate: 2
                    })
                    this.saveFooterBtns([{
                        title: '暂停',
                        disable: false,
                        type: 12
                    }, {
                        title: '提前到达',
                        disable: false,
                        type: 15
                    }])
                }
                // 导航去集并区中
                if (information.robotLogicStatus === 6) { 
                    this.saveScheduleGuideTip(`正在前往集并区，请跟着我走！`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: '集并区',
                        isNavigate: 4,
                    })
                    this.saveFooterBtns([{
                        title: '暂停',
                        disable: false,
                        type: 12
                    }, {
                        title: '提前到达',
                        disable: false,
                        type: 15
                    }])
                }
                // 导航去停车区中
                if (information.robotLogicStatus === 8) { 
                    this.saveScheduleGuideTip(`正在前往停车区，请跟着我走！`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: '停车区',
                        isNavigate: 5,
                    })
                    this.saveFooterBtns([{
                        title: '暂停',
                        disable: false,
                        type: 12
                    }, {
                        title: '提前到达',
                        disable: false,
                        type: 15
                    }])
                }
                // 导航去电梯排队点（docking等待区）
                if (information.robotLogicStatus === 13) { 
                    this.saveScheduleGuideTip(`正在前往电梯排队点`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '电梯排队点',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '暂停',
                        disable: false,
                        type: 12
                    }, {
                        title: '提前到达',
                        disable: false,
                        type: 15
                    }])
                }
                // 导航去电梯口（docking起始区）
                if (information.robotLogicStatus === 9) { 
                    this.saveScheduleGuideTip(`正在前往电梯口`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '电梯口',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '暂停',
                        disable: false,
                        type: 12
                    }, {
                        title: '提前到达',
                        disable: false,
                        type: 15
                    }])
                }
                // 导航进电梯（docking过渡区）
                if (information.robotLogicStatus === 10) { 
                    this.saveScheduleGuideTip(`正在驶入电梯，请注意安全！`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '电梯',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '暂停',
                        disable: false,
                        type: 12
                    }, {
                        title: '提前到达',
                        disable: false,
                        type: 15
                    }])
                }
                // 导航出电梯前往电梯口（docking终止区）
                if (information.robotLogicStatus === 11) { 
                    this.saveScheduleGuideTip(`正在驶出电梯，请注意安全！`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '电梯口',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '暂停',
                        disable: false,
                        type: 12
                    }, {
                        title: '提前到达',
                        disable: false,
                        type: 15
                    }])
                }
                // 导航去尾料回收点
                if (information.robotLogicStatus === 15) {
                    this.saveScheduleGuideTip(`正在前往尾料回收点`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '尾料回收点',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '暂停',
                        disable: false,
                        type: 12
                    }, {
                        title: '提前到达',
                        disable: false,
                        type: 15
                    }])
                }
                // 导航去上料点
                if (information.robotLogicStatus === 21) {
                    this.saveScheduleGuideTip(`正在前往上料点排队区`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '上料点排队区',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '暂停',
                        disable: false,
                        type: 12
                    }, {
                        title: '提前到达',
                        disable: false,
                        type: 15
                    }])
                }
            }
            // 导航-暂停
            if (information.robotBaseStatus === 3) {
                this.saveScheduleGuideTip(`机器人处于暂停状态`)
                this.saveWorkingStatus('暂停中')
                // 导航去储位暂停中
                if (information.robotLogicStatus === 3) {
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                        isNavigate: 2
                    })
                    this.saveFooterBtns([{
                        title: '继续',
                        disable: false,
                        type: 13
                    }, {
                        title: '提前到达',
                        disable: true,
                        type: 15
                    }])
                }
                // 导航去集并区暂停中
                if (information.robotLogicStatus === 6) { 
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: '集并区',
                        isNavigate: 4
                    })
                    this.saveFooterBtns([{
                        title: '继续',
                        disable: false,
                        type: 13
                    }, {
                        title: '提前到达',
                        disable: true,
                        type: 15
                    }])
                }
                // 导航去停车区暂停中
                if (information.robotLogicStatus === 8) { 
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: '停车区',
                        isNavigate: 5
                    })
                    this.saveFooterBtns([{
                        title: '继续',
                        disable: false,
                        type: 13
                    }, {
                        title: '提前到达',
                        disable: true,
                        type: 15
                    }])
                }
                // 导航去电梯排队点暂停中
                if (information.robotLogicStatus === 13) { 
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '电梯排队点',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '继续',
                        disable: false,
                        type: 13
                    }, {
                        title: '提前到达',
                        disable: true,
                        type: 15
                    }])
                }
                // 导航去电梯口暂停中
                if (information.robotLogicStatus === 9) { 
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '电梯口',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '继续',
                        disable: false,
                        type: 13
                    }, {
                        title: '提前到达',
                        disable: true,
                        type: 15
                    }])
                }
                // 导航进电梯暂停中
                if (information.robotLogicStatus === 10) { 
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '电梯',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '继续',
                        disable: false,
                        type: 13
                    }, {
                        title: '提前到达',
                        disable: true,
                        type: 15
                    }])
                }
                // 导航出电梯前往电梯口暂停中
                if (information.robotLogicStatus === 11) { 
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '电梯口',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '继续',
                        disable: false,
                        type: 13
                    }, {
                        title: '提前到达',
                        disable: true,
                        type: 15
                    }])
                }
                // 导航去尾料回收点暂停中
                if (information.robotLogicStatus === 15) {
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '尾料回收点',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '继续',
                        disable: false,
                        type: 13
                    }, {
                        title: '提前到达',
                        disable: true,
                        type: 15
                    }])
                }
                // 导航去上料点排队区暂停中
                if (information.robotLogicStatus === 21) {
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '正在前往',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '上料点排队区',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([{
                        title: '继续',
                        disable: false,
                        type: 13
                    }, {
                        title: '提前到达',
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
                    this.saveScheduleGuideTip(`到达目标位置`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '当前到达',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || this.gatherOrder.orderSetList[0].orderList[this.stationInfo.index].stationName,
                        isNavigate: 3
                    })
                    this.saveFooterBtns([])
                }
                // 到达集并区
                if (information.robotLogicStatus === 6) { 
                    this.saveScheduleGuideTip(`到达集并区`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '当前到达',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: '集并区',
                        isNavigate: 4
                    })
                    this.saveFooterBtns([{
                        title: '卸车完成',
                        disable: false,
                        type: 33,
                        hasBgColor: true
                    }])
                }
                // 到达停车区
                if (information.robotLogicStatus === 8) { 
                    this.saveScheduleGuideTip(`到达停车区`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '当前到达',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: '停车区',
                        isNavigate: 5
                    })
                    this.saveFooterBtns([])
                }
                // 到达去电梯排队点
                if (information.robotLogicStatus === 13) { 
                    this.saveScheduleGuideTip(`电梯排队中`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '当前到达',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '电梯排队点',
                        isNavigate: 6
                    })
                    this.saveFooterBtns([])
                }
                // 到达电梯口
                if (information.robotLogicStatus === 9) { 
                    let floor = this.scheduleCurrentOrder.floorInfo
                    // 如果有floor楼层信息，表示手动进出电梯，否则自动进出电梯。
                    if (floor) {
                        this.saveScheduleGuideTip(`我要去<strong>${floor}</strong>楼，请帮我按下电梯`)
                        this.saveFooterBtns([{
                            title: '进电梯',
                            disable: false,
                            type: 40,
                            hasBgColor: true
                        }])
                    } else {
                        this.saveScheduleGuideTip(`等待驶入电梯`)
                        this.saveFooterBtns([])
                    }
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '当前到达',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '电梯口',
                        isNavigate: -1
                    })
                }
                // 进电梯-到达电梯
                if (information.robotLogicStatus === 10) { 
                    let floor = this.scheduleCurrentOrder.floorInfo
                    // 如果有floor楼层信息，表示手动进出电梯，否则自动进出电梯。
                    if (floor) {
                        this.saveScheduleGuideTip(`请帮我按下电梯<strong>${floor}</strong>楼`)
                        this.saveFooterBtns([{
                            title: '出电梯',
                            disable: false,
                            type: 41,
                            hasBgColor: true
                        }])
                    } else {
                        this.saveScheduleGuideTip(`等待驶出电梯`)
                        this.saveFooterBtns([])
                    }
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '当前到达',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName:this.stationInfo.externalStationName ||  this.stationInfo.stationName || '电梯',
                        isNavigate: -1
                    })
                }
                // 出电梯到达电梯口
                if (information.robotLogicStatus === 11) { 
                    this.saveScheduleGuideTip(`已驶出电梯，正在前往目标位置`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '当前到达',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.externalStationName ||  this.stationInfo.stationName || '电梯口',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([])
                }
                // 到达尾料回收点
                if (information.robotLogicStatus === 15) {
                    this.saveScheduleGuideTip(`到达尾料回收点`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '当前到达',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '尾料回收点',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([])
                }
                // 到达上料点排队区
                if (information.robotLogicStatus === 21) {
                    this.saveScheduleGuideTip(`到达上料点排队区`)
                    this.saveScheduleCurrentOrder({
                        ...this.scheduleCurrentOrder,
                        workingCondition: '当前到达',
                        taskId: this.gatherOrder && this.gatherOrder.orderSetList[0].taskId,
                        originalCode: this.gatherOrder && this.gatherOrder.orderSetList[0].originalCode,
                        taskNumber: this.gatherOrder && this.gatherOrder.orderSetList[0].name,
                        externalStationName: this.stationInfo.externalStationName || '',
                        stationName: this.stationInfo.stationName || '上料点排队区',
                        isNavigate: -1
                    })
                    this.saveFooterBtns([])
                }
            }
            if (this.$route.path !== '/jackUpCommonNavigate') {
                this.$router.replace({ path: '/jackUpCommonNavigate' })
            }
        }
    },
}

export default jackUpCommonNavigateMixin