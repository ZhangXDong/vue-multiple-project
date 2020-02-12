<template>
   	<div class="ld-fta-flex ld-fta-charging">
        <div class="ld-fta-charging-content">
            <div class="ld-fta-charging-title">
                <p :class="!chargingInfo.stationName?'ld-fta-charging-title_electricity':''" v-html="chargingInfo.workingCondition"></p>
                <div class="ld-fta-charging-title_target" v-show="chargingInfo.stationName">{{chargingInfo.workingCondition}}<span>{{chargingInfo.stationName}}</span></div>
                <div class="ld-fta-charging-title_electricity" v-show="chargingInfo.workingCondition === '正在充电中' && !chargingInfo.stationName">电量：{{robotInfo ? robotInfo.robotBattery.remainingPercent : '100'}}%</div>
            </div>
            <div class="ld-fta-following-btn">
                <el-button
                    class="navigate-btn"
                    @click="handleBtn(item)" 
                    v-for="(item, index) in chargingInfo.actionButtons" :key="index" 
                    :disabled="item.disable" 
                    :style="{
                        background: item.bgColor ? item.bgColor : ''
                    }"
                >
                    {{ item.title }}
                </el-button>
            </div>
        </div>
        <!-- 弹出框 -->
        <el-dialog
            title="提示"
            custom-class="chargingInfo-dialog"
            :visible.sync="chargingDialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            :center="true"
            top="30vh"
            width="400px"
            >
            <div class="content-dialog">{{chargingDialogMsg}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFandleBtn(item)" v-for="(item, index) in chargingInfoBotton" :key="index" :class="{'elevator': item.hasBgColor, 'disabled': item.disable}">
                    {{item.title}}
                </el-button>
            </span>
        </el-dialog>
   	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {
    canExit,
    exit
} from '@/serve/charging.js'
export default {
    data() {
        return {
            chargingDialogVisible: false,
            chargingDialogMsg: '请先将充电插头拔下！',
            chargingInfoBotton: [{ //底部通用按钮
                title: '我知道了',
                type: 15
            }]
        }
    },
    computed: {
        ...mapGetters([
            'chargingInfo',
            'robotInfo',
            'allButtonCannotClick' // 按钮是否可点击
        ])
    },
    methods:{
        ...mapMutations({
            saveChargingInfo: 'FTA_SAVE_CHARGINGINFO',
            saveAllButtonCannotClick: 'ALL_BUTTON_CANNOT_CLICK', // 按钮2s后允许点击
        }),
		handleBtn(item) {
            if (this.allButtonCannotClick) {
                this.$message.warning({
                    message: '请勿频繁操作!',
                    showClose: false,
                    customClass: 'ld-message'
                })
                return false
            }
            this.saveAllButtonCannotClick(true)
            switch (item.title) {
                case '结束充电':
                    this.getCanExit()
                    break;
                case '结束':
                    this.getCanExit()
                    break;
                default:
                    this.$websocket.sendSock({pack_type: item.type, data: {}})
                    break;
            }
        },
        dialogFandleBtn(item) {
            if(item.title === '结束充电') {
                this.geteExit();
            }
            this.chargingDialogVisible = false
        },
         // 是否可结束充电
        async getCanExit(isGoBack) {
            await canExit(`robotId=${this.robotInfo.robotId}&customerId=${this.robotInfo.customerId}`).then((res) => {
                if (res.status.statusCode === 0) {
                    if(res.result.canExit) {
                        // 未达到最低电量
                        this.chargingDialogVisible = true
                        this.chargingDialogMsg = '是否确认结束充电'
                        this.chargingInfoBotton = [{ //底部通用按钮
                            title: '继续充电',
                            type: 15,
                            hasBgColor: true
                        },{ //底部通用按钮
                            title: '结束充电',
                            type: 15,
                            hasBgColor: false
                        }]
                    }else{
                        this.chargingDialogVisible = true
                        this.chargingDialogMsg = res.result.description
                        this.chargingInfoBotton = [{ //底部通用按钮
                            title: '我知道了',
                            type: 15
                        }]
                    }
                } else {
                    this.$message.error({
                        message: res.status.statusReason,
                        showClose: true
                    })
                }

            })
        },
        // 是否可结束充电
        async geteExit() {
            await exit().then((res) => {
                if (res.status.statusCode === 0) {
                    this.saveChargingInfo([])
                } else {
                    this.$message.error({
                        message: res.status.statusReason,
                        showClose: true
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
.ld-fta-charging {
    .ld-fta-charging-content {
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .ld-fta-charging-title {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            font-size: 54px;
            .ld-fta-charging-title_target {
                font-size: 40px;
                span {
                    display: inline-block;
                    padding-left: 20px;
                    font-size: 48px;
                    color: #ff9800;
                }
            }
            .ld-fta-charging-title_electricity {
                font-size: 70px;
                color: #20B759;
            }
        }
        .ld-fta-following-btn {
            height: 150px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            .navigate-btn {
                width: 600px;
                height: 150px;
                font-size: 53px;
                color: #fff;
            }
        }
    }
    .chargingInfo-dialog {
        height: 200px;
        border-radius: 10px;
        .el-dialog__body {
            font-size: 30px;
            line-height: 50px;
            text-align: center;
        }
        .el-dialog__footer {
            padding: 0;
            border-top: 1px solid #ccc;
            .dialog-footer {
                width: 100%;
                display: flex;
                justify-content: space-around; 
            }
            .el-button {
                width: 100%;
                font-size: 22px;
                border: none;
                color: #20B759;
                border-radius: 10px;
                background: transparent;
            }
            .el-button + .el-button{
                border-left: 1px solid #ccc;
                border-radius: 0 0 10px 0;
            }
            .elevator {
                color: #3F50B5;
            }
        }
    }
}
</style>
