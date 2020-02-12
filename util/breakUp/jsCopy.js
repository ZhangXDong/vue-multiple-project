const fs = require( 'fs' )
const { envConfig } = require('./envConfig')
const glob = require('glob')

/**
 * JS文件拷贝
 * @param src
 * @param dst
 */
const callbackFile = function( src, dst ){
    fs.readFile(src,'utf8',function(error,data){
        if(error){
            console.log(error);
            return false;
        }
        fs.writeFile(dst,data.toString(),'utf8',function(error){
            if(error){
                console.log(error);
                return false;
            }
            if(dst.includes('.map')){
                const srcName = src.split('/')[4]
                fs.unlink(`./dist/js/${srcName}.map`,function () {// 删除map
                    const noRemove = fs.existsSync('./dist/js')
                    if(noRemove){
                        const files = fs.readdirSync('./dist/js')
                        if(!files.length){   	
                            fs.rmdirSync('./dist/js')	
                        }
                    }
                })
                fs.unlink(`./dist/js/${srcName}`,function () {// 删除js
                    const noRemove = fs.existsSync('./dist/js')
                    if(noRemove){
                        const files = fs.readdirSync('./dist/js')
                        if(!files.length){   	
                            fs.rmdirSync('./dist/js')	
                        }
                    }
                })
                
            }else{ //JS写入成功
                callbackFile(dst,`${dst}.map`)
            }
        })
    })
}

// 复制目录
glob.sync( './dist/js/*.js').forEach((filepath,name) => {
    const fileNameList = filepath.split('.')
    const fileName = fileNameList[1].split('/')[3]// 多页面页面目录
    const copyName = filepath.split('/')[3]
    const changeDirectory = `./dist/${fileName}/js`// 多页面JS文件地存放址
    if(envConfig.indexOf(fileName) > -1){
        fs.exists( changeDirectory, function( exists ){
            if( exists ){// 已存在
                // console.log(`${fileName}下JS文件已经存在`)
                callbackFile(filepath,`${changeDirectory}/${copyName}`)      
            } else{// 不存在
                fs.mkdir( changeDirectory, function(){
                    callbackFile(filepath,`${changeDirectory}/${copyName}`)
                    // console.log(`${fileName}下JS文件创建成功`)
                });
            }
        })
    } 
   	else {
   		envConfig.forEach((item)=>{
   			fs.exists( `./dist/${item}/js`, function( exists ){
	            if( exists ){// 已存在
	                // console.log(`${fileName}下JS文件已经存在`)
	                callbackFile(filepath,`./dist/${item}/js/${copyName}`)
	                
	            } else{// 不存在
	                fs.mkdir(`./dist/${item}/js`, function(){
	                	callbackFile(filepath,`./dist/${item}/js/${copyName}`)       
	                    // console.log(`${fileName}下JS文件创建成功`)
	                });
	            }
	        })
   		})
   	}
})
