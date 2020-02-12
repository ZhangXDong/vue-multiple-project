import reqFunc from '@/serve/index.js'

// 获取箱子列表
export function getUpContainerList(data) {
    return reqFunc.post('/rpm-server/harley/container/getUpContainerList', data)
}

// 出发
export function leaveBoxArea(data) {
    return reqFunc.post('/rpm-server/robot-task/harley/leaveBoxArea', data)
}

// 按经销商编号获取箱签列表
export function getContainerReceiverList(data) {
    return reqFunc.post('/rpm-server/harley/picking/getContainerReceiverList', data)
}

// 分拣完成
export function sortingFinish(data) {
    return reqFunc.post('/rpm-server/picking/sortingFinish', data)
}

// 打印信息
export function getPrintInfo(data) {
    return reqFunc.post('/rpm-server/robot-task/getPrintInfo', data)
}
