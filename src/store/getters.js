
const getters = {
    //  base info getters
    workingMode: state => state.baseInfo.workingMode,
    workingStatus: state => state.baseInfo.workingStatus,
    followModuleAvailable: state => state.baseInfo.followModuleAvailable,
    reconnectPrompt: state => state.baseInfo.reconnectPrompt,
    positionSuccess: state => state.baseInfo.positionSuccess,
    robotInfo: state => state.baseInfo.robotInfo,
    followInfo: state => state.baseInfo.followInfo,
    robotLastState: state => state.baseInfo.robotLastState,
    chargingInfo: state => state.baseInfo.chargingInfo,
    followDisabled: state => state.baseInfo.followDisabled,
    robotStatus: state => state.baseInfo.robotStatus,
    startNormal: state => state.baseInfo.startNormal,
    ftaVersion: state => state.baseInfo.ftaVersion,
    startNormalText: state => state.baseInfo.startNormalText,
    configuration: state => state.baseInfo.configuration,

    //  public business getters
    gatherOrder: state => state.publicBusiness.gatherOrder,
    footerBtns: state => state.publicBusiness.footerBtns,
    showJackUp: state => state.publicBusiness.showJackUp,
    showJackUpWork: state => state.publicBusiness.showJackUpWork,
    jackUpPercent: state => state.publicBusiness.jackUpPercent,
    jackUpStatus: state => state.publicBusiness.jackUpStatus,
    allButtonCannotClick: state => state.publicBusiness.allButtonCannotClick,
    unusualDialogVisible: state => state.publicBusiness.unusualDialogVisible,
    unusualDialogConfig: state => state.publicBusiness.unusualDialogConfig,
    stationInfo: state => state.publicBusiness.stationInfo,
    scheduleCurrentOrder: state => state.publicBusiness.scheduleCurrentOrder,
    scheduleGuideTip: state => state.publicBusiness.scheduleGuideTip,
}
export default getters
