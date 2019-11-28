const testDemo = {
    state: {
        userInfo: "123444",
    },
    mutations: {
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
    },
    actions: {
        // 用户名登录
        loginByAccount({ commit }, userInfo) {
            commit('SET_USERINFO', userInfo)
        }
    }
}
  
export default testDemo
  