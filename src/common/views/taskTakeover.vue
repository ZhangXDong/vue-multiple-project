<template>
   	<div class="ld-taskTakeover ld-flex">
        <div class="container">
            <div class="select-box">
                <h3>选择故障AMR</h3>
                <el-select v-model="faultAMR" placeholder="请选择">
                    <el-option
                        v-for="item in AMROptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="select-box">
                <h3>选择故障类型</h3>
                <el-select v-model="faultType" placeholder="请选择">
                    <el-option
                        v-for="item in faultTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <!-- 操作区 -->
        <div class="operate">
            <el-button @click="handleBtn()" >
                任务接管
            </el-button>
        </div>
        <msgBox :showMsgBox="showMsgBox" :msgBoxObj="msgBoxObj"></msgBox>
   	</div>
</template>

<script>
import msgBox from '@/components/msgBox.vue'
import { getCarryOrder } from '@/serve/sunwodaMaterialCarry.js'
import { mapGetters, mapMutations } from 'vuex';
export default{
    data() {
        return {
            faultAMR: 111,
            faultType: 111,
            AMROptions: [],
            faultTypeOptions: [],
            showMsgBox: false,
            msgBoxObj: {
                tipsText: '故障AMR将下线，任务将转移至当前AMR',
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
    components: {
        msgBox
    },
    mounted() {
        this.init()
    },
    computed: {
        ...mapGetters([
			'startNormal',
			'startNormalText',
		]),
    },
    methods:{
        ...mapMutations({
            saveStartNormal: 'FTA_SAVE_STARTNORMAL',
            saveStartNormalText: 'FTA_SAVE_STARTNORMALTEXT' // 设置loading文案
        }),
        init() {

        },
        handleBtn() {
            this.showMsgBox = true
            this.msgBoxObj = {
                tipsText: '故障AMR将下线，任务将转移至当前AMR!',
                tipsColor: 'red',
                cancelBtnText: '取消',
                confirmBtnText: '确认',
                cancelFunc: () => {
                    this.showMsgBox = false
                },
                confirmFunc: () => {
                    this.showMsgBox = false
                    this.$socket.sendSock({pack_type: 11111, data: {}})
                    this.saveStartNormalText('正在转移任务，请稍候')
                    this.saveStartNormal(true)
                }
            }
        },
        goBack() {
            this.$router.back()
        },
        
    },
    watch: {
        'abc'(newVal, oldVal) {
            if (newVal) {
                // 关闭loading
                this.saveStartNormal(false)
                // 展示完成弹窗
                this.showMsgBox = true
                this.msgBoxObj = {
                    tipsText: '故障AMR任务转移完成!',
                    tipsColor: 'red',
                    cancelBtnText: '',
                    confirmBtnText: '我知道了',
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
.ld-taskTakeover {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #252525;
    background: #fff;
    .container {
        flex: 1;
        .select-box {
            text-align: center;
            h3 {
                font-size: .3rem;
                line-height: 1rem;
            }
            .el-select {
                .el-input__inner {
                    width: 400px; height: 60px;
                    font-size: .3rem;
                }
                .el-input__inner:focus {
                    border-color: #DCDFE6;
                }
            }
        }
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
            color: #fff;
            background: #3F50B5;
            border: 2px solid #3F50B5;
            border-radius: 10px;
        }
    }
}
// 下拉列表
.el-select-dropdown {
    .el-select-dropdown__empty {
        font-size: .3rem;
    }
    .el-select-dropdown__item {
        height: .2rem;
        line-height: .2rem;
        font-size: .3rem;
    }
}
</style>
