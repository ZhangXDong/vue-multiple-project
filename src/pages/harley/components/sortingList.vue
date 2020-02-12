<template>
    <div class="ld-fta-sorting-list ld-fta-flex">
        <div class="ld-fta-sorting-No_container ld-fta-flex">
            <div class="ld-fta-sorting-No_total-box-number">
                <div class="total-box-number_label">总箱数：</div>
                <div class="total-box-number_content color-FF9800">{{ sortList && sortList.length }}</div>
            </div>
            <div class="ld-fta-sorting-No_wraper">
                <div v-for="(item, index) in sortList" :key="index" class="ld-fta-sorting-No" :class="{'correct-item': correctBoxLabelArr.indexOf(item.containerCode) > -1}">
                    <span class="ld-fta-sorting-No_index">{{ index + 1 }}</span>
                    <span class="ld-fta-sorting-No_item">{{ item.containerCode }}</span>
                </div>
            </div>
        </div>
        <div class="ld-fta-sorting-complete">
            <el-button
                class="ld-fta-sorting-complete-btn"
                :disabled="isDisabled"
                :loading="btnLoading"
                @click="sortingFinish"
            >
                <div>
                    分拣
                </div>
                <div>
                    完成
                </div>
            </el-button>
        </div>
        <!-- 提示框 -->
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
    </div>
</template>

<script>
    import {
        getContainerReceiverList, // 按经销商编号获取箱签列表
        sortingFinish, // 分拣完成
    } from './../serve/index.js'

    import { mapGetters, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                sortList: [],
                codeTimer: null,
                code: '',
                tipsVisible: false,
                tipsVisibleTimer: null,
                correctBoxLabelArr: [], // 扫描到的正确箱标签集合
                isDisabled: true,
                btnLoading: false
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
                'gatherOrder', // 任务
                'stationInfo', // 储位信息
                'robotInfo', // customerId
            ])
        },
        created() {
            this.getContainerReceiverList()
        },
        methods: {
            ...mapMutations({
                saveDistributorInfo: 'DISTRiIBUTOR_INFO',
            }),
            getContainerReceiverList() {
                if(!this.gatherOrder || !this.stationInfo) {
                    setTimeout(() => {
                        this.getContainerReceiverList()
                    }, 100)
                    return console.warn('暂未获取到参数')
                }  
                getContainerReceiverList({ pickingId: this.gatherOrder.orderSetList[0].businessOrderId, receiverId: this.stationInfo.externalStationName, stationName: this.stationInfo.externalStationName }).then(res => {
                    if(res.status.statusCode === 0){
                        this.sortList = res.result.containerList
                        this.saveDistributorInfo(
                            {
                                externalStationName: this.stationInfo.externalStationName,
                                distributorName: res.result.distributorName
                            }
                        )
                    }
                    else {
                        this.$message.error({
							message: res.status.statusReason,
							showClose: true
						})
                    }
                }).catch(err => {
                    setTimeout(() => {
                        this.getContainerReceiverList() 
                    }, 1000)
                })
            },
            judgeCorrectBoxLabel(str) { // 按断是否是正确的箱标签
                let matchingIndex
                let code = str.trim()
                this.sortList.some((item,index) => {
                    return item.containerCode === code ? matchingIndex = index : false
                })
                if(matchingIndex > -1){
                    if(this.correctBoxLabelArr.indexOf(code) > -1) return this.code = ''
                    this.correctBoxLabelArr.push(code)     
                    this.code = ''
                    this.allScanStatusTrue()
                }
                else {
                    //  扫描箱标签错误
                    this.tipsVisible = true
                }
                this.code = ''              
            },
            allScanStatusTrue() { // 判断分拣完成是否可点击
                this.isDisabled = this.sortList.length === this.correctBoxLabelArr.length ? false : true
            },
            sortingFinish() { // 分拣完成
                this.btnLoading = true
                sortingFinish({ containerList: this.sortList, pickingId: this.gatherOrder.orderSetList[0].businessOrderId, receiverId: this.stationInfo.externalStationName, stationName: this.stationInfo.externalStationName, customerId: this.robotInfo.customerId }).then(res => {
                    if(res.status.statusCode === 0){
                        return console.warn('分拣完成')
                    }
                    else {
                        this.btnLoading = false
                        this.$message.error({
							message: res.status.statusReason,
							showClose: true
						})
                    }
                })
            }
        },
        mounted() {
            document.onkeypress = (e) => {
                const key = window.event.charCode
                this.code += String.fromCharCode(key)
                this.codeTimer && clearTimeout(this.codeTimer)
                this.codeTimer = setTimeout(() => {
                   this.judgeCorrectBoxLabel(this.code)
                }, 300)
            }
        },
    }
</script>

<style lang="scss">
    .ld-fta-sorting-list {
        margin-top: 25px;
        flex-direction: column;
        align-items: center;
        .ld-fta-sorting-No_container {
            width: 700px;
            overflow: hidden;
            justify-content: center;
            .ld-fta-sorting-No_total-box-number {
                display: flex;
                justify-content: center;
                line-height: 50px;
                font-size: 40px;
                color: #918E8E;
                margin-bottom: 30px;
            }
            .ld-fta-sorting-No_wraper {
                width: 720px;
                overflow: auto;
                .ld-fta-sorting-No {
                    box-sizing: border-box;
                    width: 700px;
                    height: 70px;
                    line-height: 70px;
                    color: #3F51B5;
                    font-size: 36px;
                    border: 2px solid #3F51B5;
                    border-radius: 5px;
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 2px;
                    .ld-fta-sorting-No_index {
                        display: inline-block;
                        font-size: 48px;
                        width: 20px;
                        padding: 0 20px;
                        text-align: center
                    }
                    .ld-fta-sorting-No_item {
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                    }
                }
                .correct-item {
                    background: #3F51B5;
                    color: #fff;
                }
            }
        }
        .ld-fta-sorting-complete {
            position: fixed;
            top: 270px;
            right: 10px;
            .ld-fta-sorting-complete-btn {
                width: 200px;
                height: 400px;
                font-size: 72px;
                background: #3F50B5;
                color: #fff;
                position: relative;
                left: 0;
                top: 0;
                .el-icon-loading {
                    position: absolute;
                    right: 64px;
                    bottom: 50px;
                }
            }
        }
    }
</style>