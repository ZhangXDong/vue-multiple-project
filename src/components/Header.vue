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
                        <span :class="{'ld-fta-connecting': !reconnectPrompt}">
                            <span class="el-icon-warning" v-show="!reconnectPrompt"></span>
                            <span class="ld-fta-status">{{ !reconnectPrompt ? '连接系统中' : workingStatus }}</span>
                        </span>
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
            <div class="user-info">
                <svg class="icon head-portrait" aria-hidden="true">
                    <use xlink:href="#iconyonghu"></use>
                </svg>   
                <loginComp :showLogin="needLogin"></loginComp>
            </div>
            <div class="ld-fta-header_robotNo">
                {{ robotInfo && robotInfo.robotId }}
            </div>
            <div class="ld-fta-header_menu-action" @click="toMenu">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconcaidan"></use>
                </svg> 
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import { formatDate } from '@util/util.js'
    import { getToken } from '@util/auth.js'
    import { Message } from 'element-ui'
    import msgBox from '@/components/msgBox.vue'
    import loginComp from '@/components/loginComp.vue'
    export default {
        components: {
            msgBox,
            loginComp
        },
        data() {
            return {
                userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
                token: getToken(),
                getCurDateTimer: null,
                curDate: null,
                connectSignalStrength: '#iconsignal',
                chargeWidth: '100%', // 电量
                chargeBackground: '#fff', // 电池颜色
                robotNo: 108, // vuex

                showMsgBox: false,
                msgBoxObj: {
                    tipsText: '确认退出登录？',
                    tipsColor: 'red',
                    cancelBtnText: '取消',
                    confirmBtnText: '确认',
                    cancelFunc: () => {
                        this.showMsgBox = false
                    },
                    confirmFunc: () => {
                        this.showMsgBox = false
                    }
                }
            }
        },
        watch:{
            robotInfo: {
                handler(newVal, oldVal) {
                    if(newVal) {
                        this.init()
                    }
                },
                immediate: true,
                deep: true
            },
        },
        computed: {
            ...mapGetters([
                'workingMode',
                'workingStatus',
                'reconnectPrompt',
                'positionSuccess',
                'robotInfo',
            ]),
            needLogin() {
                const needLogin = process.env.ENV_NEEDLOGIN
                const curEnv = process.env.ENV_NAME
                let hasLogin = needLogin.some((item, index) => {
                    if (curEnv.indexOf(item) > -1) {
                        return true
                    }
                })
                return hasLogin
            }
        },
        methods: {
            ...mapActions([
                'logoutByAccount'
            ]),
            init() {
                this.getCurDate()
                // 工作模式
                if( this.robotInfo ) {
                    // wifi信号强度
                    this.connectSignalStrength = this.robotInfo ? '#iconsignal'+this.robotInfo.wifiSignalStrength : '#iconsignal4'
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
            },
            toMenu() {
                let token = getToken()
                console.log('token', token);
                let needLogin = process.env.ENV_NEEDLOGIN.some((shortName, index) => {
                    return process.env.ENV_NAME.indexOf(shortName) > -1
                })
                if (!token && needLogin) {
                    this.$router.push('/login')
                    return false
                }
                this.$route.path !== '/action' && this.$route.path !== '/menu' && this.$route.path !== '/relocation' ? this.$router.push('/action') : false
            },
        },
        mounted(){
            this.init()
        }
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
            font-size: 24px;
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
                    .ld-fta-header_work-status-content {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .ld-fta-connecting {
                            background: red;
                            padding: 0 5px;
                            width: 100%;
                            overflow: hidden;
                            line-height: 32px;
                            display: flex;
                            align-items: center;
                            span {
                                float: left;
                            }
                            .ld-fta-status {
                                font-size: 22px;
                            }
                        }
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
            .user-info {
                width: 40%;
                font-size: .088rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .head-portrait {
                    width: .6rem;
                    height: .6rem;
                }
                .code-icon {
                    font-size: .14rem;
                    margin-left: .07rem;
                }
                .logout-box {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: .3rem;
                    .username {
                        margin: 0 .05rem;
                    }
                    .logout {
                        font-size: .3rem;
                        color: rgb(255, 46, 46);
                    }
                }
            }
            .ld-fta-header_robotNo {
                flex: 1;
                text-align: center;
            }
            .ld-fta-header_menu-action {
                width: 40%;
                text-align: right;
            }
        }
        .ld-fta-header_robot-action {
            height: 60px;
            font-size: 36px;
            padding: 0 20px;
            .icon {
                font-size: 64px;
            }
        }
    }
</style>
