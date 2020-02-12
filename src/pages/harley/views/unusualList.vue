<template>
    <div class="ld-fta-flex ld-fta-short-picking">
        <div class="ld-fta-flex">
            <el-table
                class="ld-fta-table"
                :data="shortPickingData"
                border
                height="100"
                :highlight-current-row="true"
                header-align="center"
            >
                <el-table-column
                    prop="stationName"
                    label="货位"
                    class-name="ld-fta-table_FF9800"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="LPN"
                    label="LPN"
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
                    label="应拣">
                </el-table-column>
            </el-table>
        </div>
        <div class="ld-fta-footer_btn" :class="{'footer-single-btn': footerBtns.length === 1}">
            <el-button
                class="footer-btn"
                @click="clickBtn(item.type)" 
                v-for="(item, index) in footerBtns" :key="index" 
                :disabled="item.disable" 
                :style="{
                    background: item.bgColor ? item.bgColor : ''
                }"
            >
                {{ item.title }}
            </el-button>
        </div>
    </div>
</template>

<script>

    import { mapGetters, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                shortPickingData:[
                    {
                        stationName: 'S-1-1-01',
                        LPN: 20190289,
                        code: '51836-08',
                        name: 'GLOVES-GMIC,F/L,MIX MEDIA,COOL,LTHR,BLK',
                        shouldPicking: 3
                    },
                    {
                        stationName: 'S-1-1-01',
                        LPN: 20190289,
                        code: '51836-08',
                        name: 'GLOVES-GMIC,F/L,MIX MEDIA,COOL,LTHR,BLK',
                        shouldPicking: 3
                    },
                    {
                        stationName: 'S-1-1-01',
                        LPN: 20190289,
                        code: '51836-08',
                        name: 'GLOVES-GMIC,F/L,MIX MEDIA,COOL,LTHR,BLK',
                        shouldPicking: 3
                    },
                    {
                        stationName: 'S-1-1-01',
                        LPN: 20190289,
                        code: '51836-08',
                        name: 'GLOVES-GMIC,F/L,MIX MEDIA,COOL,LTHR,BLK',
                        shouldPicking: 3
                    }
                ]
            }
        },
        computed: {
            ...mapGetters([
                'footerBtns', // 底部按钮信息
                'allButtonCannotClick', // 按钮是否可点击
                'currentTaskInfo', // 任务信息
            ])
        },
        methods: {
            ...mapMutations({
                saveAllButtonCannotClick: 'ALL_BUTTON_CANNOT_CLICK', // 按钮 2s 后允许点击
            }),
            clickBtn(type) {
                if (this.allButtonCannotClick) {
                    this.$message.warning({
                        message: '请勿频繁操作!',
                        showClose: true,
                        customClass: 'ld-message'
                    })
                    return false
                }
                this.saveAllButtonCannotClick(true)
                // this.$websocket.sendSock({ pack_type: type, data: {} })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>