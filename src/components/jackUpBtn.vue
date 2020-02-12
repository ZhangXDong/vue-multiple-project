<template>
    <div class="ld-jackup-button" v-show="showJackUpBtn">
        <el-button @click="handleJackUp">操作顶升</el-button>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    props: {
        showJackUpBtn: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations({
            saveShowJackUp: 'SHOW_JACKUP',
            saveShowJackUpWork: 'SHOW_JACKUP_WORK',
        }),
        handleJackUp() {
            // 关闭顶升工作中提示弹窗
            // this.saveShowJackUpWork(false)
            // 发送socket暂停顶升
            // this.$websocket.sendSock({pack_type: 111, data: {}})
            // 显示顶升操作弹窗
            this.saveShowJackUp(true)
        }
    }
}
</script>

<style lang="scss">
.ld-jackup-button {
    position: absolute;
    top: 1.215rem; right: .2rem;
    .el-button {
        width: 2rem; height: .9rem;
        text-align: center;
        font-size: .3rem;
        color: #3F50B5;
        border: 1px solid #3F50B5;
    }
}
</style>