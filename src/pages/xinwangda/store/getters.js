import publicGetters from '@/store/getters.js'

const getters = {
    ...publicGetters,
    sunwodaSchedulingInfo: (state, getters) => {
        return state.sunwodaData.sunwodaSchedulingInfo
    },
    sunwodaGuideTip: (state, getters) => {
        return state.sunwodaData.sunwodaGuideTip
    },
    sunwodaIsRecyclable: (state, getters) => {
        return state.sunwodaData.sunwodaIsRecyclable
    },
    sunwodaGetRPMData: (state, getters) => {
        return state.sunwodaData.sunwodaRPMData
    }
}

export default getters
