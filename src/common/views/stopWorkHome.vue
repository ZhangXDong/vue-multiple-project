<template>
   	<div class="ld-stopWorkHome ld-flex">
		<h2>空闲</h2>
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
            footerBtns: [{
                title: '停止工作',
                disable: false, 
                type: 42
            }]
        }
    }
}
</script>

<style lang="scss">
.ld-stopWorkHome {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    padding: .05rem;
    h2 {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        text-align: center;
        color: #20B759;
    }
}
</style>
