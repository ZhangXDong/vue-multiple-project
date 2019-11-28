const testDemo1 = {
    state: {
        userID: "888",
    },
    mutations: {
        SET_USERID: (state, userID) => {
            state.userID = userID
        },
    },
    actions: {
        // 用户名登录
        loginByAccount({ commit }, userID) {
            commit('SET_USERID', userID)
        }
    }
}
  
export default testDemo1
  