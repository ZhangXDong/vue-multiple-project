<template>
    <div class="ld-fta-header">
        <div class="ld-fta-header_work-status ld-fta-header_content">
            <!-- 工作状态与模式 -->
            <div class="ld-fta-header_status-mode">
                <div class="ld-fta-header_mode">
                    <div class="ld-fta-header_mode-title">
                        工作模式 : 
                    </div>
                    <div class="ld-fta-header_mode-content">
                        {{ workingMode }}
                    </div>
                </div>
                <div class="ld-fta-header_work-status">
                    <div class="ld-fta-header_work-status-title">
                        工作状态 : 
                    </div>
                    <div class="ld-fta-header_work-status-content">
                        {{ reconnectPrompt ? '连接系统中' : workingStatus }}
                    </div>
                </div>
            </div>
            <!-- 定位丢失 -->
            <div class="ld-fta-header_lost-position" v-show="!positionSuccess">
                <svg class="icon lost-position-icon" aria-hidden="true">
                    <use xlink:href="#iconjinggao"></use>
                </svg>
                <span>定位丢失</span>
            </div>
            <!-- 时间/wifi信号/电量 -->
            <div class="ld-fta-header_time-wifi-battery">
                <div class="ld-fta-header_time">{{ curDate }}</div>
                <svg class="icon ld-fta-header_signal" aria-hidden="true">
                    <use :xlink:href="connectSignalStrength"></use>
                </svg>       
                <div class="ld-fta-header_battery-box">
                    <div class="ld-fta-header_battery-max-width">
                        <div :style="{width: chargeWidth, background: chargeBackground}"></div>
                    </div>
                    <img src="@images/batteryBox.png" class="ld-fta-header_battery-img" />
                    <div class="ld-fta-header_battery-num">{{ chargeWidth }}</div>
                </div>
            </div>
        </div>
        <!-- 用户/车辆编号/操作 -->
        <div class="ld-fta-header_robot-action ld-fta-header_content">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconyonghu"></use>
                </svg>    
            </div>
            <div class="ld-fta-header_robotNo">
                {{ robotNo }}
            </div>
            <div class="ld-fta-header_menu-action" @click="$route.path !== '/action' && $route.path !== '/menu' && $route.path !== '/relocation' ? $router.push('/action') : false">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconcaidan"></use>
                </svg> 
            </div>
        </div>
    </div>
</template>

<script>
    import { formatDate } from '@util/util.js'

    export default {
        data() {
            return {
                workingMode: '系统调度', // 工作模式  vuex
                reconnectPrompt: true, // 是否重连中  vuex
                workingStatus: '到达', // 工作状态  vuex
                positionSuccess: false, // 定位是否成功 vuex
                robotInfo: null, // vuex
                curDate: null,
                connectSignalStrength: '#iconsignal',
                chargeWidth: '100%', // 电量
                chargeBackground: '#fff', // 电池颜色
                robotNo: 108, // vuex
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.getCurDate()
                // 工作模式
                if( this.robotInfo ) {
                    //车号
                    this.robotId = this.robotInfo.robotId
                    // wifi信号强度
                    this.connectSignalStrength += this.robotInfo ? this.robotInfo.wifiSignalStrength : 4
                    // 电量
                    this.chargeWidth = this.robotInfo.robotBattery.remainingPercent +'%'
                    this.chargeBackground = this.robotInfo.robotBattery.remainingPercent < 20 ? "red" : "#fff"
                }
            },
            // 获取当前事件
            getCurDate() {
                this.getCurDateTimer && clearTimeout(this.getCurDateTimer)
                this.getCurDateTimer = setTimeout(() => {
                    this.getCurDate()
                }, 60000)
                this.curDate = formatDate(Date.now(), 'hh:mm')
            },
            goAction(){
                this.$router.push("./action")
            }
        },
    }
</script>

<style lang="scss" scoped>
    .ld-fta-header {
        height: 100px;
        background: #3F50B5;
        color: #fff;
        .ld-fta-header_content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            line-height: 40px;
            font-size: 18px;
            position: relative;
            left: 0;
            top: 0;
            .ld-fta-header_status-mode {
                display: flex;
                flex-direction: row;
                .ld-fta-header_mode, .ld-fta-header_work-status{
                    display: flex;
                    flex-direction: row;
                    margin-left: 20px;
                    .ld-fta-header_mode-title, .ld-fta-header_work-status-title {
                        margin-right: 5px;
                    }
                }
            }
            .ld-fta-header_lost-position {
                width: 100%;
                height: 40px;
                color: #db8b2a;
                position: absolute;
                left: 0;
                top: 0;
                text-align: center;
                .lost-position-icon {
                    margin-right: 10px;
                }
            }
            .ld-fta-header_time-wifi-battery {
                display: flex;
                flex-direction: row;
                align-items: center;
                .ld-fta-header_signal {
                    height: 26px;
                    line-height: 40px;
                    margin: 0 10px;
                    font-size: 30px;
                }
                .ld-fta-header_battery-box {
                    display: flex;
                    align-items: center;
                    position: relative;
                    left: 0;
                    top: 0;
                    margin-right: 20px;
                    .ld-fta-header_battery-max-width {
                        position: absolute;
                        left: 4px;
                        width: 42px;
                        height: 18px;
                        div {
                            height: 100%;
                        }
                    }
                    .ld-fta-header_battery-num {
                        margin-left: 10px;
                    }
                }
            }
        }
        .ld-fta-header_robot-action {
            height: 60px;
            font-size: 36px;
            padding: 0 20px;
            .icon {
                font-size: 50px;
            }
        }
    }
</style>
