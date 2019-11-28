let envConfig = [ 'harley', 'demo' ] // 站点名称
let env
//获取命令行参数 http://nodejs.cn/api/process.html#process_process_argv
const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
const website = argv[argv.length - 1] ? argv[argv.length - 1].replace(/[^A-Za-z0-9]+/ig,"") : '' // 站点名称

if(envConfig.find(item => item === website)){
	envConfig = []
	envConfig.push(website)
	env = argv[argv.length - 2] ? argv[argv.length - 2] === 'serve' ? website : argv[argv.length - 2].replace(/[^A-Za-z0-9]+/ig,"") : '' // 环境
}
else {
	env = website
}

module.exports = {
	envConfig,
	env
}
