
import { mapMutations, mapGetters } from 'vuex'

const harleyMixin = {
    computed: {
        ...mapGetters([
            'stationInfo', // 停靠点信息
        ])
    },
    methods: {
        ...mapMutations({
            saveFooterBtns: 'FOOTER_BTNS',
            saveWorkingStatus: 'FTA_SAVE_WORKINGSTATUS',
        }),
        harleyHandleInfo(data){
            if(data.robotBaseStatus === 1){
                this.saveWorkingStatus('导航中')
                this.saveFooterBtns(
                    [
                        {
                            title:'到达',
                            type: 15,
                            disable: false,
                            hasBgColor: true,   // 是否有背景颜色 true默认深蓝色
                            bgColor: '#2E9B24', // 背景颜色
                        },
                        {
                            title:'暂停',
                            type: 12,
                            disable: false,
                            hasBgColor: true,   // 是否有背景颜色 true默认深蓝色
                            bgColor: '#3F50B5', // 背景颜色
                            showNum: false, // 是否展示确认数量
                        }
                    ]
                )
                if(this.$route.path !== '/navigate'){
                    return this.$router.push('/navigate') 
                }
            }
            if(data.robotBaseStatus === 3){
                this.saveWorkingStatus('暂停中')
                this.saveFooterBtns(
                    [
                        {
                            title:'到达',
                            type: 15,
                            disable: true,
                            hasBgColor: true,   // 是否有背景颜色 true默认深蓝色
                            bgColor: '#2E9B24', // 背景颜色
                        },
                        {
                            title:'继续',
                            type: 13,
                            disable: false,
                            hasBgColor: true,   // 是否有背景颜色 true默认深蓝色
                            bgColor: '#3F50B5', // 背景颜色
                            showNum: false, // 是否展示确认数量
                        }
                    ]
                )
                if(this.$route.path !== '/navigate'){
                    return this.$router.push('/navigate') 
                }
            }
            if(data.robotBaseStatus === 5){
                // STORAGE: '储区',
                // PACKING_STATION: '分拣区',
                // PICKING_STATION: '上箱区',
                // DIRECTOR_STATION: '主管台',
                // TING_CHE_QU_STATION: '停车区'
                this.saveFooterBtns([])
                this.saveWorkingStatus('已到达')
                if(this.stationInfo.stationTypeValue === 'PICKING_STATION'){
                    if(this.$route.path !== '/onTheBox'){
                        return this.$router.push('/onTheBox') 
                    }
                }
                else if(this.stationInfo.stationTypeValue === 'PACKING_STATION') {
                    if(this.$route.path !== '/sorting'){
                        return this.$router.push('/sorting') 
                    }
                }
                else {
                    if(this.$route.path !== '/navigate'){
                        return this.$router.push('/navigate') 
                    }
                }
            }
        }
    }
}

export default harleyMixin
