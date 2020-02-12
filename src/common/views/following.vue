<template>
    <div class="ld-fta-flex ld-fta-following">
        <div class="ld-fta-following-status_indicators">
            <img :src="followInfo.vehicleState">
            <p>{{followInfo.statusIndicators}}</p>
        </div>
        <div class="ld-fta-following-btn">
            <el-button
                class="navigate-btn"
                @click="clickBtn(item.type)" 
                v-for="(item, index) in followInfo.actionButtons" :key="index" 
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
        computed: {
            ...mapGetters([
                'allButtonCannotClick', // 按钮是否可点击
                'followInfo', // 任务信息
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
                this.$websocket.sendSock({ pack_type: type, data: {} })
                if(type == 19) {
                    this.$router.back()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ld-fta-following {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #313131;
        font-size: 30px;
        padding: 60px 150px;
        .ld-fta-following-status_indicators {
            text-align: center;
        }
        .ld-fta-following-btn {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .navigate-btn {
                width: 400px;
                height: 150px;
                font-size: 53px;
                color: #fff;
            }
        }
    }
</style>
