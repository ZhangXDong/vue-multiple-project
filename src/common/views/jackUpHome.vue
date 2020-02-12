<template>
   	<div class="ld-jackUpHome ld-flex">
		<h2>空闲</h2>
        <!-- 操作顶升 -->
        <jackUpBtn :showJackUpBtn="true"></jackUpBtn>
        
		<!-- 操作区 -->
        <div class="opreate"></div>
   	</div>
</template>

<script>
import jackUpBtn from '@/components/jackUpBtn.vue';
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        jackUpBtn
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters([
            'footerBtns',
        ])
    },
    methods:{
        ...mapMutations({
            saveShowJackUp: 'SHOW_JACKUP',
            saveShowJackUpWork: 'SHOW_JACKUP_WORK',
        }),
    }
}
</script>

<style lang="scss">
.ld-jackUpHome {
    display: flex;
    flex-direction: column;
    position: relative;
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
    .ld-jackup-button {
        top: .066rem;
        right: .05rem;
    }
    .opreate {
        height: 150px;
    }
}
</style>
