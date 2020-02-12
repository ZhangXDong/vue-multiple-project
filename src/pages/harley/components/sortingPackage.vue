<template>
    <div class="ld-fta-flex ld-fta-sorting-package">
        <div class="ld-fta-flex">
            <el-table
                class="ld-fta-table"
                :data="packageList"
                border
                height="100"
                :highlight-current-row="true"
                :row-class-name="tableRowClassName"
                header-align="center"
            >
                <el-table-column
                    prop="stationName"
                    label="发运单号"
                    class-name="ld-fta-table_FF9800"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="LPN"
                    label="经销商"
                    class-name="ld-fta-table_FF9800"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="code"
                    align="center"
                    class-name="ld-fta-table_009688"
                    label="条码">
                </el-table-column>
                <el-table-column
                    prop="name"
                    align="center"
                    class-name="ld-fta-table_name"
                    label="名称">
                </el-table-column>
                <el-table-column
                    prop="shouldPicking"
                    align="center"
                    class-name="ld-fta-table_red"
                    label="数量">
                </el-table-column>
            </el-table>
        </div>
        <div class="ld-fta-sorting-package-footer">
            <div class="ld-fta-sorting-package-footer_box-type">
                <div class="ld-fta-sorting-package-footer_title">
                    扫描指定箱标签
                    <span></span>
                </div>
                <div class="ld-fta-sorting-No_container ld-fta-flex">
                    <div class="ld-fta-sorting-No_wraper">
                        <div v-for="(item, index) in sortList" :key="index" class="ld-fta-sorting-No">
                            <span class="ld-fta-sorting-No_index">{{ index + 1 }}</span>
                            <span class="ld-fta-sorting-No_item">{{ item }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ld-fta-sorting-package-footer_package">
                <div class="ld-fta-sorting-package-footer_title">
                    选择包装方式
                </div>
                <div class="ld-fta-sorting-package-footer_select">
                    <el-select v-model="value" placeholder="请选择" @change="showNewBox = !showNewBox">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            size="medium"
                            class="ld-fta-sorting-package-footer_select-option"
                        >
                        </el-option>
                    </el-select>
                    <el-select v-model="value" placeholder="请选择" v-show="showNewBox">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            size="medium"
                            class="ld-fta-sorting-package-footer_select-option"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
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
    export default {
        data() {
            return {
                sortList: [
                    // '00004000000000000015',
                    // '00004000000000000016',
                    // '00004000000000000017'
                ],
                packageList: [
                    {
                        stationName: 'S-1-1-01',
                        LPN: '北京拉丝看得见撒可富吉林市解放路科技类看电视剧弗兰克',
                        code: '51836-08',
                        name: 'GLOVES-GMIC,F/L,MIX MEDIA,COOL,LTHR,BLK',
                        shouldPicking: 3
                    },
                    // {
                    //     stationName: 'S-1-1-01',
                    //     LPN: 20190289,
                    //     code: '51836-08',
                    //     name: 'GLOVES-GMIC,F/L,MIX MEDIA,COOL,LTHR,BLK',
                    //     shouldPicking: 3
                    // },
                    // {
                    //     stationName: 'S-1-1-01',
                    //     LPN: 20190289,
                    //     code: '51836-08',
                    //     name: 'GLOVES-GMIC,F/L,MIX MEDIA,COOL,LTHR,BLK',
                    //     shouldPicking: 3
                    // },
                    // {
                    //     stationName: 'S-1-1-01',
                    //     LPN: 20190289,
                    //     code: '51836-08',
                    //     name: 'GLOVES-GMIC,F/L,MIX MEDIA,COOL,LTHR,BLK',
                    //     shouldPicking: 3
                    // }
                ],
                showNewBox: false, // 是否展示箱号 select
                tipsVisibleTimer: null,
                tipsVisible: false,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
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
        methods: {
            tableRowClassName({row, rowIndex}) { // 改变已打印状态的当前行的颜色
                if (row.scanStatus) {
                    return 'success-row'
                }
                return ''
            },
        },
    }
</script>

<style lang="scss">
    .ld-fta-sorting-package {
        .ld-fta-sorting-package-footer {
            display: flex;
            flex-direction: row;
            height: 190px;
            .ld-fta-sorting-package-footer_box-type {
                width: 50%;
                display: flex;
                flex-direction: column;
            }
            .ld-fta-sorting-package-footer_package {
                display: flex;
                flex-direction: column;
                flex: 1;
                margin-left: 100px;
                .ld-fta-sorting-package-footer_select {
                    display: flex;
                    flex: 1;
                    justify-content: space-around;
                    align-items: center;
                    .el-select {
                        width: 216px;
                        height: 80px;
                        .el-input {
                            height: 100%;
                            .el-input__inner {
                                height: 100%;
                                border: 2px solid #3F51B5;
                                line-height: 80px;
                                font-size: 28px;
                                color: #3F51B5; 
                            }
                            ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                                font-size: 28px;
                                color: #3F51B5;
                            }
                            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                                font-size: 28px;
                                color: #3F51B5;
                            }
                            ::-moz-placeholder { /* Mozilla Firefox 19+ */
                                font-size: 28px;
                                color: #3F51B5;
                            }
                            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                                font-size: 28px;
                                color: #3F51B5;
                            }
                        }
                    }
                }
            }
            .ld-fta-sorting-package-footer_title {
                color: #918E8E;
                font-size: 36px;
                margin-bottom: 10px;
            }
        }
        .ld-fta-sorting-No_container {
            width: 620px;
            overflow: hidden;
            justify-content: center;
            .ld-fta-sorting-No_wraper {
                // width: 620px; // 解开这个 然后把上面的width小于这个 就可以隐藏滚动条
                overflow: auto;  
                .ld-fta-sorting-No {
                    box-sizing: border-box;
                    width: 600px;
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
            }
        }
    }
    .ld-fta-sorting-package-footer_select-option {
        height: 50px;
        line-height: 50px;
        font-size: 20px;
    }
</style>