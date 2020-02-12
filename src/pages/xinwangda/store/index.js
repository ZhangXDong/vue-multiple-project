import Vue from 'vue'
import Vuex from 'vuex'

import baseInfo from '@/store/modules/baseInfo.js'
import publicBusiness from '@/store/modules/publicBusiness.js'
import user from '@/store/modules/user.js'
import sunwodaData from './modules/index'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        baseInfo,
        publicBusiness,
        user,
        sunwodaData
    },
    getters,    
})

export default store
