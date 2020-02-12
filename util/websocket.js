let websocket = null
let ws_callback = null
let ws_wsurl = null
let ws_data = null
let closeTimer = null
let errorTimer = null
let openTimer = null
let noopenTimer = null

function initWebSocket(wsurl, data, callback){ // 初始化 weosocket
    // ws地址
    ws_wsurl = wsurl
    ws_data = data
    ws_callback = callback
    websocket = new WebSocket(wsurl)
    websocket.onmessage = function(e, callback){
    	websocketonmessage(e, callback)
    } 
    websocket.onclose = function(e){
        websocketclose(e)
    }
    websocket.onopen = function () {
        console.log('连接成功')
        ws_callback = callback
	    websocketOpen(data)
	}
    
    //连接发生错误的回调方法
	websocket.onerror = function () {
        console.error('WebSocket连接发生错误')
        errorTimer && clearTimeout(errorTimer)
        errorTimer = setTimeout(function () {
            initWebSocket(ws_wsurl, ws_data, ws_callback)
        }, 1000)
	}
}
 
// 实际调用的方法
function sendSock(data){
    console.log('发送的消息', data);
    if (websocket.readyState === 1) {
    	//若是ws开启状态
        websocketsend(data)
    }
    else if (websocket.readyState === 0) {
    	// 若是 正在开启状态，则等待1s后重新调用
        openTimer && clearTimeout(openTimer)
        openTimer = setTimeout(function () {
        	sendSock(data)
        }, 1000)
    }
    else {
    	// 若未开启 ，则等待1s后重新调用
        noopenTimer && clearTimeout(noopenTimer)
        noopenTimer = setTimeout(function () {
            sendSock(data)
        }, 1000)
    }
}
 
//数据接收
function websocketonmessage(e){
    ws_callback(JSON.parse(e.data))
}
 
//数据发送
function websocketsend(data){
    websocket.send(JSON.stringify(data))
}
 
//关闭
function websocketclose(e){  
    console.warn("connection closed (" + e + ")")
    closeTimer && clearTimeout(closeTimer)
    closeTimer = setTimeout(function () {
        initWebSocket(ws_wsurl, ws_data, ws_callback)
    }, 1000)
}
 
function websocketOpen(data){
    // 连接成功后通知后台握手成功
    sendSock(data)
}
 
export { initWebSocket, sendSock, websocketclose }
