<template>
    <div class="ld-fta-flex ld-fta-barcode">
        <!-- header -->
        <div class="ld-fta-barcode_header">
            扫描条形码获取拣选任务
        </div>
        <!-- 条形码 -->
        <div class="ld-fta-barcode_content">
            <svg id="barcode"
                :jsbarcode-value = taskNo>
            </svg>
        </div>
    </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
    export default {
        data() {
            return {
                taskNo: 'A2019081948343', // vuex
                position: 'S-1-1-1-1', // vuex
            }
        },
        methods: {
            // 生成条形码
            generateBarcode() {
                JsBarcode("#barcode", {}, {
                    format:"CODE128",
                    fontSize: 32,
                    width: 5,
                    height: 190,
                    margin: 30
                }).init()
            }
        },
        mounted() {
            this.generateBarcode()
        }
    }
</script>

<style lang="scss" scoped>
    .ld-fta-barcode {
        text-align: center;
        color: #616262;
        overflow: visible;
        .ld-fta-barcode_header {
            font-size: 48px;
        }
    }
</style>
