<template>
    <div class="ld-footer-btn">
        <div class="opreate" :class="{'btnCenter': footerBtns.length===1}">
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
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    props: {
        footerBtns: {
            type: Array,
            default: []
        },
        callback: {
            type: Function,
        }
    },
    computed: {
        ...mapGetters([
            'allButtonCannotClick' // 按钮是否可点击
        ])
    },
    methods: {
        ...mapMutations({
            saveAllButtonCannotClick: 'ALL_BUTTON_CANNOT_CLICK', // 按钮2s后允许点击
        }),
        handleBtn(item) {
            // 防暴击
            if (this.allButtonCannotClick) {
                this.$message.warning({
                    message: '请勿频繁操作!',
                    showClose: true,
                    customClass: 'ld-message'
                })
                return false
            }
            this.saveAllButtonCannotClick(true)

            // 有回调走回调，没有就发送一个消息结束
            if (this.callback) {
                this.callback(item)
                return false
            }

            this.$websocket.sendSock({pack_type:item.type, data: {}})
        },
    }
}
</script>

<style lang="scss">
.ld-footer-btn {
    .opreate {
        height: 150px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .el-button {
            flex: 1;
            min-width: .85rem; height: 150px;
            text-align: center;
            font-size: 54px;
            color: #3F50B5;
            border: 2px solid #3F50B5;
            border-radius: 10px;
        }
        .hasBgColor {
            color: #fff;
            background: #3F50B5;
            border: 2px solid #3F50B5;
        }
        .hasBgColorDisabled {
            color: #fff;
            opacity: .3;
            border: 2px solid rgba(255,255,255,0.66);
        }
        .noBgColorDisabled {
            color: #fff!important;
            background: #b8b8b9;
            border: 2px solid #b8b8b9!important;
        }
    }
    .btnCenter {
        width: 5rem;
        margin: auto;
    }
}
</style>