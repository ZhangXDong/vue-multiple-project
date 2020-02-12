<template>
    <div class="ld-sunwodaGarbageCarry_task">
        <div class="main">
            <!-- 指引提示文案 -->
            <div class="tips">
                <p v-html="sunwodaGuideTip"></p>
            </div>
        </div>
        <!-- 操作区 -->
        <footerBtn :footerBtns="footerBtns"></footerBtn>
    </div>
</template>

<script>
import footerBtn from '@/components/footerBtn.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        footerBtn
    },
	data() {
		return {
			
		}
	},
	computed: {
		...mapGetters([
			'sunwodaSchedulingInfo',
            'sunwodaGuideTip',
            'footerBtns',
		])
	},
    methods:{
        
	}
}
</script>

<style lang="scss">
.ld-sunwodaGarbageCarry_task {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 .05rem .05rem;
    color: #252525;
    background: #fff;
    .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        // background: yellow;
        .target {
            line-height: .2rem;
            text-align: center;
            font-size: 60px;
            padding-top: .15rem;
            padding-bottom: .05rem;
            span {
                display: inline-block;
                padding-left: .05rem;
                color: #ff9800;
                vertical-align: bottom;
            }
        }
        .highlight {
            text-align: center;
            p {
                display: inline-block;
                padding: .1rem .2rem;
                font-size: .6rem;
                color: #fff;
                background: #ff9800;
            }
        }
        .tips {
            p {
                text-align: center;
                font-size: 50px;
                strong {
                    color: red;
                }
            }
        }
        .taskNo {
            line-height: .2rem;
            text-align: center;
            font-size: 48px;
            color: #919191;
        }
    }
}

</style>
