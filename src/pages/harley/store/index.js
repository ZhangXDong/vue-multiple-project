import Vue from 'vue'
import Vuex from 'vuex'

import testDemo from '@/store/modules/test.js'
import testDemo1 from './modules/test'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        testDemo,
        testDemo1
    },
    getters,    
})

export default store
