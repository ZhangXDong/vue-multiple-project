<template>
    <div class="ld-sunwodaMaterial_loadPoint">
        <div class="main">
            <!-- 正在前往位置 -->
            <div class="target">{{workingCondition}}<span>{{stationName}}</span></div>
            <!-- 指引提示文案 -->
            <div class="tips">
                <p v-html="sunwodaGuideTip"></p>
            </div>
            <!-- 任务号 -->
            <!-- <div class="taskNo">
                <p v-show="taskNumber">任务号：{{taskNumber}}</p>
            </div> -->
        </div>
        <!-- 操作区 -->
        <footerBtn :footerBtns="footerBtns"></footerBtn>
        <!-- 弹窗 -->
        <autoConfirmMask 
            :showMask="showMask" 
            :showRecyclable="false" 
            :isRecycleable="sunwodaIsRecyclable" 
            maskText="点击此处开始卸尾料"
            :countDown="countDown" 
            @handleMask="startLoad">
        </autoConfirmMask>
    </div>
</template>

<script>
import footerBtn from '@/components/footerBtn.vue'
import autoConfirmMask from '../../components/autoConfirmMask.vue'
import { mapGetters, mapMutations } from 'vuex';
export default {
    components: {
        footerBtn,
        autoConfirmMask
    },
    data() {
        return {
            showMask: false,
            countDown: 10,
            timer: null,
        }
    },
    mounted () {},
    computed: {
        ...mapGetters([
            'scheduleCurrentOrder',
            'sunwodaSchedulingInfo',
            'footerBtns',
            'sunwodaGuideTip',
            'sunwodaIsRecyclable',
        ]),
        // 正在前往 / 暂停中
        workingCondition() {
            return this.sunwodaSchedulingInfo.workingCondition
        },
        // 储位名称
        stationName() {
            return this.sunwodaSchedulingInfo.currentOrder.stationName
        },
        // 任务号
        taskNumber() {
            return this.scheduleCurrentOrder.taskNumber
        },
    },
    methods: {
        // 开始卸垃圾
        startLoad() {
            this.timer && clearTimeout(this.timer)
            this.showMask = false
        },
        // 倒计时 自动前往下一个点
        handleCountDown() {
            this.timer && clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.countDown--
                if (this.countDown <= 0) {
                    this.showMask = false
                    this.timer && clearTimeout(this.timer)
                    // 发送消息卸车完成，继续去往下一个点位
                    this.$websocket.sendSock({pack_type: 40, data: {}})
                } else {
                    this.handleCountDown()
                }
            }, 1000)
        }
    },
    mounted() {
        let autoComplete = ['x500', 'X500', 'xinwangdaTest', 'hongyu']
        if (!autoComplete.includes(process.env.ENV_NAME)) { return false }
        this.countDown = 10
        this.showMask = true
        this.handleCountDown()
    },
    beforeDestroy() {
        this.timer && clearTimeout(this.timer)
    }
}
</script>

<style lang="scss">
.ld-sunwodaMaterial_loadPoint {
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
