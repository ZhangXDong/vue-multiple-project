<template>
    <div class="ld-barcodeNavigate">
        <div class="main">
            <!-- 正在前往位置 -->
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
            <div class="taskNo" v-show="taskNumber">任务号：{{taskNumber}}</div>
            <!-- 条形码 -->
            <div class="barcode" ref="printContent">
                <svg id="barcode"
                    :jsbarcode-value=taskNumber>
                </svg>
            </div>
        </div>
        <!-- 操作区 -->
        <footerBtn :footerBtns="footerBtns"></footerBtn>
    </div>
</template>

<script>
import footerBtn from '@/components/footerBtn.vue'
import JsBarcode from 'jsbarcode'
import { mapGetters, mapMutations } from 'vuex';
export default {
    components: {
        footerBtn
    },
    data() {
        return {
            barcodeTimer: null
        }
    },
    mounted () {
        this.generateBarcode()
    },
    computed: {
        ...mapGetters([
            'scheduleCurrentOrder',
            'footerBtns',
            'scheduleGuideTip',
        ]),
        // 是导航页还是已到达停靠点的任务页
        // 1-准备拣选（1个btn） 2-导航到储位（2个btn） 3-到达储位（0个btn） 4—集并区（2个btn） 5-停车区（2个btn） 6-电梯排队点
        isNavigate() { 
            return this.scheduleCurrentOrder.isNavigate
        },
        // 任务号
        taskNumber() {
            console.log('任务号:', this.scheduleCurrentOrder.taskNumber);
            this.generateBarcode()
            return this.scheduleCurrentOrder.taskNumber
        },
        // 正在前往 / 暂停中
        workingCondition() {
            return this.scheduleCurrentOrder.workingCondition
        },
        // 储位名称
        stationName() {
            return this.scheduleCurrentOrder.stationName
        },
        // 强调内容 如：货架号
        highlightCon() {
            return this.gatherOrder && this.gatherOrder.orderSetList[0].customerCode || ''
        }
    },
    methods: {
        // 生成条形码
        generateBarcode() {
            this.barcodeTimer && clearTimeout(this.barcodeTimer)
            this.barcodeTimer = setTimeout(() => {
                JsBarcode("#barcode", {}, {
                    format:"CODE128",
                    displayValue: true,
                    fontSize: 38,
                    width: 3,
                    height: 150,
                }).init();
            }, 200)
        }
	}
}
</script>

<style lang="scss">
.ld-barcodeNavigate {
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
            line-height: .5rem;
            text-align: center;
            font-size: 48px;
        }
        .barcode {
            text-align: center;
            padding-bottom: .1rem;
        }
    }
}

</style>
