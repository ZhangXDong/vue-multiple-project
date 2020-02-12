const urlMap = {
    //  哈雷 dev
    harleyDev: {
        baseUrl: 'http://gateway.harley.dev.internal.forwardx.com',
        loginUrl: 'http://10.0.20.99:8083', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://rcs.harley.dev.internal.forwardx.com',
        ftaUrl: 'http://fta.harley.dev.internal.forwardx.com'
    },
    //  哈雷 demo
    harleyDemo: {
        baseUrl: 'http://gateway.harley.demo.internal.forwardx.com',
        loginUrl: 'http://10.0.20.99:8083', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://rcs.harley.demo.internal.forwardx.com',
        ftaUrl: 'http://fta.harley.demo.internal.forwardx.com'
    },
    //  哈雷 test
    harleyTest: {
        baseUrl: 'http://gateway.harley.test.internal.forwardx.com',
        loginUrl: 'http://10.0.20.99:8083', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://rcs.harley.test.internal.forwardx.com',
        ftaUrl: 'http://fta.harley.test.internal.forwardx.com'
    },
    //  文龙环境
    wenlong: {
        baseUrl: 'http://10.3.0.189:8010',
        loginUrl: 'http://10.0.20.99:8083', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        chargingUrl: 'http://127.0.0.1:8071'
    },
    // 孙追
    sunzhui: {
        baseUrl: 'http://10.0.20.99:8070',
        loginUrl: 'http://10.0.20.99:8083', // 登录
        wsUrl: 'ws://10.0.20.99:22011',
        followImageURL: 'http://10.0.20.99:8071/fta-client',
        chargingUrl: 'http://127.0.0.1:8071'
    },
    // 欣旺达铁锰环境
    xinwangdaTiemeng: {
        baseUrl: 'http://gateway.xinwangda.tiemeng.internal.forwardx.com',
        loginUrl: 'http://gateway.xinwangda.tiemeng.internal.forwardx.com', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        followImageURL: 'http://127.0.0.1:8071/fta-client',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://rcs.xinwangda.tiemeng.internal.forwardx.com',
        ftaUrl: 'http://fta.xinwangda.tiemeng.internal.forwardx.com'
    },
    // 欣旺达开发环境
    xinwangdaDev: {
        baseUrl: 'http://gateway.xinwangda.dev.internal.forwardx.com',
        loginUrl: 'http://gateway.xinwangda.dev.internal.forwardx.com', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        followImageURL: 'http://127.0.0.1:8071/fta-client',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://rcs.xinwangda.dev.internal.forwardx.com',
        ftaUrl: 'http://fta.xinwangda.dev.internal.forwardx.com'
    },
    // 欣旺达测试环境 
    xinwangdaTest: {
        baseUrl: 'http://gateway.xinwangda.test.internal.forwardx.com',
        loginUrl: 'http://gateway.xinwangda.test.internal.forwardx.com', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        followImageURL: 'http://127.0.0.1:8071/fta-client',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://rcs.xinwangda.test.internal.forwardx.com',
        ftaUrl: 'http://fta.xinwangda.test.internal.forwardx.com'
    },
    // 欣旺达生产环境 
    xinwangdaProd: {
        baseUrl: 'http://gateway.sgrobot.sunwoda.com',
        loginUrl: 'http://gateway.sgrobot.sunwoda.com', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        followImageURL: 'http://127.0.0.1:8071/fta-client',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://gateway.sgrobot.sunwoda.com',
        ftaUrl: 'http://gateway.sgrobot.sunwoda.com'
    },
    // TCL铁锰环境
    tclTiemeng: {
        baseUrl: 'http://gateway.tcl.tiemeng.internal.forwardx.com',
        loginUrl: 'http://gateway.tcl.tiemeng.internal.forwardx.com', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        followImageURL: 'http://127.0.0.1:8071/fta-client',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://rcs.tcl.tiemeng.internal.forwardx.com',
        ftaUrl: 'http://fta.tcl.tiemeng.internal.forwardx.com'
    },
    // TCL开发环境
    tclDev: {
        baseUrl: 'http://gateway.tcl.dev.internal.forwardx.com',
        loginUrl: 'http://gateway.tcl.dev.internal.forwardx.com', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        followImageURL: 'http://127.0.0.1:8071/fta-client',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://rcs.tcl.dev.internal.forwardx.com',
        ftaUrl: 'http://fta.tcl.dev.internal.forwardx.com'
    },
    // TCL测试环境 
    tclTest: {
        baseUrl: 'http://gateway.tcl.test.internal.forwardx.com',
        loginUrl: 'http://gateway.tcl.test.internal.forwardx.com', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        followImageURL: 'http://127.0.0.1:8071/fta-client',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://rcs.tcl.test.internal.forwardx.com',
        ftaUrl: 'http://fta.tcl.test.internal.forwardx.com'
    },
    // TCL生产环境 
    tclProd: {
        baseUrl: 'http://gateway.sgrobot.tcl.com',
        loginUrl: 'http://gateway.sgrobot.tcl.com', // 登录
        wsUrl: 'ws://127.0.0.1:22011',
        followImageURL: 'http://127.0.0.1:8071/fta-client',
        chargingUrl: 'http://127.0.0.1:8071',
        rcsUrl: 'http://gateway.sgrobot.tcl.com',
        ftaUrl: 'http://gateway.sgrobot.tcl.com',
    },

    
}
module.exports = {
    urlMap
}
