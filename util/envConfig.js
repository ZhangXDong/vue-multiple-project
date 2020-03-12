let envConfig = [] // 构建/启动 项目
let projectName = [ 'harley', 'xinwangda', 'tcl', 'shougangpark', 'itl'] // 站点名称

const needLogin = ['xinwangda', 'tcl'] // 是否需要登录功能
// 获取命令行参数 http://nodejs.cn/api/process.html#process_process_argv
const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
const env = argv[argv.length - 1] ? argv[argv.length - 1].replace(/[^A-Za-z0-9]+/ig,"") : '' // 环境

projectName.map(item => {
	if(env.includes(item)) {
		envConfig.push(item)
	}
})

module.exports = {
	envConfig,
	needLogin,
	env
}
