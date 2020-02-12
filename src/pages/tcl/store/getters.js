import publicGetters from '@/store/getters.js'

const getters = {
    ...publicGetters,
    tclSchedulingInfo: (state, getters) => {
        return state.tclData.tclSchedulingInfo
    },
    tclGuideTip: (state, getters) => {
        return state.tclData.tclGuideTip
    },
    tclIsRecyclable: (state, getters) => {
        return state.tclData.tclIsRecyclable
    },
    tclGetRPMData: (state, getters) => {
        return state.tclData.tclRPMData
    }
}

export default getters
