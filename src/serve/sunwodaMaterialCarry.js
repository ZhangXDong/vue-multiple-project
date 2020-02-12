import reqFunc from './index'
// 卸料点列表
export function getCarryOrder(data) {
    return reqFunc.get('/rpm-server/carry/getCarryOrder', data)
}