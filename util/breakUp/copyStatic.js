let fs = require( 'fs' )
let { envConfig } = require('./envConfig')
const glob = require('glob')

let copyStatic = function( src, dst, type){
    fs.readFile(src, function(error,data){
        if(error){
            console.log(error);
            return false;
        }
        fs.writeFile(dst, data, function(error){
            if(error){
                console.log(error)
                return false
            }
            fs.unlink(src, function () { // static 删除成功
                if(type === 1){
                    const folderName = src.split('/')[3]
                    const noRemove = fs.existsSync(`./dist/static/${folderName}`)
                    if(noRemove){
                        const files = fs.readdirSync(`./dist/static/${folderName}`)
                        if(!files.length){   	
                            fs.rmdirSync(`./dist/static/${folderName}`)	
                        }
                    }  
                }
                const allRemove = fs.existsSync('./dist/static')
                if(allRemove){
                    const files = fs.readdirSync('./dist/static')
                    if(!files.length){   	
                        fs.rmdirSync('./dist/static')	
                    }
                }	
            })
        })
        
    })
}

// 复制目录  需要优化
glob.sync( './dist/static/*').forEach((filepath) => {
    fs.stat(filepath, function(err, stats){
        if(err) return console.warn('复制static时,判断文件夹或者文件时出错')
        if(stats.isDirectory()){
            glob.sync( `${filepath}/*`).forEach((file) => {
                envConfig.forEach((item)=>{
                    const copyName = file.split('/')[3]
                    fs.exists( `./dist/${item}/static`, function( exists ){
                        if( exists ){ // 已存在
                            fs.exists( `./dist/${item}/static/${copyName}`, function( exists ){
                                const copyNameS = file.split('/')[4]
                                if( exists ){ // 已存在
                                    copyStatic(file, `./dist/${item}/static/${copyName}/${copyNameS}`, 1)   
                                }
                                else {
                                    fs.mkdir(`./dist/${item}/static/${copyName}`, function(){
                                        copyStatic(file, `./dist/${item}/static/${copyName}/${copyNameS}`, 1)       
                                    })
                                }
                            })
                        }
                        else{ // 不存在
                            fs.mkdir(`./dist/${item}/static`, function(){
                                fs.exists( `./dist/${item}/static/${copyName}`, function( exists ){
                                    const copyNameS = file.split('/')[4]
                                    if( exists ){ // 已存在
                                        copyStatic(file, `./dist/${item}/static/${copyName}/${copyNameS}`, 1)   
                                    }
                                    else {
                                        fs.mkdir(`./dist/${item}/static/${copyName}`, function(){
                                            copyStatic(file, `./dist/${item}/static/${copyName}/${copyNameS}`, 1)       
                                        })
                                    }
                                })       
                            })
                        }
                    })
                })
            })
        }
        else {
            // 未调试
            envConfig.forEach((item)=>{
                const copyName = filepath.split('/')[3]
                fs.exists( `./dist/${item}/static`, function( exists ){
                    if( exists ){ // 已存在
                        copyFonts(filepath, `./dist/${item}/static/${copyName}`)   
                    } else{ // 不存在
                        fs.mkdir(`./dist/${item}/static`, function(){
                            copyFonts(filepath, `./dist/${item}/fonts/${copyName}`)       
                        })
                    }
                })
            })
        }
    })
})
