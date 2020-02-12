import reqFunc from '@/serve/index.js'
// 卸料点列表
export function getCarryOrder(data) {
    return reqFunc.get('/rpm-server/carry/getCarryOrder', data)
}