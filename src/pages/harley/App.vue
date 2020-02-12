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
</template>

<script>

	import receivedData from '@/mixin/receivedData.js'

	import harleyMixin from './mixin/index.js'

	import { mapGetters } from 'vuex'
	
	export default {
  		mixins: [ receivedData, harleyMixin ],
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
				'startNormal'
			]),
		},
		mounted() {
			this.$websocket.initWebSocket(process.env.URL_MAP.wsUrl, this.websocketData, this.handleInfo)
		},
	}
</script>

<style>
	#app {
		width: 100%;
		height: 100%;
	}
</style>
