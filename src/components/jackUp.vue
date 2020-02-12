<template>
    <div class="ld-jackUp" v-show="showJackUp">
        <div class="main">
            <h3 class="title">顶升操作</h3>
            <div class="close" @click="closeJackUp"><i>✖</i></div>
            <!-- <div class="progress">
                <div class="decline">下降</div>
                <div class="progress-box" ref="progressBox">
                    <div class="progress-bar" ref="progressBar"></div>
                </div>
                <div class="rise">上升</div>
            </div> -->
            <div class="current-status">{{currentStatus}}</div>
            <div class="btn-box" :class="{'btnCenter': footerBtns.length===1}">
                <el-button 
                    @click="handleBtn(item)" 
                    v-for="(item, index) in footerBtns" :key="index" 
                    :disabled="item.disable" 
                    :style="{
                        background: item.bgColor ? item.bgColor : '', 
                        borderColor: item.bgColor ? item.bgColor : item.txtBorderColor ? item.txtBorderColor : '', 
                        color: item.txtBorderColor ? item.txtBorderColor : ''
                    }"
                    :class="{'hasBgColor': item.hasBgColor, 'hasBgColorDisabled': item.disable && item.hasBgColor, 'noBgColorDisabled': item.disable && !item.hasBgColor,}">
                        {{item.title}}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {
            currentStatus: '',
            footerBtns: [
                {
                    title: '下降',
                    disable: false,
                    identify: 'down',
                    type: 46,
                    opeType: 1,
                    hasBgColor: true,
                    bgColor: 'red'
                },
                {
                    title: '升起',
                    identify: 'up',
                    disable: false,
                    type: 46,
                    opeType: 0,
                    hasBgColor: true
                }
            ]
        }
    },
    props: {
        showJackUp: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters([
            'jackUpPercent',
            'jackUpStatus'
        ])
    },
    mounted () {
        
	},
    methods: {
        ...mapMutations({
            saveJackUpPercent: 'JACKUP_PERCENT',
            saveJackUpStatus: 'JACKUP_STATUS',
            saveShowJackUp: 'SHOW_JACKUP',
            saveShowJackUpWork: 'SHOW_JACKUP_WORK'
        }),
        handleBtn(item) {
            // opeType： 0-上升 1-下降 2-暂停
            this.$websocket.sendSock({pack_type: item.type, data: {opeType: item.opeType}})
            // 提示文案
            if (item.identify === 'up') {
                this.currentStatus = '上升中'
            }
            if (item.identify === 'down') {
                this.currentStatus = '下降中'
            }
            if (item.identify === 'stop') {
                this.currentStatus = '暂停中'
            }
            // 按钮展示
            if (item.identify === 'up' || item.identify === 'down') { // 升起，降下
                this.footerBtns = []
                this.footerBtns.push({
                    title: '暂停',
                    disable: false,
                    identify: 'stop',
                    type: 46,
                    opeType: 2,
                    hasBgColor: true,
                    bgColor: '#ff9800'
                })
            } else { // 暂停
                this.footerBtns = []
                this.footerBtns = [{
                    title: '下降',
                    disable: false,
                    identify: 'down',
                    type: 46,
                    opeType: 1,
                    hasBgColor: true,
                    bgColor: 'red'
                }, {
                    title: '升起',
                    disable: false,
                    identify: 'up',
                    type: 46,
                    opeType: 0,
                    hasBgColor: true
                }]
            }
        },
        closeJackUp() {
            // 关闭顶升操作弹窗
            this.saveShowJackUp(false)
            this.currentStatus = '工作中'
            // 显示顶升工作中提示弹窗
            // this.saveShowJackUpWork(true)
        }
    },
    watch: {
        jackUpPercent(newVal, oldVal) {
            console.log('顶升进度', newVal);
        },
        showJackUp(newVal, oldVal) {
            console.log('展示顶升操作页面');
            if (newVal) {
                this.currentStatus = ''
                this.footerBtns = []
                this.footerBtns = [ // jackUpStatus:  0-最顶 1-最低
                    {
                        title: '下降',
                        disable: false, // this.jackUpStatus === 1 ? true : false,
                        identify: 'down',
                        type: 46,
                        opeType: 1,
                        hasBgColor: true,
                        bgColor: 'red'
                    },
                    {
                        title: '升起',
                        identify: 'up',
                        disable: false, // this.jackUpStatus === 0 ? true : false,
                        type: 46,
                        opeType: 0,
                        hasBgColor: true
                    }
                ]
            }
        }
    }
}
</script>

<style lang="scss">
.ld-jackUp {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 2020;
    background: rgba(0, 0, 0, .3);
    .main {
        padding: .1rem;
        width: 6rem;
        position: absolute;
        left: 50%; top: 50%;
        background: #fff;
        border-radius: 5px;
        transform: translate3d(-50%, -50%, 0);
        h3 {
            line-height: 1.2rem;
            font-size: .4rem;
            text-align: center;
        }
        .close {
            position: absolute;
            right: 0px; top: 0px;
            width: .8rem; height: .8rem;
            line-height: .8rem;
            text-align: center;
            // background: #000;
            i {
                display: block;
                margin: .16rem auto;
                width: .4rem; height: .4rem;
                line-height: .4rem;
                font-size: .2rem;
                color: #fff;
                background: rgba(0, 0, 0, .4); ;
                border-radius: 50%;
            }
        }
        .progress {
            height: .4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .decline, .rise {
                font-size: .1rem;
                padding: .08rem;
            }
            .progress-box {
                flex: 1;
                height: .08rem;
                position: relative;
                border: 1px solid #3F50B5;
                border-radius: 100px;
                .progress-bar {
                    width: 0px; height: 100%;
                    position: absolute;
                    left: 0; top: 0;
                    background: #3F50B5;
                    border-radius: 100px;
                    transition: width .5s linear;
                }
            }
        }
        .current-status {
            height: .8rem;
            line-height: .4rem;
            text-align: center;
            font-size: .3rem;
        }
        .btn-box {
            height: 120px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            .el-button {
                flex: 1;
                width: .6rem; height: 120px;
                text-align: center;
                font-size: 54px;
                color: #3F50B5;
                border: 1px solid #3F50B5;
                border-radius: 10px;
            }
            .hasBgColor {
                color: #fff;
                background: #3F50B5;
                border: 1px solid #3F50B5;
            }
            .hasBgColorDisabled {
                color: #fff;
                opacity: .3;
                border: 1px solid rgba(255,255,255,0.66);
            }
            .noBgColorDisabled {
                color: #fff!important;
                background: #b8b8b9;
                border: 1px solid #969697!important;
            }
        }
        .btnCenter {
            width: 4rem;
            margin: auto;
        }
    }
}

</style>
