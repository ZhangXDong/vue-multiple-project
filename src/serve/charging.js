import reqFunc from './index'
// 是否可结束充电
export function canExit(data) {
    return reqFunc.get('/fta-client/chargingMode/canExit?' + data, {})
}
// 结束充电确认
export function exit(data) {
    return reqFunc.get('/fta-client/chargingMode/exit?robotId=' + data, {})
}
