<template>
    <div class="ld-sunwoda_garbageCarry__loadPoint">
        <div class="main">
            <div class="target">{{workingCondition}}<span>{{stationName}}</span></div>
            <div class="highlight">
                <p class="recyclable" v-show="sunwodaIsRecyclable==='100101'">可回收</p>
                <p class="not-recyclable" v-show="sunwodaIsRecyclable==='100102'">不可回收</p>
            </div>
            <div class="tips">
                <p v-html="sunwodaGuideTip"></p>
            </div>
        </div>
        <!-- 操作区 -->
        <footerBtn :footerBtns="footerBtns"></footerBtn>
        <!-- 弹窗 -->
        <autoConfirmMask 
            :showMask="showMask" 
            :showRecyclable="true" 
            :isRecycleable="sunwodaIsRecyclable" 
            maskText="点击此处开始装尾料"
            :countDown="countDown" 
            @handleMask="startLoad">
        </autoConfirmMask>
    </div>
</template>

<script>
import footerBtn from '@/components/footerBtn.vue'
import autoConfirmMask from '../../components/autoConfirmMask.vue'
import { mapGetters, mapMutations } from 'vuex'
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
    computed: {
        ...mapGetters([
			'sunwodaSchedulingInfo',
            'sunwodaGuideTip',
            'footerBtns',
            'workingStatus',
            'sunwodaIsRecyclable',
        ]),
        // 正在前往 / 暂停中
        workingCondition() {
            return this.sunwodaSchedulingInfo.workingCondition
        },
        // 储位名称
        stationName() {
            return this.sunwodaSchedulingInfo.currentOrder.stationName
        }
    },
    methods: {
        ...mapMutations({
            saveWorkingStatus: 'WORKING_STATUS',
        }),
        // 开始装垃圾
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
                    // 发送消息，继续去往下一个点位
                    this.$websocket.sendSock({pack_type: 43, data: {}})
                } else {
                    this.handleCountDown()
                }
            }, 1000)
        }
    },
    mounted() {
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
.ld-sunwoda_garbageCarry__loadPoint {
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
                padding: 0 .1rem;
                line-height: .5rem;
                font-size: .5rem;
                color: #fff;
                // background: #ff9800;
            }
            .recyclable {
                color: #20B759;
            }
            .not-recyclable {
                color: red;
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
