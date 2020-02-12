import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken, removeToken } from '@util/auth'
import baseInfo from '@/store/modules/baseInfo.js'

let loading
let endLoadTimer = null

const envName = process.env.ENV_NAME
const needLoginArr = process.env.ENV_NEEDLOGIN
const noLoadingArr = [ '/rpm-server/robot-task/getPrintInfo' ]

function startLoading() { // 使用 Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '资源加载中,请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'global-loading'
    })
}

function endLoading() { //使用Element loading-close 方法
    loading.close()
    loading = null
}

function showFullScreenLoading() {
    endLoadTimer && clearTimeout(endLoadTimer)
    if(loading) return false
    startLoading()
}

function tryHideFullScreenLoading(type) {
    if(type === 1) {
        //  只展示一个 Message
        if(document.getElementsByClassName('el-message').length) return false
        Message({
            message: '请求超时',
            type: 'error',
            showClose: false,
            customClass: 'ld-message',
            duration: 0
        })
    }
    else if(type === 2) {
        if(document.getElementsByClassName('el-message').length) return false
        Message({
            message: '网络错误',
            type: 'error',
            showClose: false,
            customClass: 'ld-message',
            duration: 0
        })
    }
    if (type === 1 || type === 2) {
        return baseInfo.state.errorShutDownLoaidng ? endLoading() : false
    } else {
        endLoadTimer && clearTimeout(endLoadTimer)
        endLoadTimer = setTimeout(() => {
            endLoading()
        }, 600)
    }
}

axios.defaults.withCredentials = true
console.log(1212121212, process.env.URL_MAP);
axios.defaults.baseURL = process.env.URL_MAP.baseUrl

//http request 拦截器
axios.interceptors.request.use(
    config => {
        const token = getToken()
        config.data = JSON.stringify(config.data)
        config.headers = {
            'Content-Type': 'application/json',
            'deviceType': needLoginArr.find(item => envName.includes(item)) ? '' : -1,
            'token': token,
        }
        noLoadingArr.indexOf(config.url) === -1 && showFullScreenLoading()
        // 自动回充
		if (config.url.indexOf('chargingMode') > -1) {
			let regExp = /(\w+):\/\/([^/:]+)(:\d*)?/
            let resultUrl = config.url.replace(regExp, '')
			config.url = process.env.URL_MAP.chargingUrl + resultUrl
        }
        // 登录 登出
		if (config.url.indexOf('/user/loginSaasForMobile') > -1 || config.url.indexOf('/user/logout') > -1) {
			let regExp = /(\w+):\/\/([^/:]+)(:\d*)?/
			let resultUrl = config.url.replace(regExp, '')
			config.url = process.env.URL_MAP.loginUrl + resultUrl
        }
        // rcs 版本号（rpm版本号默认走baseUrl）
        if (config.url.indexOf('/actuator/info?serve=rcs') > -1) {
			let regExp = /(\w+):\/\/([^/:]+)(:\d*)?/
			let resultUrl = config.url.replace(regExp, '')
			config.url = process.env.URL_MAP.rcsUrl + resultUrl
        }
        // fta 版本号
        if (config.url.indexOf('/actuator/info?serve=fta') > -1) {
			let regExp = /(\w+):\/\/([^/:]+)(:\d*)?/
			let resultUrl = config.url.replace(regExp, '')
			config.url = process.env.URL_MAP.ftaUrl + resultUrl
        }
        return config
    },
    error => {
        return Promise.reject(err)
    }
)

//http response 拦截器
axios.interceptors.response.use(
    response => {
        console.log('response', response);
        // if(response.data.status.statusCode == 1012003){
		// 	removeToken()
		// }
        //  如果请求成功之后 存在 Message 则关闭
        if(document.getElementsByClassName('el-message').length) Message.closeAll()
        tryHideFullScreenLoading()
        return response
    },
    error => {
        if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
            console.log(error.message, 'error.message')
            tryHideFullScreenLoading(1)
        }
        if (error.message.includes('Network Error')) { // 判断请求异常信息中是否含有网络错误Network Error字符串
            console.log(error.message, 'error.message')            
            tryHideFullScreenLoading(2)
        }
        return Promise.reject(error)
    }
)

const reqFunc = {

    timeout: 5000,

    /**
     * 封装get方法
     * @param url
     * @param data
     * @returns {Promise}
     */

    get: function get(url, params = {}, timeout = {timeout: this.timeout}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params,
                timeout: timeout.timeout
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    /**
     * 封装post请求
     * @param url
     * @param data
     * @returns {Promise}
     */

    post: function post(url, data = {}, timeout = {timeout: this.timeout}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, timeout).then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
        })
    },

    /**
     * 封装patch请求
     * @param url
     * @param data
     * @returns {Promise}
     */

    patch: function patch(url, data = {}, timeout = {timeout: this.timeout}) {
        return new Promise((resolve, reject) => {
            axios.patch(url, data, timeout).then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
        })
    },

    /**
     * 封装put请求
     * @param url
     * @param data
     * @returns {Promise}
     */

    put: function put(url, data = {}, timeout = {timeout: this.timeout}) {
        return new Promise((resolve, reject) => {
            axios.put(url, data, timeout).then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
        })
    },

    /**
     * 封装delete请求
     * @param url
     * @param data
     * @returns {Promise}
     */

    delete: function DELETE(url, params = {}, timeout = {timeout: this.timeout}) {
        return new Promise((resolve, reject) => {
            axios.delete(url, params, timeout).then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

export default reqFunc
