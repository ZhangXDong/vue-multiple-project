<template>
    <div class="ld-flex ld-fta-relocation">
        <div class="ld-fta-relocation-container">
            <div class="ld-fta-relocation-left">
                <div class="ld-fta-relocation-operating_button" :class="{'active': activeCurOperating == index}" v-for="(item, index) in operatingList" :key="index" @click="chooseOperating(item, index)">
                    {{item.name}}
                </div>
            </div>
            <div class="ld-fta-relocation-right">
                <div class="ld-fta-relocation-camera_area">
                    <div class="ld-fta-relocation-camera_container">
                        <p>左</p>
                        <div>
                            <canvas id='canvasLeft'>
                                当前浏览器不支持canvas，请更换浏览器后再试！
                            </canvas>
                        </div>
                    </div>
                    <div class="ld-fta-relocation-camera_container">
                        <p>右</p>
                        <div>
                            <canvas id='canvasRight'>
                                当前浏览器不支持canvas，请更换浏览器后再试！
                            </canvas>
                        </div>
                    </div>
                </div>
                <div class="ld-fta-relocation-prompt_area">
                    <p class="ld-fta-relocation-prompt_title">注意：</p>
                    <p>
                        <span>1、确认已按下急停按钮</span>
                        <span>2、把车推至附近的marker贴纸处</span>
                    </p>
                    <p>
                        3、调整车的位置，尽量使marker出现在绿框内，使摄像头能成功扫描到marker
                    </p>
                </div>
            </div>
        </div>
        <!-- 重置定位弹窗 -->
        <el-dialog
            title="重定位提示"
            :visible.sync="resetLocationVisible"
            custom-class="rese_location_dialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            width="700px"
            >
            <span>重置定位将清空原来的地图定位数据，是否继续？</span>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel-btn" @click="resetLocationVisible = false">取消</el-button>
                <el-button class="confirm-btn" @click="resetLocationConfirm" v-loading.fullscreen.lock="fullscreenLoading">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                operatingList: [ // 操作按钮列表
                    {
                        name: '矫正定位'
                    },
                    {
                        name: '重置定位'
                    }
                ],
                activeCurOperating: 0,
                resetLocationVisible: false,
                fullscreenLoading: false,
                urlList: [
                    {
                        canvasId: 'canvasLeft',
                        imgUrl: '/getLeftMarkerImg',
                        timer: null
                    },
                    {
                        canvasId: 'canvasRight',
                        imgUrl: '/getRightMarkerImg',
                        timer: null
                    }
                ],
                loadingTimer: null,
                createPictureTimer: null
            }
        },
        watch:{
            positionSuccess: {
                handler(newVal, oldVal) {
                    if(newVal) {
                        const loading = this.$loading({
                            lock: true,
                            text: '定位已恢复正常',
                            spinner: 'el-icon-check',
                            background: 'rgba(0, 0, 0, 0.7)',
                            customClass: 'relocation-loading'
                        });
                        this.loadingTimer && clearTimeout(this.loadingTimer)
                        this.loadingTimer = setTimeout(() => {
                            loading.close()
                        }, 3000)
                    }
                },
                immediate: true,
                deep: true
            }
        },
        beforeRouteEnter(to,from,next) {
            next((vm) => {
                vm.$nextTick(() => {
                    vm.createPictureTimer && clearTimeout(vm.createPictureTimer)
                    vm.createPictureTimer = setTimeout(() => {
                            vm.urlList.forEach(item => {
                            vm.createPictureSrc(item)
                        })
                    }, 100)
                })
            })
        },
        beforeRouteLeave(to,from,next) {
            this.urlList.forEach(item => {
                item.timer && clearTimeout(item.timer)
            })
            next()
        },
        computed: {
            ...mapGetters([
                'robotStatus',
                'positionSuccess'
            ]),
        },
        mounted () {
            this.urlList.forEach(item => {
                this.createPictureSrc(item)
            })
        },
        methods:{
            chooseOperating(item, index) {
                this.activeCurOperating = index
                if(index != 0) {
                    this.resetLocationVisible = true
                }
            },
            resetLocationConfirm() {
                if(this.robotStatus.robotBaseStatus === 1) {
                    this.$message.warning({
                        message: '导航中不可以重新定位'
                    })
                    this.resetLocationVisible = false
                }else {
                    this.$websocket.sendSock({pack_type: 8, data: {}})
                }
                this.resetLocationVisible = false
            },
            createPictureSrc(item) {
                let imageData = new Image()
                let canvaData = document.getElementById(item.canvasId)
                let context = canvaData.getContext("2d")
                imageData.crossOrigin = ''
                imageData.src = 'http://127.0.0.1:8071/fta-client'+ item.imgUrl + '?' + new Date().getTime()
                imageData.onload = function (){
                    context.drawImage(imageData, 0, 0, 300, 150)
                }
                this.getImgSrc(item)
            },
            getImgSrc(item) {
                let imageData = new Image()
                let canvaData = document.getElementById(item.canvasId)
                let context = canvaData.getContext("2d")
                imageData.crossOrigin = ''
                imageData.src = 'http://127.0.0.1:8071/fta-client'+ item.imgUrl + '?' + new Date().getTime()
                imageData.onload = function (){
                    context.drawImage(imageData, 0, 0, 300, 150)
                }
                item.timer && clearTimeout(item.timer)
                item.timer = setTimeout(() => {
                    this.getImgSrc(item)
                }, 100)
            }
        }
    }
</script>

<style lang="scss">
    .ld-fta-relocation {
        flex-grow: 1;
        .ld-fta-relocation-container {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-weight: 400;
            font-size: 20px;
            .ld-fta-relocation-left {
                width: 240px;
                height: 100%;
                background: #f4f8fb;
                .ld-fta-relocation-operating_button {
                    height: 180px;
                    line-height: 180px;
                    text-align: center;
                    font-size: 40px;
                    color: #3e4fb4;
                    background: #f4f8fb;
                }
                .active {
                    background: #3e4fb4;
                    color: #fff;
                }
            }
            .ld-fta-relocation-right {
                flex-grow: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 20px;
                box-sizing: border-box;
                .ld-fta-relocation-camera_area {
                    width: 100%;
                    display: flex;
                    flex-grow: 1;
                    .ld-fta-relocation-camera_container {
                        width: 50%;
                        text-align: center;
                        font-size: 40px;
                        color: #656565;
                        display: flex;
                        flex-direction: column;
                        >div {
                            background: #000;
                            margin-top: 10px;
                            flex-grow: 1;
                            #canvasLeft, #canvasRight {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .ld-fta-relocation-camera_container + .ld-fta-relocation-camera_container {
                        margin-left: 10px;
                    }
                }
                .ld-fta-relocation-prompt_area {
                    font-size: 24px;
                    color: #808080;
                    height: 150px;
                    .ld-fta-relocation-prompt_title {
                        font-size: 30px;
                        color: #000;
                        margin-bottom: 20px;
                    }
                    p {
                        margin-top: 20px;
                    }
                    span + span {
                        margin-left: 30px;
                    }
                }
            }
        }
        .rese_location_dialog {
            .el-dialog__body {
                font-size: 30px;
                color: #474747;
            }
        }
    }
    .relocation-loading .el-loading-spinner {
        margin-top: -90px;
        font-size: 90px;
        i {
            color: #FFF;
            background: #1fb757;
            padding:6px;
            border-radius: 50%;
        }
        .el-loading-text {
            margin-top: 45px;
            font-size: 40px;
            color: #fff;
        }
    }
</style>