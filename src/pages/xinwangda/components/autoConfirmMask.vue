<template>
    <div class="ld-auto-confirm-mask">
        <div class="load-mask" v-show="showMask">
            <div class="load-garbage" @click.stop="handleMask">
                <!-- 尾料搬运显示可回收不可回收，物料搬运不显示 -->
                <div class="recyclable" v-show="showRecyclable && isRecycleable==='100101'">可回收</div>
                <div class="not-recyclable" v-show="showRecyclable && isRecycleable==='100102'">不可回收</div>
                <!-- 倒计时秒数 -->
                <p class="load-intro">{{maskText}}（{{ countDown }}s）</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        showMask: {
            type: Boolean,
            default: false
        },
        showRecyclable:{
            type: Boolean,
            default: false
        },
        isRecycleable: {
            default: String,
            default: ''
        },
        maskText: {
            default: String,
            default: ''
        },
        countDown: {
            default: Number,
            default: 10
        }
    },
    mounted() {
        console.log('showRecyclable', this.showRecyclable);
        console.log('isRecycleable', this.isRecycleable);
    },
    methods: {
        handleMask() {
            this.$emit('handleMask')
        }
    }
}
</script>

<style lang="scss">
.ld-auto-confirm-mask {
    .load-mask {
        position: fixed;
        left: 0; top: 0; right: 0; bottom: 0;
        z-index: 2019;
        background: rgba(0, 0, 0, .4);
        .load-garbage {
            position: absolute;
            left: 50%; top: 50%;
            width: 6rem; height: 3rem;
            display: flex;
            flex-direction: column;
            text-align: center;
            color: #fff;
            background: #ff9821;
            border-radius: 5px;
            transform: translate3d(-50%, -50%, 0);
            .recyclable, .not-recyclable {
                line-height: 0px;
                font-size: .5rem;
                margin: auto;
            }
            .recyclable {
                color: #20B759;
            }
            .not-recyclable {
                color: red;
            }
            .load-intro {
                font-size: .4rem;
                margin: auto;
            }
        }
    }
}
</style>