<template>
    <div class="ld-tcl-task">
        <div class="main">
            <!-- 正在前往位置 -->
            <div class="target">{{workingCondition}}<span>{{stationName}}</span></div>
            <!-- 强调内容 如：货架号-->
            <div class="highlight">
                <p v-show="highlightCon">{{highlightCon}}</p>
            </div>
            <!-- 指引提示文案 -->
            <div class="tips">
                <p v-html="tclGuideTip"></p>
            </div>
            <!-- 任务号 -->
            <div class="taskNo">
                <p v-show="originalCode">工单号：{{originalCode}}</p>
            </div>
        </div>
        <!-- 操作区 -->
        <footerBtn :footerBtns="footerBtns" :callback="handleBtn"></footerBtn>
        <!-- 操作顶升 -->
        <jackUpBtn :showJackUpBtn="true"></jackUpBtn>
    </div>
</template>

<script>
import footerBtn from '@/components/footerBtn.vue'
import jackUpBtn from '@/components/jackUpBtn.vue';
import { mapGetters, mapMutations } from 'vuex';
import { getCarryOrder } from '../../serve/tclMaterialDelivery.js'
export default {
    components: {
        jackUpBtn,
        footerBtn
    },
    data() {
        return {
            tableList: [],
            detailIdList: [], // RCS给的列表idlist
        }
    },
    computed: {
        ...mapGetters([
            'gatherOrder',
            'tclSchedulingInfo',
            'footerBtns',
            'tclGuideTip',
            'stationInfo', // detailIds
            'tclGetRPMData' // rpm data
        ]),
        // RCS给的获取列表数据的任务号
        businessOrderId() {
            return this.gatherOrder && this.gatherOrder.orderSetList[0].businessOrderId || ''
        },
        // 主单号
        taskId() {
            return this.tclSchedulingInfo.currentOrder.taskId
        },
        // 任务号
        taskNumber() {
            console.log('任务号:', this.tclSchedulingInfo.currentOrder.taskNumber);
            return this.tclSchedulingInfo.currentOrder.taskNumber
        },
        // 原单号（工单号）
        originalCode() {
            console.log('原单号:', this.tclSchedulingInfo.currentOrder.originalCode);
            return this.tclSchedulingInfo.currentOrder.originalCode
        },
        // 正在前往 / 暂停中
        workingCondition() {
            return this.tclSchedulingInfo.workingCondition
        },
        // 储位名称
        stationName() {
            let externalStationName = this.tclSchedulingInfo.currentOrder.externalStationName || ''
            return externalStationName + '(' + this.tclSchedulingInfo.currentOrder.stationName + ')'
        },
        // 强调内容 如：货架号
        highlightCon() {
            return this.gatherOrder && this.gatherOrder.orderSetList[0].customerCode || ''
        }
    },
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            vm.init()
        })
    },
    methods: {
        ...mapMutations({
            saveShowJackUp: 'SHOW_JACKUP',
            saveShowJackUpWork: 'SHOW_JACKUP_WORK',
            saveRPMData: 'TCL_SAVE_RPMDATA' // 保存rpm数据
        }),
        init() {
            // this.tableList = []
            this.saveRPMData(null)
            console.log('请求RPM接口，任务id：', this.businessOrderId);
            if (!this.businessOrderId) {
                this.timer = setTimeout(() => {
                    this.timer && clearTimeout(this.timer)
                    this.init()
                }, 200)
                return false
            }
            getCarryOrder({id: this.businessOrderId}).then((res) => {
                if (res.status.statusCode === 0) {
                    // let tableData = []
                    // 根据RPM提供的数据，抽取所有detail，组成一个数组
                    let RPMData = []
                    res.result.containerList.forEach((detailArr, detailArrIndex) => {
                        detailArr.detailList.forEach((item, index) => {
                            RPMData.push(item)
                        })
                    })
                    // 保存数据
                    setTimeout(() => {
                        this.saveRPMData(RPMData)
                    }, 200)

                    // 根据RCS提供的detailIdList，以及RPM的list，抽离id对应的list
                    console.log('RPMData:', RPMData);
                    // this.detailIdList = this.stationInfo.detailIdInfos || []
                    console.log('RCSDetailIdList:', this.detailIdList);
                    // this.detailIdList.length && this.detailIdList.forEach((item, index) => {
                    //     RPMData.forEach((curItem, curIndex) => {
                    //         if (item.businessOrderDetailId == curItem.id) {
                    //             curItem.taskId = item.id
                    //             tableData.push(curItem)
                    //         }
                    //     })
                    // })
                    // this.tableList = [...tableData]
                } else {
                    this.$message.error({
                        message: res.status.statusReason,
                        showClose: true
                    })
                }
            })
        },
        // 出发
        handleBtn(item) {
            // 入参-table
            this.detailIdList = this.stationInfo.detailIdInfos || []
            let reqTableData = []
            let reqObj = {}
            this.detailIdList.forEach((item, index) => {
                reqObj = {}
                reqObj.taskDetailId = item.id
                reqTableData.push(reqObj)
            })
            // 入参
            let reqData = {
                status: 1020,
                time: Date.now(),
                taskId: this.taskId,
                stationName: this.stationName,
                detailList: reqTableData
            }
            console.log('----入参---', reqData);
            this.$websocket.sendSock({pack_type:item.type, data: {isReceive: true, stationDealResult: reqData}})
        },
	}
}
</script>

<style lang="scss">
.ld-tcl-task {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 .05rem .05rem;
    color: #252525;
    background: #fff;
    .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        // background: yellow;
        .target {
            line-height: .2rem;
            text-align: center;
            font-size: 60px;
            padding-top: .15rem;
            padding-bottom: .05rem;
            span {
                display: inline-block;
                padding-left: .05rem;
                color: #ff9800;
                vertical-align: bottom;
            }
        }
        .highlight {
            text-align: center;
            p {
                display: inline-block;
                padding: .1rem .2rem;
                font-size: .6rem;
                color: #fff;
                background: #ff9800;
            }
        }
        .tips {
            p {
                text-align: center;
                font-size: 50px;
                strong {
                    color: red;
                }
            }
        }
        .taskNo {
            line-height: .2rem;
            text-align: center;
            font-size: 48px;
            color: #919191;
        }
    }
}

</style>
