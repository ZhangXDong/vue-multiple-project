
const harleyData = {
    state: {
        distributorInfo: null, // 经销商信息
    },
    mutations: {
        DISTRiIBUTOR_INFO: (state, payload) => {
            state.distributorInfo = payload
        }
    }
}
  
export default harleyData
  