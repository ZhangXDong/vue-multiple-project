const path = require('path')
const { env } = require('./util/envConfig.js')
const pageMethod = require('./util/getPages.js')

module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? './': '/',
	pages: pageMethod.pages(),
	lintOnSave: false, // 关闭 eslint
	configureWebpack: {
		//关闭 webpack 的性能提示
	    performance: {
		    hints: false
	    }
	},
	css: {
		// css拆分ExtractTextPlugin插件，默认true 骨架屏需要为true
		extract: true,
		sourceMap: false
	},
	chainWebpack: config => {
		config.plugin('define').tap(args => {
			args[0]['process.env'].ENV = JSON.stringify(env)
			return args
		})

		// 配置解析别名
		config.resolve.alias
			.set('@', path.resolve(__dirname, 'src'))
			.set('@util', path.resolve(__dirname, 'util'))
			.set('@common', path.resolve(__dirname, 'src/common'))
			.set('@components', path.resolve(__dirname, 'src/components'))
			.set('@assets', path.resolve(__dirname, 'src/assets'))
			.set('@style', path.resolve(__dirname, 'src/assets/style'))
			.set('@images', path.resolve(__dirname, 'src/assets/images'))
	},
}
