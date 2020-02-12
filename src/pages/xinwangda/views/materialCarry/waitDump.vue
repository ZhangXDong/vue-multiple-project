<template>
    <div class="ld-sunwodaMaterial_waitDump">
        <div class="main">
            <!-- 正在前往位置 -->
            <div class="target">{{workingCondition}}<span>{{stationName}}</span></div>
            <!-- 强调内容 如：货架号-->
            <div class="highlight">
                <p v-show="highlightCon">{{highlightCon}}</p>
            </div>
            <!-- 指引提示文案 -->
            <div class="tips">
                <p v-html="sunwodaGuideTip"></p>
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
import { getCarryOrder } from '../../serve/sunwodaMaterialCarry.js'
import { mapGetters, mapMutations } from 'vuex';
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
            'sunwodaSchedulingInfo',
            'footerBtns',
            'sunwodaGuideTip',
            'stationInfo', // detailIds
        ]),
        // RCS给的获取列表数据的任务号
        businessOrderId() {
            return this.gatherOrder && this.gatherOrder.orderSetList[0].businessOrderId || ''
        },
        // 主单号
        taskId() {
            return this.sunwodaSchedulingInfo.currentOrder.taskId
        },
        // 任务号
        taskNumber() {
            console.log('任务号:', this.sunwodaSchedulingInfo.currentOrder.taskNumber);
            return this.sunwodaSchedulingInfo.currentOrder.taskNumber
        },
        // 原单号（工单号）
        originalCode() {
            console.log('原单号:', this.sunwodaSchedulingInfo.currentOrder.originalCode);
            return this.sunwodaSchedulingInfo.currentOrder.originalCode
        },
        // 正在前往 / 暂停中
        workingCondition() {
            return this.sunwodaSchedulingInfo.workingCondition
        },
        // 储位名称
        stationName() {
            let externalStationName = this.sunwodaSchedulingInfo.currentOrder.externalStationName || ''
            return externalStationName + '(' + this.sunwodaSchedulingInfo.currentOrder.stationName + ')'
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
        }),
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
                status: 1011,
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
.ld-sunwodaMaterial_waitDump {
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
                color: #3F50B5;
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
