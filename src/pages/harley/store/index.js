import Vue from 'vue'
import Vuex from 'vuex'

import baseInfo from '@/store/modules/baseInfo.js'
import publicBusiness from '@/store/modules/publicBusiness.js'
import harleyData from './modules/index'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        baseInfo,
        publicBusiness,
        harleyData
    },
    getters,    
})

export default store
