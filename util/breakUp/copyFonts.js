const fs = require( 'fs' )
const { envConfig } = require('./envConfig')
const glob = require('glob')

const copyFonts = function( src, dst ){
    fs.readFile(src, function(error,data){
        if(error){
            console.log(error)
            return false
        }
        fs.writeFile(dst, data, function(error){
            if(error){
                console.log(error)
                return false
            }
            fs.unlink(src,function () { // fonts 删除成功
                const noRemove = fs.existsSync('./dist/fonts')
                if(noRemove){
                    const files = fs.readdirSync('./dist/fonts')
                    if(!files.length){   	
                        fs.rmdirSync('./dist/fonts')	
                    }
                }	
            })
        })
        
    })
}

// 复制目录
glob.sync( './dist/fonts/*').forEach((filepath) => {
    const copyName = filepath.split('/')[3]
    envConfig.forEach((item)=>{
        fs.exists( `./dist/${item}/fonts`, function( exists ){
            if( exists ){ // 已存在
                copyFonts(filepath,`./dist/${item}/fonts/${copyName}`)   
            } else{ // 不存在
                fs.mkdir(`./dist/${item}/fonts`, function(){
                    copyFonts(filepath,`./dist/${item}/fonts/${copyName}`)       
                })
            }
        })
    })
})
