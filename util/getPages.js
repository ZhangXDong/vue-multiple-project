const glob = require('glob')
const { envConfig } = require('./envConfig')
let pages = {}
module.exports.pages = function (){
    glob.sync( './src/pages/*/*.js').forEach(filepath =>
    {
        let fileList = filepath.split('/')
        let fileName = fileList[fileList.length - 2]
        if(envConfig.indexOf(fileName) > -1){
            pages[fileName] = {
                entry: `src/pages/${fileName}/main.js`,
                // 模板来源
                template: `src/pages/${fileName}/${fileName}.html`,
                // 在 dist/index.html 的输出
                filename: process.env.NODE_ENV === 'development'?`${fileName}.html`:`${fileName}/${fileName}.html`,
                // 提取出来的通用 chunk 和 vendor chunk
                chunks: ['chunk-vendors', 'chunk-common', fileName]
            }
        }
    })
    return pages
}
