<template>
    <div class="ld-tclMaterialDelivery-unloadPointB">
        <!-- 操作顶升 -->
        <jackUpBtn :showJackUpBtn="true"></jackUpBtn>
        <div class="tips">
            <!-- <p v-html="tclGuideTip"></p> -->
            <p>请取下指定物料</p>
        </div>
        <div class="material-table" ref="table">
            <div class="table-th" ref="tableTh"  :class="{'hasScrollBar': hasScrollBar}">
                <div class="table-td">物料编码</div>
                <div class="table-td">物料名称</div>
                <div class="table-td">数量</div>
                <div class="table-td">工序</div>
            </div>
            <div class="table-content" ref="tableContent">
                <div class="table-tr" v-for="(item, index) in tableList" :key="index">
                    <div class="table-td">{{item.goodsBarcode}}</div>
                    <div class="table-td">{{item.goodsName}}</div>
                    <div class="table-td" style="font-weight: 900; color: green; font-size: .3rem;">{{item.planQty}}</div>
                    <div class="table-td">{{item.stationName}}</div>
                </div>
            </div>
        </div>
        <div class="task">
            <div class="target">{{workingCondition}}<span>{{handleCurStationName(stationName)}}</span></div>
            <div class="taskNo">
                {{originalCode}}
            </div>
        </div>
        <!-- 操作区 -->
        <footerBtn :footerBtns="footerBtns" :callback="handleBtn"></footerBtn>
        <!-- 弹窗 -->
        <msgBox :showMsgBox="showMsgBox" :msgBoxObj="msgBoxObj"></msgBox>
    </div>
</template>

<script>
import footerBtn from '@/components/footerBtn.vue'
import jackUpBtn from '@/components/jackUpBtn.vue';
import msgBox from '@/components/msgBox.vue'
import { getCarryOrder } from '../../serve/tclMaterialDelivery.js'
import { mapGetters, mapMutations } from 'vuex';
export default {
    components: {
        msgBox,
        jackUpBtn,
        footerBtn
    },
    data() {
        return {
            tableList: [],
            detailIdList: [], // RCS给的列表idlist
            hasScrollBar: false,
            showMsgBox: false,
            msgBoxObj: {
                tipsText: '是否确定将物料退回？',
                tipsColor: '#ff9821',
                cancelBtnText: '取消退回',
                confirmBtnText: '确认退回',
                confirmBtnColor: 'red',
                showCancelBtn: true,
                cancelFunc: () => {
                    this.showMsgBox = false
                },
                confirmFunc: () => {
                    this.showMsgBox = false
                }
            },
            timer: null
        }
    },
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            vm.init()
        })
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
        // 原单号（工单号）
        originalCode() {
            console.log('原单号:', this.tclSchedulingInfo.currentOrder.originalCode);
            return this.tclSchedulingInfo.currentOrder.originalCode
        },
        // 任务号
        taskNumber() {
            console.log('任务号:', this.tclSchedulingInfo.currentOrder.taskNumber);
            return this.tclSchedulingInfo.currentOrder.taskNumber
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
    methods: {
        ...mapMutations({
            saveShowJackUp: 'SHOW_JACKUP',
            saveShowJackUpWork: 'SHOW_JACKUP_WORK',
            saveRPMData: 'TCL_SAVE_RPMDATA' // 保存rpm数据
        }),
        init() {
            let RPMData = this.tclGetRPMData
            if (!RPMData) { 
                this.$message.warning({
                    message: '未获取到rpm数据',
                    showClose: true
                })
                return false
            }
            this.tableList = []
            let tableData = []
            this.detailIdList = this.stationInfo.detailIdInfos || []
            console.log('RCSDetailIdList:', this.detailIdList);
            this.detailIdList.length && this.detailIdList.forEach((item, index) => {
                RPMData.forEach((curItem, curIndex) => {
                    if (item.businessOrderDetailId == curItem.id) {
                        curItem.taskId = item.id
                        tableData.push(curItem)
                    }
                })
            })
            this.tableList = [...tableData]
        },
        handleBtn(item) {
            // 入参-table
            let reqTableData = []
            let reqObj = {}
            this.tableList.forEach((item, index) => {
                reqObj = {}
                reqObj.realQty = item.planQty
                reqObj.taskDetailId = item.taskId
                reqTableData.push(reqObj)
            })
            // 入参
            let reqData = {
                status: '',
                time: Date.now(),
                taskId: this.taskId,
                stationName: this.stationName,
                detailList: reqTableData
            }
            console.log('----入参---', reqData);
            // 物料退回
            if (item.identify === 'materialBack') {
                this.msgBoxObj = {
                    tipsText: '是否确定将物料退回？',
                    tipsColor: '#ff9821',
                    cancelBtnText: '取消退回',
                    confirmBtnText: '确认退回',
                    confirmBtnColor: '#e51c23',
                    showCancelBtn: true,
                    cancelFunc: () => {
                        this.showMsgBox = false
                    },
                    confirmFunc: () => {
                        this.showMsgBox = false
                        this.confirmBack(item, reqData)
                    }
                }
            }
            // 物料接收
            if (item.identify === 'materialReceive') {
                this.msgBoxObj = {
                    tipsText: '请确保指定物料已经取下',
                    tipsColor: '#e51c23',
                    cancelBtnText: '取消接收',
                    confirmBtnText: '确认接收',
                    showCancelBtn: true,
                    cancelFunc: () => {
                        this.showMsgBox = false
                    },
                    confirmFunc: () => {
                        this.showMsgBox = false
                        this.confirmReceive(item, reqData)
                    }
                }
            }
            this.showMsgBox = true
        },
        // 确认 物料退回
        confirmBack(item, reqData) {
            reqData.status = 1010
            this.$websocket.sendSock({pack_type: item.type, data: {isReceive: false, stationDealResult: reqData}})
        },
        // 确认 物料接口
        confirmReceive(item, reqData) {
            reqData.status = 1001
            this.$websocket.sendSock({pack_type: item.type, data: {isReceive: true, stationDealResult: reqData}})
        },
        handleCurStationName(str) {
            console.log(str);
            console.log(str.length);
            if (str.length > 40) {
                return str.slice(0, 41) + '...'
            }
            return str
        }
    },
    watch: {
        'tableList'(newVal, oldVal) {
            this.hasScrollBar = (this.$refs.table.offsetHeight - this.$refs.tableTh.offsetHeight) < this.$refs.tableContent.scrollHeight
        }
    }
}
</script>

<style lang="scss">
.ld-tclMaterialDelivery-unloadPointB {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 .05rem .05rem;
    color: #252525;
    background: #fff;
    .ld-jackup-button { 
        top: 1.1rem;
    }
    .tips {
        p {
            padding-top: .14rem;
            padding-bottom: .3rem;
            text-align: center;
            font-size: 50px;
            color: #3F50B5;
            strong {
                color: red;
            }
        }
    }
    .material-table {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: auto;
        border: 1px solid #bebebe;
        // background: red;
        .table-th {
            height: .5rem;
            .table-td {
                line-height: .5rem;
                text-align: center;
                font-size: .2rem;
                color: rgb(136, 136, 136);
            }
        }
        .table-content {
            flex: 1;
            overflow: auto;
            .table-tr {
                .table-td {
                    line-height: .5rem;
                    text-align: left;
                    font-size: .2rem;
                }
            }
        }
        .table-th, .table-tr {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;
            .table-td {
                flex: 1;
                padding: 0 .05rem;
                border-right: 1px solid #e6e6e6;
            }
            .table-td:last-child {
                border-right: 0;
            }
        }
        .hasScrollBar {
            padding-right: 2px;
        }
    }
    .task {
        height: .7rem;
        position: relative;
        .target {
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            font-size: .4rem;
            span {
                display: inline-block;
                font-size: .4rem;
                color: #ff9800;
                vertical-align: bottom;
            }
        }
        .taskNo {
            position: absolute;
            right: 10px;
            bottom: -30px;
            height: .25rem;
            line-height: .25rem;
            text-align: center;
            font-size: .06rem;
            color: #919191;
        }
    }
    
    // 定义滚动条样式
    ::-webkit-scrollbar {
        width: 2px;
        box-sizing: border-box;
    }
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: rgb(221, 221, 221);  // 滚动条颜色
    }
}

</style>
