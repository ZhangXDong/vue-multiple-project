<template>
    <div class="ld-fta-flex ld-fta-pick-up">
        <div class="ld-fta-flex ld-fta-pick-up-content">
            <div class="ld-fta-pick-up-content_info">
                <div class="ld-fta-pick-up-content_info-label">
                    货位:
                </div>
                <div class="ld-fta-pick-up-content_info-inner color-3F51B5">
                    S-1-1-01
                </div>
            </div>
            <div class="ld-fta-pick-up-content_info">
                <div class="ld-fta-pick-up-content_info-label diff-label">
                    LPN:
                </div>
                <div class="ld-fta-pick-up-content_info-inner color-3F51B5">
                    20290289
                    <svg class="icon sao-miao-icon" aria-hidden="true" v-show="!showLPNRight">
                        <use xlink:href="#iconsaomiao"></use>
                    </svg>
                    <svg class="icon zheng-que-icon" aria-hidden="true" v-show="showLPNRight">
                        <use xlink:href="#iconzhengque"></use>
                    </svg>
                </div>
            </div>
            <div class="ld-fta-pick-up-content_info">
                <div class="ld-fta-pick-up-content_info-label">
                    条码:
                </div>
                <div class="ld-fta-pick-up-content_info-inner color-FF9800 ld-fta-pick-up-content_info-code">
                    51836-08
                    <svg class="icon sao-miao-icon" aria-hidden="true" v-show="!showCodeRight && showLPNRight">
                        <use xlink:href="#iconsaomiao"></use>
                    </svg>
                    <svg class="icon zheng-que-icon" aria-hidden="true" v-show="showCodeRight">
                        <use xlink:href="#iconzhengque"></use>
                    </svg>
                </div>
            </div>
            <div class="ld-fta-pick-up-content_info">
                <div class="ld-fta-pick-up-content_info-label diff-label">
                    应拣:
                </div>
                <div class="ld-fta-pick-up-content_info-inner color-FF9800">
                    4
                </div>
            </div>
            <div class="ld-fta-pick-up-content_info">
                <div class="ld-fta-pick-up-content_info-label">
                    箱标签:
                </div>
                <div class="ld-fta-pick-up-content_info-inner ld-fta-pick-up-content-box-tag">
                    AB000400000000079000
                    <svg class="icon sao-miao-icon" aria-hidden="true" v-show="showBoxTagSaomiao">
                        <use xlink:href="#iconsaomiao"></use>
                    </svg>
                    <svg class="icon zheng-que-icon" aria-hidden="true" v-show="showBoxTagRight">
                        <use xlink:href="#iconzhengque"></use>
                    </svg>
                </div>
            </div>
            <div class="ld-fta-pick-up-content_info">
                <div class="ld-fta-pick-up-content_info-label">
                    格子号:
                </div>
                <div class="ld-fta-pick-up-content_info-inner color-009688">
                    6
                </div>
            </div>
            <div class="ld-fta-pick-up-content_info">
                <div class="ld-fta-pick-up-content_info-label">
                    名称:
                </div>
                <div class="ld-fta-pick-up-content_info-inner ld-fta-pick-up-content-name">
                    GLOVES-GMIC,F/L,MIXMEDIA,COOL,LTHR,BLK
                </div>
            </div>
        </div>
        <div class="ld-fta-pick-up_footer">
            <el-button
                class="ld-fta-pick-up_footer-btn"
            >
                确认短拣
            </el-button>
            <el-button
                class="ld-fta-pick-up_footer-btn ld-fta-pick-up_footer-btn_confirm"
                @click="handleConfirm"
            >
                确认数量: 123
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showLPNRight: false, // 是否展示 LPN 正确 icon
                showCodeRight: false, // 是否展示条码正确 icon
                showBoxTagRight: false, // 是否展示箱标签的正确con
                showBoxTagSaomiao: false, // 是否展示箱标签的扫描icon
                codeTimer: null,
                code: ''
            }
        },
        methods: {
            asd() {
                setTimeout(() => {
                    this.showLPNRight = true
                    setTimeout(() => {
                        this.showCodeRight = true
                    }, 3000);
                }, 3000);
            },
            handleConfirm() {
                this.showBoxTagSaomiao = true
                this.showBoxTagRight = false
                setTimeout(() => {
                    this.showBoxTagRight = true
                    this.showBoxTagSaomiao = false
                }, 3000);
            }
        },
        mounted() {
            this.asd()
            document.onkeypress = (e) => {
                const key = window.event.charCode
                this.code += String.fromCharCode(key)
                this.codeTimer && clearTimeout(this.codeTimer)
                this.codeTimer = setTimeout(() => {
                   console.log(this.code, 'code')
                }, 300)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .ld-fta-pick-up {
        .ld-fta-pick-up-content {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            .ld-fta-pick-up-content_info {
                display: flex;
                flex: 1;
                align-items: center;
                text-align: center;
                box-sizing: border-box;
                padding: 0 5px;
                .ld-fta-pick-up-content_info-label {
                    min-width: 170px;
                    font-size: 48px;
                    color: #8C8A8A;
                    text-align: right;
                    box-sizing: border-box;
                    padding-right: 10px;
                    line-height: 72px;
                }
                .diff-label {
                    min-width: 190px;
                }
                .ld-fta-pick-up-content_info-inner {
                    display: flex;
                    justify-content: center;
                    min-width: 400px;
                    font-size: 72px;
                    color: #3E3D3D;
                    .sao-miao-icon, .zheng-que-icon {
                        font-size: 72px;
                        margin-left: 10px;
                    }
                    .sao-miao-icon {
                        animation: fade 600ms infinite;
                        -webkit-animation: fade 600ms infinite;
                    }
                }
                .ld-fta-pick-up-content_info-code {
                    display: flex;
                    justify-content: flex-start;
                }
                .ld-fta-pick-up-content-box-tag {
                    font-size: 32px;
                    line-height: 72px;
                    width: 465px;
                    display: flex;
                    justify-content: flex-start;
                }
                .ld-fta-pick-up-content-name {
                    font-size: 42px;
                    line-height: 72px;
                }
            }
        }
        .ld-fta-pick-up_footer {
            display: flex;
            justify-content: space-between;
            .ld-fta-pick-up_footer-btn {
                width: 600px;
                height: 150px;
                font-size: 53px;
                color: #fff;
                background: #E51C23;
            }
            .ld-fta-pick-up_footer-btn_confirm {
                background: #009688;
            }
        }
    }
    @keyframes fade {
        from {
            opacity: 1.0;
        }
        50% {
            opacity: 0.4;
        }
        to {
            opacity: 1.0;
        }
    }

    @-webkit-keyframes fade {
        from {
            opacity: 1.0;
        }
        50% {
            opacity: 0.4;
        }
        to {
            opacity: 1.0;
        }
    }
</style>
