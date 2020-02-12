<template>
    <div class="ld-flex ld-fta-menu">
        <div class="ld-fta-menu-action_button" v-if="actionButtons.length > 0">
            <el-button v-for="(item, index) in actionButtons" :key="index" @click="switchFunction(item.type)" :disabled="item.disabled">{{item.title}}</el-button>
        </div>
        <div class="ld-fta-menu-divider" v-if="actionButtons.length > 0"></div>
        <div class="ld-fta-menu-equipment_button" v-if="equipmentButtons.length>0">
            <el-button v-for="(item, index) in equipmentButtons" :key="index" @click="switchFunction(item.type)">{{item.title}}</el-button>
        </div>
        <!-- 版本弹出框 -->
        <el-dialog
            title="版本号"
            :visible.sync="versionDialogVisible"
            custom-class="version_dialog"
            >
            <div class="version-container">
                <p class="version-label">FTA-Client版本号:</p>
                <span>{{ version }}</span>
            </div>
            <div class="version-container">
                <p class="version-label">FTA-Serve版本号:</p>
                <span>{{ ftaVersion }}</span>
            </div>
            <div class="version-container">
                <p class="version-label">RCS版本号:</p>
                <span>{{ rcsVersion}}</span>
            </div>
            <div class="version-container">
                <p class="version-label">RPM版本号:</p>
                <span>{{ rpmVersion }}</span>
            </div>
            <div class="version-container">
                <p class="version-label">RPM baseServer版本号:</p>
                <span>{{ rpmBaseServerVersion }}</span>
            </div>
            <div class="version-container">
                <p class="version-label">RPM rpmServer版本号:</p>
                <span>{{ rpmRpmServerVersion }}</span>
            </div>
            <div class="version-container">
                <p class="version-label">RPM userCenter版本号:</p>
                <span>{{ rpmUserCenterVersion }}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="versionDialogVisible = false" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import {
        getFtaServeVersion,
        getRcsServeVersion,
        getRpmServeVersion,
        getRpmBaseServerVersion,
        getRpmRpmServerVersion,
        getRpmUserCenterVersion
    } from '@/serve/baseServe.js'
    export default {
        data() {
            return {
                actionButtons: [
                    {
                        title: '重定位',
                        type: 8,
                        disabled: false
                    }
                ],
                equipmentButtons: [
                    {
                        title: '关机',
                        type: 9
                    },
                    {
                        title: '关于',
                        type: 11
                    }
                ],
                isNavigation: false,
                versionDialogVisible: false,
                ftaVersion: '',
                rcsVersion: '',
                rpmVersion: '',
                rpmBaseServerVersion: '',
                rpmRpmServerVersion: '',
                rpmUserCenterVersion: '',
                version: process.env.VERSION
            }
        },
        computed: {
            ...mapGetters([
                'followModuleAvailable',
                'followDisabled',
                'robotStatus',
                // 'ftaVersion'
            ]),
        },
        mounted() {
            console.log('needLogin和env_Name', process.env.ENV_NEEDLOGIN, process.env.ENV_NAME);
            const needLogin = process.env.ENV_NEEDLOGIN
            const curEnv = process.env.ENV_NAME
            needLogin.some((item, index) => {
                if (curEnv.indexOf(item) > -1) {
                    this.actionButtons.push(
                        {
                            title: '任务接管',
                            type: 12,
                            disabled: false
                        }
                    )
                }
            })
        },
        watch:{
            'followDisabled': {
                handler(newVal, oldVal) {
                    this.updateFollowButton()
                },
                immediate: true,
                deep: true
            },
            'robotStatus': {
                handler(newVal, oldVal) {
                    // 导航状态下跟随不可用
                    if(newVal && newVal.robotBaseStatus == 1) {
                        this.isNavigation = true
                    }else {
                        this.isNavigation = false
                    }
                    this.updateFollowButton()
                },
                immediate: true,
                deep: true
            }
        },
        
        methods:{
            ...mapMutations({
                saveFollowDisabled: 'FTA_SAVE_FOLLOWDISABLED'
            }),
            updateFollowButton() {
                let followIndex = this.actionButtons.findIndex(item => {
                    return item.title === '跟随'
                })
                console.log('followIndex', followIndex, this.followModuleAvailable);
                if (followIndex == -1 && this.followModuleAvailable) {
                    // 找不到跟随按钮  并且要显示跟随按钮   
                    let disabled = this.followDisabled || this.isNavigation
                    this.actionButtons.push({
                        title: '跟随',
                        type: 14,
                        disabled
                    })
                }
                else if(followIndex != -1 && this.followModuleAvailable) {
                    // 能找到跟随按钮  并且要显示跟随按钮   
                    // 更新跟随按钮是否可用
                    let disabled = this.followDisabled || this.isNavigation
                    this.actionButtons[followIndex].disabled = disabled
                }
                else {
                    // 删除跟随按钮 (如果以上条件均不满足，这里删除一个，会把重定位删掉的)
                    // this.actionButtons.splice(followIndex, 1)
                }
            },
            switchFunction(type) {
                switch (type) {
                    // 重新定位
                    case 8:
                        this.$router.push('/relocation')
                    break;
                    // 关于
                    case 11:
                        this.versionDialogVisible = true
                        this.getFTAVersion()
                        this.getRCSVersion()
                        this.getRPMVersion()
                        this.getRPMBaseServerVersion()
                        this.getRPMRpmServerVersion()
                        this.getRPMUserCenterVersion()
                        break;
                    // 接管任务
                    case 12:
                        this.$router.push('/taskTakeover')
                        break;
                    default:
                        // 跟随 type：14
                        // 关机 type：9
                        this.$websocket.sendSock({pack_type: type, data: {}})
                        break;
                }
            },
            getFTAVersion() {
                getFtaServeVersion().then((res) => {
                    console.log('fta-server 版本号', res);
                    this.ftaVersion = res.git.branch || res.git.tags
                })
            },
            getRCSVersion() {
                getRcsServeVersion().then((res) => {
                    console.log('rcs版本号', res);
                    this.rcsVersion = res.git.branch || res.git.tags
                })
            },
            getRPMVersion() {
                getRpmServeVersion().then((res) => {
                    console.log('rpm版本号', res);
                    this.rpmVersion = res.git.branch || res.git.tags
                })
            },
            getRPMBaseServerVersion() {
                getRpmBaseServerVersion().then((res) => {
                    console.log('rpm base-server 版本号', res);
                    this.rpmBaseServerVersion = res.git.branch || res.git.tags
                })
            },
            getRPMRpmServerVersion() {
                getRpmRpmServerVersion().then((res) => {
                    console.log('rpm rpm-server 版本号', res);
                    this.rpmRpmServerVersion = res.git.branch || res.git.tags
                })
            },
            getRPMUserCenterVersion() {
                getRpmUserCenterVersion().then((res) => {
                    console.log('rpm user-center 版本号', res);
                    this.rpmUserCenterVersion = res.git.branch || res.git.tags
                })
            }
        }
    }
</script>

<style lang="scss">
    .ld-fta-menu {
        flex: 1;
        padding: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .el-button {
            width: 200px;
            height: 100px;
            font-size: 35px;
            color: #3F50B5;
            border-radius: 10px;
            border-color: #3F50B5;
            margin-left: 10px;
            font-weight:normal;         
        }
        .ld-fta-menu-action_button {
            display: flex;
            justify-content: space-around;
            .el-button {
                background: #3F50B5;
                border: none;
                color: #fff;
            }
        }
        .ld-fta-menu-divider {
            width: 90%;
            height: 4px;
            background: #DFE4F2;
        }
        .ld-fta-menu-equipment_button {
            width: 100%;
            display: flex;
            justify-content: space-around;
        }
        .version_dialog {
            width: 70%;
            .el-dialog__body {
                padding: 0 .3rem;
                flex-direction: column;
                .version-container {
                    width: 100%;
                    display: flex;
                    line-height: 50px;
                }
                .version-label {
                    margin-right: 10px;
                }
            }
        }
    }
    
</style>