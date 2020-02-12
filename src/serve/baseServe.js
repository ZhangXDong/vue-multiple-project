import reqFunc from './index'
// fta-serve 版本号
export function getFtaServeVersion(data) {
    return reqFunc.get('/actuator/info?serve=fta', {})
}
// RCS 版本号
export function getRcsServeVersion(data) {
    return reqFunc.get('/actuator/info?serve=rcs', {})
}
// rpm 网关 版本号
export function getRpmServeVersion(data) {
    return reqFunc.get('/actuator/info?serve=rpm', {})
}
// rpm  base-server 版本号
export function getRpmBaseServerVersion(data) {
    return reqFunc.get('/base-server/actuator/info?serve=rpm', {})
}
// rpm  rpm-server 版本号
export function getRpmRpmServerVersion(data) {
    return reqFunc.get('/rpm-server/actuator/info?serve=rpm', {})
}
// rpm user-center 版本号
export function getRpmUserCenterVersion(data) {
    return reqFunc.get('/user-center/actuator/info?serve=rpm', {})
}