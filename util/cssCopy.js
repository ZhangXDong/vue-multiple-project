const fs = require( 'fs' )
const glob = require('glob')
const { envConfig } = require('./envConfig')

/**
 * css文件拷贝
 * @param src
 * @param dst
 */
const callbackFile = function( src, dst ){
    fs.readFile(src,'utf8',function(error,data){
        if(error){
            console.log(error)
            return false
        }
        fs.writeFile(dst,data.toString(),'utf8',function(error){
            if(error){
                console.log(error)
                return false
            }
            fs.unlink(src,function () {// css删除成功         
                const noRemove = fs.existsSync('./dist/css')
                if(noRemove){
                    const files = fs.readdirSync('./dist/css')
                    if(!files.length){   	
                        fs.rmdirSync('./dist/css')	
                    }
                }
            })
        })
    })
}

// 复制目录
glob.sync( './dist/css/*.css').forEach((filepath,name) => {
    const fileNameList = filepath.split('.')
    const fileName = fileNameList[1].split('/')[3]// 多页面页面目录
    const copyName = filepath.split('/')[3]
    const changeDirectory = `./dist/${fileName}/css`// 多页面JS文件地存放址
    if(envConfig.indexOf(fileName) > -1){
        fs.exists( changeDirectory, function( exists ){
            if( exists ){// 已存在
               // console.log(`${fileName}下CSS文件已经存在`)
                callbackFile(filepath,`${changeDirectory}/${copyName}`)
            } else{// 不存在
                fs.mkdir( changeDirectory, function(){
                    callbackFile(filepath,`${changeDirectory}/${copyName}`)
                 //   console.log(`${fileName}下CSS文件创建成功`)
                })
            }
        })
    }
    else {
        envConfig.forEach((item)=>{
            fs.exists( `./dist/${item}/css`, function( exists ){
                if( exists ){// 已存在
                    // console.log(`${fileName}下css文件已经存在`)
                    callbackFile(filepath,`./dist/${item}/css/${copyName}`)
                    
                } else{// 不存在
                    fs.mkdir(`./dist/${item}/css`, function(){
                        callbackFile(filepath,`./dist/${item}/css/${copyName}`)       
                        // console.log(`${fileName}下css文件创建成功`)
                    });
                }
            })
        })
    }
})
