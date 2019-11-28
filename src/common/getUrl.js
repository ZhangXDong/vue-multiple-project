const baseUrl = () => {

    const urlMap = {
        // 铁盟测试环境
        test: { 
            baseUrl: 'ws://127.0.0.1:22011',
            loginUrl: 'http://42.159.7.11:8083', // 登录
            artificialSchedulURl: 'http://42.159.7.11:8170',
            followImageURL: 'http://127.0.0.1:8071/fta-client'
        }
    }

    const env = process.env.ENV

    return urlMap[env]
    
}

export default baseUrl
