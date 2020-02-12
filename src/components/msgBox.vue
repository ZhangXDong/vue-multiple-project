<template>
    <div class="ld-msgBox" v-if="showMsgBox">
        <div class="msgbox">
            <div class="main">
                <h3>提示</h3>
                <p><span :style="{color: msgBoxObj.tipsColor}">{{msgBoxObj.tipsText}}</span></p>
            </div>
            <div class="btn">
                <div class="btn-item cancel" v-if="msgBoxObj.cancelBtnText" @click="msgBoxObj.cancelFunc">{{ msgBoxObj.cancelBtnText }}</div>
                <div class="btn-item confirm" :style="{color: msgBoxObj.confirmBtnColor}" @click="msgBoxObj.confirmFunc">{{ msgBoxObj.confirmBtnText }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        showMsgBox: {
            type: Boolean,
            default: false
        },
        msgBoxObj: {
            type: Object,
            default: () => {
                return {
                    tipsText: '提示文案',
                    tipsColor: '#ff9821',
                    cancelBtnText: '取消',
                    confirmBtnText: '确认',
                    confirmBtnColor: '#259b24',
                    cancelFunc: () => {
                        this.showMsgBox = false
                    },
                    confirmFunc: () => {
                        this.showMsgBox = false
                    }
                }
            }
        }
    }
}
</script>
<style lang="scss">
.ld-msgBox {
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    z-index: 2021;
    background: rgba(0, 0, 0, .4);
    .msgbox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        left: 50%; top: 50%;
        width: 6rem;
        background: #fff;
        border-radius: 5px;
        transform: translate3d(-50%, -50%, 0);
        .main {
            padding: 0 .1rem .2rem;
            border-bottom: 1px solid #ddd;
            h3 {
                line-height: 1rem;
                font-size: .3rem;
                text-align: center;
                color: #252525;
            }
            p {
                padding: .1rem 0;
                text-align: center;
                span {
                    display: inline-block;
                    line-height: .8rem;
                    font-size: .35rem;
                    color: #ff9821;
                    text-align: left;
                }
            }
        }
        .btn {
            display: flex;
            border-top: 1px solid #bbb;
            .btn-item {
                box-sizing: border-box;
                flex: 1;
                line-height: .8rem;
                font-size: .35rem;
                text-align: center;
                color: #616262;
            }
            .cancel {
                border-right: 1px solid #ddd;
            }
            .confirm {
                color: #259b24;
            }
        }
    }
}
</style>
