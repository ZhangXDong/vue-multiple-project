<template>
    <div class="ld-fta-flex ld-fta-navigate">
        <!-- 条形码 -->
        <!-- <barcode v-if="gatherOrder.showBarcode"></barcode> -->
        <!-- 任务号/储位/按钮 -->
        <!-- :class="{'diff-taskNo-position': !gatherOrder.showBarcode }" -->
        <div class="ld-fta-flex ld-fta-navigate-taskNo-position">
            <!-- 任务号 -->
            <div class="ld-fta-navigate_taskNo">
                <span class="ld-fta-navigate_label">任务号：</span>
                <span class="ld-fta-navigate_taskNo-content">{{ gatherOrder && gatherOrder.orderSetList[0].name }}</span>
            </div>
            <!-- 当前位置 -->
            <div class="ld-fta-navigate_position">
                <span class="ld-fta-barcode_label">{{ footerBtns && footerBtns.length > 0 ? '正在前往' : '当前位置' }}：</span>
                <span class="ld-fta-navigate_position-content">{{ stationInfo && stationInfo.externalStationName ? stationInfo.externalStationName : stationInfo.stationType }}({{ stationInfo && stationInfo.stationName }})</span>
            </div>
        </div>
        <div class="ld-fta-navigate-btn">
            <el-button
                class="navigate-btn"
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

    import barcode from '@/components/Barcode.vue'

    import { mapGetters, mapMutations } from 'vuex'

    import JsBarcode from 'jsbarcode'

    export default {
        components: {
            barcode,
        },
        computed: {
            ...mapGetters([
                'footerBtns', // 底部按钮信息
                'allButtonCannotClick', // 按钮是否可点击
                'gatherOrder', // 任务信息
                'stationInfo', // 储位信息
            ])
        },
        methods: {
            ...mapMutations({
                saveAllButtonCannotClick: 'ALL_BUTTON_CANNOT_CLICK', // 按钮 2s 后允许点击
                saveFooterBtns: 'FOOTER_BTNS', // 底部按钮修改
            }),
            clickBtn(type) {
                if (this.allButtonCannotClick) {
                    this.$message.warning({
                        message: '请勿频繁操作!',
                        showClose: false,
                        customClass: 'ld-message'
                    })
                    return false
                }
                this.saveAllButtonCannotClick(true)
                this.$websocket.sendSock({ pack_type: type, data: {} })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ld-fta-navigate {
        .ld-fta-navigate-taskNo-position {
            line-height: 48px;
            font-size: 36px;
            text-align: center;
            justify-content: center;
            .ld-fta-navigate_position {
                line-height: 48px;
                height: 48px;
                display: flex;
                justify-content: center;
                margin-top: 15px;
                .ld-fta-navigate_position-content {
                    display: inline-block;
                    color: #FF9800;
                    font-size: 48px;
                }
            }
        }
        .diff-taskNo-position {
            line-height: 68px;
            font-size: 56px;
            .ld-fta-navigate_position {
                line-height: 68px;
                height: 68px;
                margin-top: 30px;
                .ld-fta-navigate_position-content {
                    font-size: 68px;
                }
            }
        }
        .ld-fta-navigate-btn {
            display: flex;
            justify-content: space-between;
            .navigate-btn {
                width: 600px;
                height: 150px;
                font-size: 53px;
                color: #fff;
            }
        }
    }
</style>
