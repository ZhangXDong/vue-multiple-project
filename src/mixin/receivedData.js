import { mapMutations, mapGetters } from 'vuex'

const receivedData = {
    computed: {
        ...mapGetters([
            'robotInfo',
            'followInfo',
            'chargingInfo',
            'robotLastState', // 机器人上一个状态
            'footerBtns', // 底部按钮
            'jackUpPercent', //  顶升百分比
            'jackUpStatus', // 顶升状态
            // public business
            'stationInfo', // 停靠点信息
            'gatherOrder', // 集合单信息
        ])
    },
    methods: {
        ...mapMutations({
            saveFooterBtns: 'FOOTER_BTNS', // 底部按钮
            saveStartNormal: 'FTA_SAVE_STARTNORMAL', // 开机loading
            saveRobotInfo: 'FTA_SAVE_ROBOTINFO', // 机器人信息
            savePositionSuccess: 'FTA_SAVE_POSITIONSUCCESS', // 是否定位成功
            saveRobotForcosState: 'FTA_SAVE_ROBOTFORCOSSTATE', // 机器人Frocos状态
            saveFollowDisabled: 'FTA_SAVE_FOLLOWDISABLED', // 跟随按钮是否可用
            saveRobotLastState: 'FTA_SAVE_ROBOTLASTSTATE', // 机器人上一个状态
            saveReconnectPrompt: 'FTA_SAVE_RECONNECTPROMPT', // 是否连接系统
            saveConfiguration: 'FTA_SAVE_CONFIGURATION', // 弹窗提示
            savePriorityStatus: 'FTA_SAVE_PRIORITYSTATUS', // 优先级
            saveFollowModuleAvailable: 'FTA_SAVE_FOLLOWMODULEAVAILABLE', // 跟随按钮是否显示
            saveRobotStatus: 'FTA_SAVE_ROBOTSTATUS', // 机器人状态
            saveFollowInfo: 'FTA_SAVE_FOLLOWINFO', // 跟随下的状态
            saveChargingInfo: 'FTA_SAVE_CHARGINGINFO', // 充电下的状态
            saveWorkingMode: 'FTA_SAVE_WORKINGMODE', // 工作模式
            saveWorkingStatus: 'FTA_SAVE_WORKINGSTATUS', // 工作状态
            saveFTAVersion: 'FTA_SAVE_VERSIONMSG',
            saveJackUpPercent: 'JACKUP_PERCENT',  // 设置顶升百分比
            saveJackUpStatus: 'JACKUP_STATUS', // 设置顶升状态
            saveShowJackUp: 'SHOW_JACKUP', // 设置展示顶升操作弹窗
            saveShowJackUpWork: 'SHOW_JACKUP_WORK', // 设置展示顶升工作中弹窗
            // public business
            saveGatherOrder: 'GATHER_ORDER',
            saveStationInfo: 'STATION_INFO'
        }),
        handleInfo(data){
            const information = data.data
            if (data.pack_type && data.pack_type != 4 && data.pack_type != 17 && data.pack_type != 2 && data.pack_type != 28) {
                console.log('接收到的数据', data)
            }
            switch (data.pack_type) {
                // 是否连接成功
                case 1:
                    this.saveStartNormal(true)
                    break;
                // WIFI信号强度消息
                case 2:
                    this.saveRobotInfo({
                        ...this.robotInfo, 
                        wifiSignalStrength: information.wifiSignalStrength
                    })
                    break;
                // 机器人基本信息
                case 3:
                    this.saveRobotInfo({
                        ...this.robotInfo, 
                        ...information.robotInfo
                    })
                    break;
                // 电量
                case 4:
                    this.saveRobotInfo({
                        ...this.robotInfo, 
                        robotBattery: information.robotBattery
                    })
                    break;
                // 停靠点信息
                case 10:
                    this.saveStationInfo(information)
                    break; 
                // 集合单信息
                case 11:
                    this.saveGatherOrder(information.orderSets)
                    break;
                // 定位成功
                case 17:
                    this.savePositionSuccess(information.positioned)
                    break;
                case 20:
                    this.saveRobotForcosState(information)
                    information.robotForcosState === 'Estp' || information.robotForcosState === 'Error' ?
                    this.saveFollowDisabled(true) : this.saveFollowDisabled(false)
                    break;
                // 机器人上一个状态 !!! ???
                case 22:
                    this.saveRobotLastState((({robotBaseStatus, robotLogicStatus}) => ({robotBaseStatus, robotLogicStatus}))(information))
                    break;
                // 开始重连调度系统
                case 23:
                    this.saveReconnectPrompt(false)
                    break;
                // 重连调度系统成功
                case 24:
                    this.saveReconnectPrompt(true)
                    break;
                // 增加蒙板提示
                case 25:
                    this.saveConfiguration({
                        ...this.configuration,
                        msg: information.content,
                        statusCode: '',
                        isWarning: true,
                        btn: '确 定',
                        dialogVisible: true,
                    })
                    break;
                // 关闭蒙版提示
                case 26:
                    this.saveConfiguration({
                        ...this.configuration,
                        statusCode: '',
                        dialogVisible: false
                    })
                    break;
                // 消息提示
                case 27:
                    this.$notify({
                        title: '警告',
                        message: `${information.content}`,
                        type: 'warning'
                    });
                    break;
                // 优先级
                case 28:
                    this.savePriorityStatus({
                        ...this.priorityStatus,
                        status: information.priority
                    })
                    break;
                // 跟随按钮是否可用
                case 29:
                    this.saveFollowModuleAvailable(information.followModuleAvailable)
                    break;
                // FTA version
                case 35:
                    this.saveFTAVersion(information.versionNumber)
                    break;
                // 弹窗提示
                case 36:
                    this.saveConfiguration({
                        ...this.configuration,
                        statusCode: '',
                        msg: information.promptContent,
                        isWarning: false,
                        btn: information.btnContent,
                        dialogVisible: true,
                    })
                    break;
                // 顶升 进度
                case 45:
                    this.saveJackUpPercent(information.percent)
                    break;
                // 展示 顶升 工作中
                case 47:
                    this.saveShowJackUpWork(true)
                    break;
                // 顶升 停止工作
                case 48:
                    this.saveShowJackUpWork(false)
                    this.saveShowJackUp(false)
                    break;
                // 结束任务(清任务)
                case 49:
                    let orderSets = {
                        orderSetList: [{}],
                        type: this.gatherOrder.type
                    }
                    this.saveGatherOrder(orderSets)
                    break;
                // 顶升 状态 0-最顶 1-最下 2-中间
                case 51:
                    console.log(information.status, '顶升状态');
                    this.saveJackUpStatus(information.status)
                    if (information.status === 0 || information.status === 1) { // 0-最顶 1-最低
                        console.log(information.status, '顶升已升起或下降');
                        this.saveShowJackUpWork(false)
                        this.saveShowJackUp(false)
                    }
                    break;
                // 充电区域
                case 101: 
                    this.saveChargingInfo((({stationName}) => ({stationName}))(information))
                    break;
                case 6:
                    this.saveRobotStatus((({robotBaseStatus, robotLogicStatus}) => ({robotBaseStatus, robotLogicStatus}))(information))
                    // 导航状态下跟随不可用
                    if(information.robotBaseStatus === 1) {
                        this.saveFollowDisabled(true)
                    }
                    // 跟随识别中
                    if(information.robotBaseStatus === 7) {
                        this.$router.replace({path: '/followIdentify'})
                    }
                    // 跟随中状态
                    else if(information.robotBaseStatus === 2) {
                        /*
                        * 跟随中状态
                        * */
                        this.saveFollowInfo({
                            ...this.followInfo,
                            vehicleState: require('@images/vehicleState/follow.png'),
                            statusIndicators: '正在跟随中',
                            actionButtons: [{
                                title:'暂停跟随',
                                type: 12,
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
                        })
                        this.saveRobotLastState({
                            ...this.robotLastState,
                            robotBaseStatus: 2
                        })
                        if(this.$route.path != '/following') {
                            this.$router.replace({path: '/following'})
                        }
                    }
                    // 上一步为跟随
                    else if(information.robotBaseStatus === 3 && this.robotLastState && this.robotLastState.robotBaseStatus === 2) {
                        /*
                            * 上一步为跟随
                            * 跟随暂停状态
                            * */
                        this.saveFollowInfo({
                            ...this.followInfo,
                            vehicleState: require('@images/vehicleState/pause.png'),
                            statusIndicators: '跟随暂停',
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
                        })

                        this.saveRobotLastState({
                            ...this.robotLastState,
                            robotBaseStatus: 0
                        })
                        if(this.$route.path != '/following') {
                            this.$router.replace({path: '/following'})
                        }
                    }
                    else {
                        // 判断工作模式
                        this.gatherOrder && this.gatherOrder.type === 2 ? this.saveWorkingMode('人工调度') : this.saveWorkingMode('系统调度')
                        if(information.robotLogicStatus === 59) {
                            this.charge(information)
                            return 
                        }
                        /********* 业务 *********/ 
                        /*
                        * enum RobotBaseStatus {
                                IDLE = 0; // 空闲
                                NAVIGATING = 1; // 导航
                                FOLLOWING = 2; // 跟随
                                PAUSE = 3; // 暂停
                                WAITING = 4; // 等待中
                                WORKING = 5; // 工作中
                                ERROR = 6; // 错误
                                FOLLOW_IDENTIFYING = 7; // 跟随识别中
                            }
                            enum RobotLogicStatus {
                                LOGIC_INIT = 0; // 初始化状态
                                MANUAL = 1; // 手动模式
                                DISPATCH_IDLE = 2; // 调度空闲中
                                DISPATCH_PICKING = 3; // 拣货中
                                DISPATCH_PACKING = 4; // 打包中
                                WAITING_ON_TEMP_STATION = 5; // 在临时停靠点等待
                                DISPATCH_JI_BING_QU = 6; // 去集并区卸货
                                DISPATCH_READY_FOR_TASK = 7; // 接收到任务的准备状态
                                DISPATCH_TING_CHE_QU = 8; // 去停车区
                                ELEVATOR_DOOR = 9; // 去电梯口
                                INTO_ELEVATOR = 10; // 进入电梯
                                OUT_OF_ELEVATOR = 11; // 离开电梯
                                COMMON_ROOM = 12; // 普通房间
                                CHARGING = 13; //充电
                                CHARGING_WORKFLOW  = 59; //充电
                                100: ready
                            }
                        * */
                       this.switchPageByUrl(information)
                    }
                    break;
                default:
                    break;  
            }
        },
        switchPageByUrl(information){
            const curUrl = information.url || ''
            // 准备 ready
            if (information.robotBaseStatus === 0 && information.robotLogicStatus === 100) {
                // 准备-开始工作
                this.saveFooterBtns([])
                this.saveWorkingStatus('准备开始工作')
                if (this.$route.path !== '/ready') {
                    this.$router.replace({ path: '/ready' })
                }
            }
            // 空闲（有交互）
            if (information.robotBaseStatus === 0 && information.robotLogicStatus === 2) {
                console.log('机器人基本信息', this.robotInfo);
                // 系统调度 RPM 空闲页需要展示【停止工作】按钮  this.workingMode == '系统调度'  （暂不用该方式进行判断）
                // 根据项目确认是否展示【停止工作】按钮
                // 欣旺达垃圾清运展示，欣旺达物料搬运不展示
                // 注意：后端的工作模式和前端之前定义的工作模式不同，后端的工作模式是用来区分项目的，比如欣旺达的垃圾清运和物料搬运两种工作模式。前端的工作模式指系统调度，单机调度。
                this.saveFooterBtns([])
                this.saveWorkingStatus('空闲')
                let hasButtonWorkMode = ['100101'] // 欣旺达尾料搬运
                let hasJackUpWorkMode = ['100102', 'tcl'] // 欣旺达物料搬运、TCL
                let curWorkMode = this.robotInfo.mainWorkingMode || ''
                // 有停止工作按钮
                if (hasButtonWorkMode.includes(curWorkMode)) {
                    if (this.$route.path !== '/stopWorkHome') {
                        this.$router.replace({ path: '/stopWorkHome' })
                    }
                // 有操作顶升
                } else if (hasJackUpWorkMode.includes(curWorkMode)) {
                    if (this.$route.path !== '/jackUpHome') {
                        this.$router.replace({ path: '/jackUpHome' })
                    }
                // 空闲
                } else {
                    if (this.$route.path !== '/home') {
                        this.$router.replace({ path: '/home' })
                    }
                }
            }
            
            // 导航
            // 导航 公用 -任务号展示为条形码
            if (curUrl && curUrl.indexOf('/barcodeNavigate') > -1) { // /barcodeNavigate?baseStatus=1&logicStatus=3
                this.barcodeNavigate(information)
            }
            // 导航 公用 - 任务号字符串展示
            if (curUrl && curUrl.indexOf('/commonNavigate') > -1) { // /commonNavigate?baseStatus=1&logicStatus=3
                this.commonNavigate(information)
            }
            // 导航 公用 - 任务号字符串展示 可以操作顶升
            if (curUrl && curUrl.indexOf('/jackUpCommonNavigate') > -1) { // /jackUpCommonNavigate?baseStatus=1&logicStatus=3
                this.jackUpCommonNavigate(information)
            }

            /******业务 逻辑******/
            if (process.env.ENV_NAME.indexOf('harley') > -1) {
                return this.harleyHandleInfo(information)
            }
            if (process.env.ENV_NAME.indexOf('tcl') > -1
                || process.env.ENV_NAME.indexOf('wenlong') > -1 
                || process.env.ENV_NAME.indexOf('hongyu') > -1
                || process.env.ENV_NAME.indexOf('sunzhui') > -1) {
                this.tclProductRecovery(information)
                this.tclMaterialDelivery(information)
                return false
            }
            if (process.env.ENV_NAME.indexOf('sunwoda') > -1 
                || process.env.ENV_NAME.indexOf('xinwangda') > -1 
                || process.env.ENV_NAME.indexOf('wenlong') > -1 
                || process.env.ENV_NAME.indexOf('hongyu') > -1
                || process.env.ENV_NAME.indexOf('sunzhui') > -1) {
                this.sunwodaGarbageCarry(information)
                this.sunwodaMaterialCarry(information)
                return false
            }
            
        },
        // 自动回充状态
        charge(information) {
            // 充电状态
            if(information.robotBaseStatus === 1) {
                // 导航去充电
                this.saveChargingInfo({
                    ...this.chargingInfo,
                    workingCondition: '准备充电中',
                    baseStatus: '正在前往',
                    actionButtons: [{
                        title: '到达',
                        disable: false,
                        hasBgColor: true,
                        type: 15,
                        bgColor: '#2E9B24'
                    },{
                        title: '暂停',
                        disable: false,
                        hasBgColor: true,
                        type: 12,
                        bgColor: '#3F50B5'
                    }]
                })
            }else if(information.robotBaseStatus === 3) {
                // 暂停中
                this.saveChargingInfo({
                    ...this.chargingInfo,
                    workingCondition: '准备充电中',
                    baseStatus: '暂停中',
                    actionButtons: [{
                        title: '到达',
                        disable: false,
                        hasBgColor: true,
                        type: 15,
                        bgColor: '#2E9B24'
                    },{
                        title: '继续',
                        disable: false,
                        hasBgColor: true,
                        type: 13,
                        bgColor: '#3F50B5'
                    }]
                })
            }else if(information.robotBaseStatus === 4) {
                // 等待插入插头
                this.saveChargingInfo({
                    workingCondition: '未充电',
                    stationName: '',
                    baseStatus: '',
                    actionButtons: [{
                        title: '结束',
                        disable: false,
                        hasBgColor: true,
                        type: 15,
                        bgColor: '#3F50B5'
                    }]
                })
            }else if(information.robotBaseStatus === 5) {
                // 充电中
                this.saveChargingInfo({
                    workingCondition: '正在充电中',
                    stationName: '',
                    baseStatus: '',
                    actionButtons: [{
                        title: '结束充电',
                        disable: false,
                        type: 51,
                        hasBgColor: true,
                        bgColor: '#3F50B5'
                    }]
                })
            }
            if(this.$route.path !== '/charging') {
                this.$router.push({path: '/charging'})
            }
        }
    }
}

export default receivedData
