<template>
    <div class="ld-fta-flex">
        <div class="ld-fta-dealers-info">
            <div class="ld-fta-dealers-info_number ld-fta-dealers_item">
               <div class="ld-fta-dealers-info_label">经销商编号</div>
               <div class="ld-fta-dealers-info_content">{{ distributorInfo && distributorInfo.externalStationName }}</div>
            </div>
            <div class="ld-fta-dealers-info_name ld-fta-dealers_item">
               <div class="ld-fta-dealers-info_label">经销商名称</div>
               <div class="ld-fta-dealers-info_content">{{ distributorInfo && distributorInfo.distributorName }}</div>
            </div>
        </div>
        <!-- 分拣正常 -->
        <sorting-list></sorting-list>
    </div>
</template>

<script>

    import sortingList from './../components/sortingList.vue'

    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                
            }
        },
        components: {
            sortingList
        },
         computed: {
            ...mapGetters([
                'distributorInfo', // 储位信息
            ])
        },
    }
</script>

<style lang="scss" scoped>
    .ld-fta-dealers-info {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        .ld-fta-dealers_item {
            display: flex;
            flex-direction: row;
            font-size: 36px;
            color: #918E8E;
            line-height: 54px;
            .ld-fta-dealers-info_label {
                margin-right: 40px;
                text-align: right;
            }
            .ld-fta-dealers-info_content {
                display: flex;
                flex: 1;
                color: #FF9800;
            }
        }
    }
</style>