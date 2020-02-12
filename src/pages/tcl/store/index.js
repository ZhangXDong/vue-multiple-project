import Vue from 'vue'
import Vuex from 'vuex'

import baseInfo from '@/store/modules/baseInfo.js'
import publicBusiness from '@/store/modules/publicBusiness.js'
import user from '@/store/modules/user.js'
import tclData from './modules/index'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        baseInfo,
        publicBusiness,
        user,
        tclData
    },
    getters,    
})

export default store
