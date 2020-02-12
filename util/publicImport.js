import Vue from 'vue'
import '@assets/iconfont/iconfont.js'

//  websocket
import * as websocket from '@util/websocket.js'
Vue.prototype.$websocket = websocket

//  global scss
import '@style/common.scss'

//	global function
import commonFun from './common.js'
Vue.prototype.$commonFun = commonFun

import { Button, Message, Loading, Table, TableColumn, Input, Dialog, MessageBox, Select, Option, Form, FormItem, Notification } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')

/** 
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
*/

class DonMessage {
    success (options, single = true) {
        this[showMessage]('success', options, single)
    }
    warning (options, single = true) {
        this[showMessage]('warning', options, single)
    }
    info (options, single = true) {
        this[showMessage]('info', options, single)
    }
    error (options, single = true) {
        this[showMessage]('error', options, single)
    }
    closeAll (options, single = true) {
        this[showMessage]('closeAll', options, single)
    }

    [showMessage] (type, options, single) {
        if (single) {
            // 判断是否已存在Message
            if (document.getElementsByClassName('el-message').length === 0) {
                Message[type](options)
            }
        } else {
            Message[type](options)
        }
    }
}

Vue.use(Button)
Vue.use(Loading)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Form)
Vue.use(FormItem)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification;
Vue.prototype.$message = new DonMessage()
