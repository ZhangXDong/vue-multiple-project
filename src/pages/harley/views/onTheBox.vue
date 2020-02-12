<template>
    <div class="ld-fta-flex ld-fta-on-the-box">
        <div class="ld-fta-flex">
            <el-table
                class="ld-fta-table"
                :data="gridData"
                border
                height="100"
                :highlight-current-row="true"
                header-align="center"
                :row-class-name="tableRowClassName">
            >
                <el-table-column
                    prop="latticeNo"
                    label="格子号"
                    class-name="ld-fta-table_009688"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="containerName"
                    label="箱型"
                    class-name="ld-fta-table_FF9800"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="containerCode"
                    align="center"
                    class-name="ld-fta-table_name"
                    label="箱号">
                </el-table-column>
                <el-table-column
                    prop="scanStatus"
                    align="center"
                    label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.scanStatus ? '已扫描' : '未扫描'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div class="ld-fta-table_btn">
                            <el-button
                                size="mini"
                                @click="handlePrint(scope.row)"
                                :class="{'ld-fta-table_btn-bd': scope.row.printStatus}"
                            >
                                {{ scope.row.printStatus ? '补打' : '打印' }}
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="ld-fta-on-the-box_btn">
            <el-button
                class="ld-fta-on-the-box_footer-btn"
                :disabled="isDisabled"
                @click="leaveBoxArea"
                :loading="btnLoading"
            >
                出发
            </el-button>
        </div>
        <!-- 提示弹窗 -->
        <el-dialog
            title="错误提示"
            :visible.sync="tipsVisible"
            custom-class="tips-dialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            width="200px"
            >
            <span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconcuowu"></use>
                </svg>
                箱标签扫描错误，请检查！
            </span>
        </el-dialog>
        <lodopPrint ref="lodopPrint" v-if="lodopPrintShow"></lodopPrint>
    </div>
</template>

<script>

    import {
        getUpContainerList, // 获取箱型列表
        leaveBoxArea,
        getPrintInfo, // 打印信息
    } from './../serve/index.js'

    import { mapGetters, mapMutations } from 'vuex'

    import lodopPrint from "@/components/lodopPrint.vue";

    export default {
        components: {
            lodopPrint
        },
        data() {
            return {
                gridData: [],
                tipsVisible: false, // dialog
                tipsVisibleTimer: null, // 自动关闭 dialog 定时器
                isDisabled: true, // 出发按钮是否可点击 
                btnLoading: false, // 出发按钮的 loading
                code: '',
                codeTimer: null,
                lodopPrintShow: false
            } 
        },
        watch: {
            tipsVisible(val){
                if(val){
                    this.tipsVisibleTimer && clearTimeout(this.tipsVisibleTimer)
                    this.tipsVisibleTimer = setTimeout(() => {
                        this.tipsVisible = false
                    }, 1000)
                }
            }
        },
        computed: {
            ...mapGetters([
                'robotInfo', // customerId
                'gatherOrder', // 任务
            ])
        },
        
        methods: {
            ...mapMutations({
                saveStartNormal: 'FTA_SAVE_STARTNORMAL',
                saveErrorShutDownLoading: 'ERROR_SHUTDOWN_LOADING'
            }),
            getUpContainerList() { // 获取箱子列表
                if(!this.robotInfo || !this.gatherOrder) {
                    setTimeout(() => {
                        this.getUpContainerList()
                    }, 100)
                    return console.warn('暂未获取到参数')
                }
                getUpContainerList({ customerId: this.robotInfo.customerId, pickingId: this.gatherOrder.orderSetList[0].businessOrderId }).then(res => {
                    if(res.status.statusCode === 0){
                        this.gridData = res.result
                        this.gridData.map(item => {
                            this.$set(item, 'scanStatus', false)
                            this.$set(item, 'printStatus', false)
                        })
                    }
                    else {
                        this.$message.error({
							message: res.status.statusReason,
							showClose: true
						})
                    }
                }).catch(err => {
                    this.getUpContainerList() 
                })
            },
            leaveBoxArea() { // 出发
                this.btnLoading = true
                leaveBoxArea({ id: this.gatherOrder.orderSetList[0].taskId }).then(res => {
                    if(res.status.statusCode === 0){
                        return console.warn('已出发')
                    }
                    else {
                        this.btnLoading = false
                        this.$message.error({
							message: res.status.statusReason,
							showClose: true
						})
                    }
                })
            },
            tableRowClassName({row, rowIndex}) { // 改变已打印状态的当前行的颜色
                if (row.scanStatus) {
                    return 'success-row'
                }
                return ''
            },
            handlePrint(row){ // 打印
                this.curItem = row
                this.getPrintInfo(this.curItem.id)
            },
            getPrintInfo(id) {
                this.saveStartNormal(false)
                getPrintInfo({ subOrderId: id}).then(res => {
                    if(res.status.statusCode === 0){
                        let msgArr = []
                        msgArr.push(res.result)
                        this.printPaper(msgArr)
                    }
                    else {
                        this.saveStartNormal(true)
                        this.$message.error({
							message: res.status.statusReason,
							type: 'error',
							showClose: true
						})
                    }
                }).catch(err => {
                    this.saveStartNormal(true)
                })
            },
            printCallBack(printStatus) {
                if(printStatus){
                    if(this.curItem.printStatus) return this.saveStartNormal(true)
                    this.gridData.map(item => {
                        if(item.id === this.curItem.id){
                            this.$set(item, 'printStatus', true)
                            return this.saveStartNormal(true)
                        }
                    })
                }
            },
            // lodop打印纸质单
            printPaper(msg) {
                this.lodopPrintShow = true
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.lodopPrint.init(msg, this.printCallBack)
                    }, 500)
                })
            },
            allScanStatusTrue() { // 判断出发按钮是否可点击
                return this.isDisabled = this.gridData.some( item => {
                    return !item.scanStatus
                })
            },
            changeScanStatus(code) { // 改变扫描状态
                let matchingIndex
                this.gridData.some((item,index) => {
                    return item.containerCode == code.trim() ? matchingIndex = index : false
                })
                if(matchingIndex > -1){
                    if(this.gridData[matchingIndex].scanStatus) return this.code = ''
                    this.$set(this.gridData[matchingIndex], 'scanStatus', true)
                    this.allScanStatusTrue()
                }
                else {
                    //  扫描箱标签错误
                    this.tipsVisible = true
                }
                this.code = ''
            }
        },
        mounted() {
            this.getUpContainerList()
            document.onkeypress = (e) => {
                const key = window.event.charCode
                this.code += String.fromCharCode(key)
                this.codeTimer && clearTimeout(this.codeTimer)
                this.codeTimer = setTimeout(() => {
                    this.changeScanStatus(this.code)
                }, 300)
            }
        },
    }
</script>

<style lang="scss">
    .ld-fta-on-the-box {   
        .ld-fta-on-the-box_btn {
            display: flex;
            justify-content: center;
            align-items: center;
            .ld-fta-on-the-box_footer-btn {
                width: 500px;
                height: 150px;
                font-size: 72px;
                background: #3F50B5;
                color: #fff;
                position: relative;
                left: 0;
                top: 0;
                .el-icon-loading {
                    position: absolute;
                    right: 90px;
                }
            }
        }
        .el-table .success-row {
            background: #F0FBE3;
        }
    }
</style>
