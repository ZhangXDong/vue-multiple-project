<template>
	<div id="app"
		v-loading="!startNormal"
    	element-loading-text="资源加载中,请稍后..."
    	element-loading-spinner="el-icon-loading"
    	element-loading-background="rgba(0, 0, 0, 0.7)"
    	element-loading-custom-class="global-loading"
	>
		<router-view />
	</div>
	<!-- <div id="app">
		<div class="loading" v-show="!startNormal">
			<div class="load-box">
				<div class="load-icon">
					<img src="@/assets/images/loading.png" alt="">
				</div>
				<div class="load-txt">{{startNormalText}}</div>
			</div>
		</div>
		<router-view/>
	</div> -->
</template>

<script>
import receivedData from '@/mixin/receivedData.js'
import commonNavigateMixin from '@/mixin/public/commonNavigate.js'
import jackUpCommonNavigateMixin from '@/mixin/public/jackUpCommonNavigate.js'

import tclMixin from './mixin/tclMixin.js' // 两种场景公用
import tclProductRecoveryMixin from './mixin/tclProductRecovery.js'
import tclMaterialDeliveryMixin from './mixin/tclMaterialDelivery.js'

import { mapGetters, mapMutations } from 'vuex'

export default {
	mixins: [ 
		receivedData, 
		commonNavigateMixin,
		jackUpCommonNavigateMixin,
		tclMixin,
		tclProductRecoveryMixin, 
		tclMaterialDeliveryMixin 
	],
	data() {
		return {
			websocketData: {
				pack_type: 1, 
				data: {}
			}
		}
	},
	computed: {
		...mapGetters([
			'startNormal',
			'startNormalText'
		]),
	},
	mounted() {
		this.saveStartNormalText('资源加载中,请稍后...')
		this.saveStartNormal(false)
		// this.$websocket.initWebSocket(process.env.URL_MAP.wsUrl, this.websocketData, this.handleInfo)
	},
	methods: {
		...mapMutations({
			saveStartNormal: 'FTA_SAVE_STARTNORMAL', // 显示loading
			saveStartNormalText: 'FTA_SAVE_STARTNORMALTEXT', // 设置loading文案
		}),
	}
}
</script>

<style lang="scss">
#app {
	width: 100%;
  	height: 100%;
	// font-size: 14px;
	// .el-loading-spinner{
	// 		font-size: .158rem;
	// 		.el-loading-text {
	// 				font-size: .1rem;
	// 		}
	// }
	// .loading {
	// 	position: fixed;
	// 	left: 0; top: 0; right: 0; bottom: 0;
	// 	z-index: 2035;
	// 	background: rgba(0, 0, 0, .7);
	// 	.load-box {
	// 		position: absolute;
	// 		left: 50%; top: 50%;
	// 		border-radius: 5px;
	// 		transform: translate3d(-50%, -50%, 0);
	// 		.load-icon {
	// 			width: .4rem; height: .4rem;
	// 			margin: 0 auto;
	// 			padding-bottom: .1rem;
	// 			text-align: center;
	// 			i {
	// 				font-size: .12rem;
	// 				color: #409EFF;
	// 			}
	// 			img {
	// 				width: 100%; height: 100%;
	// 			}
	// 		}
	// 		.load-txt {
	// 			font-size: .2rem;
	// 			text-align: center;
	// 			color: #409EFF;
	// 		}
	// 	}
	// }
}
</style>
