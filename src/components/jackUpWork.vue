<template>
    <div class="ld-jackUpWork" v-show="showJackUpWork">
        <div class="main">
            <h3 class="title">提示</h3>
            <p>顶升正在运行中</p>
        </div>
        <!-- 操作顶升 -->
        <jackUpBtn :showJackUpBtn="true"></jackUpBtn>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import jackUpBtn from '@/components/jackUpBtn.vue';
export default {
    components: {
        jackUpBtn
    },
    data() {
        return {
            
        }
    },
    props: {
        showJackUpWork: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters([
            'jackUpPercent'
        ])
    },
    mounted () {},
    methods: {
        ...mapMutations({
            saveShowJackUp: 'SHOW_JACKUP',
            saveShowJackUpWork: 'SHOW_JACKUP_WORK'
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
.ld-jackUpWork {
    padding: .1rem;
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 2019;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(0, 0, 0, .3);
    .main {
        padding: .2rem;
        width: 4.2rem;
        position: absolute;
        left: 50%; top: 50%;
        background: #fff;
        border-radius: 5px;
        transform: translate3d(-50%, -50%, 0);
        h3 {
            line-height: .6rem;
            font-size: .3rem;
            text-align: center;
        }
        p {
            padding-bottom: .05rem;
            line-height: 1rem;
            font-size: .4rem;
            text-align: center;
            color: #e51c23;
        }
    }
}

</style>
