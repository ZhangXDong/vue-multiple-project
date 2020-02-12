<template>
   	<div class="ld-login ld-flex">
        <div  class="ld-fta-action_go-back">
            <svg class="icon ld-fta-action_go-back-icon" aria-hidden="true" @click="goBack">
                <use xlink:href="#iconhuitui-blue"></use>
            </svg>
        </div>
        <!-- 登录 -->
        <div class="ld-login_box ld-login_card-content">
   			<div class="ld-login_title">
   				<div class="ld-login_card">
   					刷卡登录
   				</div>
   				<div class="ld-login_user">
   					账号密码登录
   				</div>
   			</div>
   			<div class="ld-login_content">
   				<div class="ld-login_card-content">
   					<img src="@/assets/images/card_login.png" alt="" />
   				</div>
   				<div class="ld-login_line">
   					<div class="ld-line"></div>
   				</div>
   				<div class="ld-login_user-content">
   					<div class="ld-login_user-form">	
	    				<el-form ref="form" :model="loginData" :rules="loginRules">
	    					<el-form-item prop="userName">
							    <el-input ref="userNameInput" autofocus v-model="loginData.userName" placeholder="用户名"></el-input>
							</el-form-item>
							<el-form-item prop="pwd">
							    <el-input ref="passWordInput" v-model="loginData.pwd" type="password" placeholder="密码"></el-input>
							</el-form-item>
	    				</el-form>
	    				<div class="operate">
                            <el-button :class="{'isDisabled': isDisabled}" :disabled="isDisabled" @click="login('form')">
                                登 录
                            </el-button>
                        </div>
   					</div>
   				</div>
   			</div>
   		</div>
        <msgBox :showMsgBox="showMsgBox" :msgBoxObj="msgBoxObj"></msgBox>
   	</div>
</template>

<script>
import msgBox from '@/components/msgBox.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { Message } from 'element-ui'
export default{
    data() {
        return {
            hasScanFunc: false, // 是否有扫描功能
            loginData: {},
			loginRules: {
				userName: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
            },
            isDisabled: false,

            showMsgBox: false,
            msgBoxObj: {
                tipsText: '提示文案',
                tipsColor: 'red',
                cancelBtnText: '取消',
                confirmBtnText: '确认',
                cancelFunc: () => {
                    this.showMsgBox = false
                },
                confirmFunc: () => {
                    this.showMsgBox = false
                }
            },
            // rfid读卡器（暂无）

        }
    },
    components: {
        msgBox
    },
    mounted() {
        this.$refs.userNameInput.focus()
    },
    computed: {
        ...mapGetters([
            'robotInfo'
			// 'startNormal',
			// 'startNormalText',
		]),
    },
    methods:{
        // ...mapMutations({
        //     saveStartNormal: 'FTA_SAVE_STARTNORMAL',
        //     saveStartNormalText: 'FTA_SAVE_STARTNORMALTEXT' // 设置loading文案
        // }),
        ...mapActions([
            'loginByAccount'
        ]),
        login(formName){
			// 账号登陆
			this.$refs[formName].validate((valid) => {
				if(valid) {
					// this.isDisabled = true
                    const password = this.$commonFun.encryption(this.loginData.pwd, this.loginData.userName) // 密码加密
                    let curCompanyId = this.robotInfo.customerId
                    if (!curCompanyId) {
                        this.$message.warning({
                            message: '请先配置设备编号',
                            showClose: true,
                            customClass: 'msgBox'
                        })
                        return false
                    }
                    console.log(this.loginData.userName, password, curCompanyId);
					this.loginByAccount({userName: this.loginData.userName, password: password, companyId: curCompanyId}).then((res) => {
						if(res.status.statusCode === 0) {
							this.$message.success({
								message: '登录成功',
								showClose: true,
								customClass: 'msgBox'
							})
							setTimeout(() => {
                                Message.closeAll()
                                this.$router.replace({path: '/action'})	
							}, 1000)
						} else {
							this.$message.error({
								message: res.status.statusReason,
								showClose: true,
								customClass: 'msgBox'
							})
                        }
                        this.isDisabled = false
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
        goBack() {
            this.$router.back()
        }
    }
}
</script>

<style lang="scss">
.ld-login {
    margin: -15px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #252525;
    background: #fff;
    .ld-fta-action_go-back {
        width: 100%;
        height: 50px;
        background: #e9ebf7;
        .ld-fta-action_go-back-icon {
            color: #3F50B5; 
            font-size: 50px;
            line-height: 50px;
            width: 100px;
        }
    }
    .ld-login_box {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .ld-login_title {
            background: #eee;
            display: flex;
            justify-content: center;
            align-items: center;
            .ld-login_card, .ld-login_user {
                flex: 1;
                height: .6rem;
                line-height: .6rem;
                font-size: .2rem;
                text-align: center;
            }
        }
        .ld-login_content {
            flex: 1;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0 .3rem;
            .ld-login_card-content{
                width: 49%;
                img {
                    width: 100%;
                }
            }
            .ld-login_line {
                width: 3px;
                height: 100%;
                padding: .1rem;
                .ld-line {
                    width: 1px;
                    background: rgb(155, 155, 155);
                    height: 90%;
                }
            }
            .ld-login_user-content {
                width: 49%;
                padding: 80px;
                box-sizing: border-box;
                .ld-login_user-form {
                    text-align: center;
                    box-sizing: border-box;
                    .el-form {
                        .el-form-item {
                            text-align: center;
                            margin-bottom: .5rem;
                            h3 {
                                font-size: .2rem;
                                line-height: .3rem;
                            }
                            .el-form-item__error {
                                font-size: .2rem;
                            }
                            .el-form-item__content {
                                .el-input__inner {
                                    height: .8rem;
                                    line-height: .8rem;
                                    font-size: .3rem;
                                }
                                .el-input__inner::placeholder {
                                    font-size: .3rem;
                                }
                            }
                        }
                    }
                    .operate {
                        width: 100%;
                        margin: .2rem auto 0;
                        height: 110px;
                        display: flex;
                        justify-content: center;
                        align-items: flex-end;
                        .el-button {
                            flex: 1;
                            min-width: .85rem; height: 110px;
                            text-align: center;
                            font-size: 54px;
                            color: #fff;
                            background: #3F50B5;
                            border: 1px solid #3F50B5;
                            border-radius: 10px;
                        }
                        .isDisabled {
                            color: #fff;
                            opacity: .3;
                            border: 1px solid rgba(255,255,255,0.66);
                        }
                    }
                }
            }
        }
    }
}
// 下拉列表
.el-select-dropdown {
    .el-select-dropdown__empty {
        font-size: .08rem;
    }
    .el-select-dropdown__item {
        height: .14rem;
        line-height: .14rem;
        font-size: .08rem;
    }
}
</style>
