<template>
    <div class="lodop-print-container">

    </div>
</template>

<script>
import { getLodop, needCLodop, lodopIsLocal } from '@util/LodopFuncs.js'
export default {
    data () {
        return {
            lodop: null,
            callBack: null,
        }
    },
    methods: {
        async init(printData, callBack) {
            if(!printData || printData.length == 0) return;
            if (needCLodop()) {
                await lodopIsLocal()
            }
            this.lodop = await getLodop();
            return new Promise((resolve, reject) => {
                if(!this.lodop){//c-lodop如果没启动，则不能打印
                    console.log("请启动c-lodop服务");
                    return;
                }
                if (this.lodop.CVERSION) {//是否能检测到c-lodop的版本号
                    this.callBack = callBack
                    this.print(printData)
                } else{
                    console.log("请下载c-lodop");
                } 
            })
        },
        /**
         * 创建页头
         * @param {Object} data 数据信息
         */
	    setPageHead(data) {
            //打印时服务器的时间
            let timeNow = this.lodop.FORMAT("TIME:yyyy-mm-dd hh:mm:ss","now");
            //shipment_id
            let shipmentNo = data.shipmentNo;
            // ship_to
            let receiverId = data.receiverId;
            // ship_to_Address
            let receiverAddress = data.receiverAddress;
            // Container ID
            let containerCode = data.containerCode;

            this.lodop.SET_PRINT_PAGESIZE(1, 859, 1000);
            this.lodop.PRINT_INITA("");
            this.lodop.SET_PRINT_MODE("PRINT_NOCOLLATE", 1);
            
            // 矩形
            this.lodop.ADD_PRINT_RECT(5,5,"75.01mm","90.01mm",0,1);

            // 打印时服务器的时间
            this.lodop.ADD_PRINT_TEXT(12,10,270,17, timeNow);
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",10);

            // shipment_id
            this.lodop.ADD_PRINT_TEXT(35,10,93,20,"shipment_id:");
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",10);
            this.lodop.ADD_PRINT_TEXT(35,97,185,20, shipmentNo); // 发运单号
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",10);
            this.lodop.SET_PRINT_STYLEA(0,"Bold",1);

            // ship_to
            this.lodop.ADD_PRINT_TEXT(57,10,67,20,"ship_to:");
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",10);
            this.lodop.ADD_PRINT_TEXT(58,69,210,20, receiverId);
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",10);
            this.lodop.SET_PRINT_STYLEA(0,"Bold",1);

            // code receiverId
            this.lodop.ADD_PRINT_BARCODE(83,10,265,70,"Code39", receiverId);
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",20);
            this.lodop.SET_PRINT_STYLEA(0,"ShowBarText",0);

            // ship_to_Address
            this.lodop.ADD_PRINT_TEXT(159,10,270,20,"ship_to_Address:");
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",10);
            this.lodop.ADD_PRINT_TEXT(179,10,270,50, receiverAddress);
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",10);

            // Container ID
            this.lodop.ADD_PRINT_TEXT(238,10,100,20,"Container ID:");
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",10);
            this.lodop.ADD_PRINT_TEXT(238,103,180,20, containerCode);
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",10);
            this.lodop.SET_PRINT_STYLEA(0,"Bold",1);

            // code containerCode 
            this.lodop.ADD_PRINT_BARCODE(261,10,365,70,"Code39", containerCode);
            this.lodop.SET_PRINT_STYLEA(0,"FontSize",30);
            this.lodop.SET_PRINT_STYLEA(0,"ShowBarText",0);
        },
        /**
         * 打印
         * @param {Object} data 数据信息
         */
        print(data) {
            // 打印后的回调
            if(!this.lodop.On_Return){
                this.lodop.On_Return_Remain=true;
                this.lodop.On_Return = (taskID,Value)=> {
                    let isSucceed = false
                    if(taskID !== 0) {
                        // 打印成功
                        isSucceed = true
                    }
                    this.callBack(isSucceed)
                }
            }
            
            // 打印后的id列表
            let printIdList = []
            data.forEach(item => {
                this.setPageHead(item)
                this.lodop.SET_PRINT_MODE("CATCH_PRINT_STATUS",true)
                // 打印
                let taskId = this.lodop.PRINT()
                // 设计模版
                // let taskId = this.lodop.PRINT_DESIGN();
                // 维护模版
                // let taskId = this.lodop.PRINT_SETUP();
                
                printIdList.push(taskId)
            })
            return printIdList
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.lodop-print-container {

}
</style>