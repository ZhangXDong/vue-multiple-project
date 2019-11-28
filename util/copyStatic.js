let fs = require( 'fs' )
let { envConfig } = require('./envConfig')
const glob = require('glob')

let copyStatic = function( src, dst ){
    fs.readFile(src, 'utf8', function(error,data){
        if(error){
            console.log(error);
            return false;
        }
        fs.writeFile(dst,data.toString(),'utf8',function(error){
            if(error){
                console.log(error);
                return false;
            }
            fs.unlink(src,function () {// static删除成功
                const noRemove = fs.existsSync('./dist/static')
                if(noRemove){
                    const files = fs.readdirSync('./dist/static')
                    if(!files.length){   	
                        fs.rmdirSync('./dist/static')	
                    }
                }	
            })
        })
        
    })
}

// 复制目录
// envConfig.forEach((item)=>{
// 	fs.exists(`./dist/${item}/static`, function( exists ){
// 	    if( exists ){// 已存在
// 	        copyStatic('./dist/static/baseURL.js',`./dist/${item}/static/baseURL.js`)
// 	    } else{// 不存在
// 	        fs.mkdir( `./dist/${item}/static`, function(){
// 	        	copyStatic('./dist/static/baseURL.js',`./dist/${item}/static/baseURL.js`)                
// 	        })
// 	    }
// 	})
// })
