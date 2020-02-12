<template>
   	<div class="ld-ready ld-flex">
		<h2>AMR准备工作中</h2>
		<!-- 操作区 -->
        <div class="operate">
            <el-button 
                @click="handleBtn" 
                :disabled="!positionSuccess"
                :class="{'hasBgColor': positionSuccess, 'hasBgColorDisabled': !positionSuccess}">
                    开始工作
            </el-button>
        </div>
   	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            loading: false
        }
    },
    computed: {
        ...mapGetters([
            'scheduleGuideTip',
            'positionSuccess',
            'footerBtns',
            'allButtonCannotClick' // 按钮是否可点击
        ])
    },
    methods:{
        ...mapMutations({
            saveAllButtonCannotClick: 'ALL_BUTTON_CANNOT_CLICK', // 按钮2s后允许点击
        }),
		handleBtn() {
            if (this.allButtonCannotClick) {
                this.$message.warning({
                    message: '请勿频繁操作!',
                    showClose: true,
                    customClass: 'ld-message'
                })
                return false
            }
            this.saveAllButtonCannotClick(true)
            this.$websocket.sendSock({pack_type: 41, data: {}})
        }
    }
    
}
</script>

<style lang="scss">
.ld-ready {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    padding: .05rem;
    h2 {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        text-align: center;
        color: #20B759;
    }
    .operate {
        width: 5rem;
        margin: auto;
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
            background: #b8b8b9;
            border: 2px solid rgba(255,255,255,0.66);
        }
    }
}
</style>
