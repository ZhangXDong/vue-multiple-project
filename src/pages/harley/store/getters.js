import publicGetters from '@/store/getters.js'

const getters = {
    ...publicGetters,
    distributorInfo: state => state.harleyData.distributorInfo,
}

export default getters
