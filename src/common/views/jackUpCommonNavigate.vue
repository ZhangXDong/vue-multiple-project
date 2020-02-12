<template>
    <div class="ld-jackUp_common__navigate">
        <div class="main">
            <!-- 正在前往的位置信息 -->
            <div class="target">{{workingCondition}}<span>{{stationName}}</span></div>
            <!-- 强调内容 如：货架号-->
            <div class="highlight">
                <p v-show="highlightCon">{{highlightCon}}</p>
            </div>
            <!-- 指引提示文案 -->
            <div class="tips">
                <p v-html="scheduleGuideTip"></p>
            </div>
            <!-- 任务号 -->
            <div class="taskNo">
                <p v-show="originalCode">工单号：{{originalCode}}</p>
            </div>
        </div>
        <!-- 操作区 -->
        <footerBtn :footerBtns="footerBtns"></footerBtn>
        <!-- 操作顶升 -->
        <jackUpBtn :showJackUpBtn="showJackUpBtn"></jackUpBtn>
    </div>
</template>

<script>
import footerBtn from '@/components/footerBtn.vue'
import jackUpBtn from '@/components/jackUpBtn.vue';
import { mapGetters, mapMutations } from 'vuex';
export default {
    components: {
        jackUpBtn,
        footerBtn
    },
    data() {
        return {
            showJackUpBtn: false // 操作顶升按钮是否展示（只有到达的时候才展示，导航中不展示）
        }
    },
    computed: {
        ...mapGetters([
            'gatherOrder',
            'scheduleCurrentOrder',
            'footerBtns',
            'scheduleGuideTip',
            'workingStatus',
        ]),
        // 任务号
        taskNumber() {
            return this.scheduleCurrentOrder.taskNumber
        },
        // 原单号（工单号）
        originalCode() {
            console.log('原单号:', this.scheduleCurrentOrder.originalCode);
            return this.scheduleCurrentOrder.originalCode
        },
        // 正在前往 / 暂停中
        workingCondition() {
            return this.scheduleCurrentOrder.workingCondition
        },
        // 储位名称
        stationName() {
            let externalStationName = this.scheduleCurrentOrder.externalStationName || ''
            return externalStationName + '(' + this.scheduleCurrentOrder.stationName + ')'
        },
        // 强调内容 如：货架号
        highlightCon() {
            return this.gatherOrder && this.gatherOrder.orderSetList[0].customerCode || ''
        }
    },
    mounted () {
        console.log('scheduleCurrentOrder', this.scheduleCurrentOrder);
	},
    methods: {
        ...mapMutations({
            saveShowJackUp: 'SHOW_JACKUP',
            saveShowJackUpWork: 'SHOW_JACKUP_WORK',
        })
    },
    watch: {
        workingStatus: {
            handler(newVal, oldVal) {
                if (newVal.indexOf('到达') > -1 || newVal.indexOf('暂停') > -1) {
                    this.showJackUpBtn = true
                } else {
                    this.showJackUpBtn = false
                }
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="scss">
.ld-jackUp_common__navigate {
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
            line-height: .6rem;
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
            padding-bottom: .1rem;
            line-height: .5rem;
            text-align: center;
            font-size: 48px;
            color: #919191;
        }
    }
}

</style>
