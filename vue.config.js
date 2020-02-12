const path = require('path')
const { env, needLogin } = require('./util/breakUp/envConfig.js')
const pageMethod = require('./util/breakUp/getPages.js')
const urlMap = require('./util/getUrl.js')
const git = require('git-rev-sync')
const version = git.tag().replace(/[^._0-9]+/ig,"")

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
	//	解决 sockjs-node 404 问题
	devServer: {
        host: '0.0.0.0',
        port: 8080,
    },
	chainWebpack: config => {
		config.plugin('define').tap(args => {
			args[0]['process.env'].ENV_NAME = JSON.stringify(env)
			args[0]['process.env'].URL_MAP = JSON.stringify(urlMap.urlMap[env])
			args[0]['process.env'].VERSION = JSON.stringify(version)
			args[0]['process.env'].ENV_NEEDLOGIN = JSON.stringify(needLogin)
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
