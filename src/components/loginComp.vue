<template>
    <div class="ld-loginComp">
        <div class="logout-box" v-show="showLogin">
            <div class="username" v-if="token">{{userInfo.userName}}</div>
            <div class="username" v-else>未登录</div>
            <div class="logout" v-show="token" @click="logout">退出</div>
        </div>
        <msgBox :showMsgBox="showMsgBox" :msgBoxObj="msgBoxObj"></msgBox>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { getToken } from '@util/auth.js'
import { Message } from 'element-ui'
import msgBox from '@/components/msgBox.vue'
export default {
    components: {
        msgBox
    },
    data() {
        return {
            userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
            token: getToken(),

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
    props: {
        showLogin: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters([
            'robotInfo',
            'getUserInfo',
            'getMyToken'
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
        // 登出
        logout() {
            this.showMsgBox = true
            this.msgBoxObj = {
                tipsText: '确认退出登录？',
                tipsColor: '#e51c23',
                cancelBtnText: '取消',
                confirmBtnText: '确认',
                cancelFunc: () => {
                    this.showMsgBox = false
                },
                confirmFunc: () => {
                    this.showMsgBox = false
                    this.logoutAction()
                }
            }
        },
        logoutAction() {
            let curCompanyId = this.robotInfo ? this.robotInfo.customerId : ''
            console.log('登出');
            console.log(this.userInfo.id, curCompanyId);
            if (!this.userInfo.id) {
                this.$message.warning({
                    message: 'userInfo.id不存在',
                    showClose: true
                })
                return false
            }
            this.logoutByAccount({userId: this.userInfo.id}).then((res) => {
                if (res.status.statusCode === 0) {
                    this.$message.success({
                        message: '退出成功,正在跳转',
                        showClose: true
                    })
                    this.showMsg = false
                    setTimeout(()=> {
                        Message.closeAll()
                    }, 1000)
                }
                else {
                    this.$message.error({
                        message: '退出失败',
                        showClose: true,
                        time: 50000000
                    })
                }
            })
        }
    },
    watch:{
        getUserInfo: {
            handler(newVal, oldVal) {
                if(newVal) {
                    let vuexUserInfo = typeof newVal == 'string' ? JSON.parse(newVal) : typeof newVal == 'object' ? newVal : null
                    this.userInfo = vuexUserInfo || JSON.parse(localStorage.getItem("userInfo")) || {}
                }
            },
            immediate: true,
            deep: true
        },
        getMyToken: {
            handler(newVal, oldVal) {
                this.token = newVal
            }
        }
    },
}
</script>

<style lang="scss">
.ld-loginComp {
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
</style>