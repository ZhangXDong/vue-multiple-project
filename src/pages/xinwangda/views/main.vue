<template>
    <div class="ld-fta-content ld-fta-flex">
        <!-- 头部 -->
        <fta-header></fta-header>
        <!-- 内容区 -->
        <div class="ld-fta-flex ld-fta-container">
            <router-view />
        </div>
        <!-- 配置弹出框 -->
        <el-dialog
            title=""
            custom-class="msg-dialog"
            :visible.sync="configuration.dialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            :center="true"
            >
            <div class="content-dialog">
				<div class="title" v-if="configuration.isWarning"><i class="el-icon-warning"> </i><span> 警告</span></div>
                <span v-html="configuration.msg"></span>
                <div class="status-code" v-if="configuration.statusCode">状态码：{{configuration.statusCode}}</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialog">{{configuration.btn}}</el-button>
            </span>
        </el-dialog>
        <!-- 顶升工作中 -->
        <jackUpWork :showJackUpWork="showJackUpWork" @handleJackUp="handleJackUp"></jackUpWork>
        <!-- 顶升弹窗 -->
        <jackUp :showJackUp="showJackUp"></jackUp>
    </div>
</template>

<script>
import ftaHeader from '@/components/Header.vue'
import jackUp from '@/components/jackUp.vue'
import jackUpWork from '@/components/jackUpWork.vue'
import { mapMutations, mapGetters } from 'vuex'
export default {
    components: {
        ftaHeader,
        jackUp,
        jackUpWork,
    },
    computed: {
        ...mapGetters([
            'showJackUp',
            'showJackUpWork',
            'configuration',
        ]),
    },
    methods: {
        ...mapMutations({
            saveShowJackUp: 'SHOW_JACKUP',
            saveConfiguration: 'FTA_SAVE_CONFIGURATION',
        }),
        closeDialog() {
            this.saveConfiguration({
                ...this.configuration,
                dialogVisible: false
            })
        },
        // 操作顶升
        handleJackUp() {
            this.saveShowJackUp(true)
        }
    }
}
</script>

<style lang="scss" scoped>
.ld-fta-content {
    
}
</style>
