<template>
   	<div class="ld-flex ld-fta-follow-identify">
        <canvas id='mycanvas'>
            当前浏览器不支持canvas，请更换浏览器后再试！
        </canvas>
        <div class="ld-fta-follow-prompt_words">请尽量站在画面正中间</div>
   	</div>
</template>

<script>
let canvaData = null
let context = null
export default{
    data() {
        return {
            timer: null,
            context: null
        }
    },
    methods:{
        createPictureSrc() {
            let imageData = new Image()
            canvaData = document.getElementById("mycanvas")
            context = canvaData.getContext("2d")
            imageData.crossOrigin = ''
            imageData.src = 'http://127.0.0.1:8071/fta-client/followImg?' + new Date().getTime()
            imageData.onload = function (){
                context.drawImage(imageData, 0, 0, 500, 500)
            }
            this.getImgSrc()
        },
        getImgSrc() {
            let imageData = new Image()
            imageData.crossOrigin = ''
            imageData.src = 'http://127.0.0.1:8071/fta-client/followImg?' + new Date().getTime()
            imageData.onload = function (){
                context.drawImage(imageData, 0, 0, 500, 500)
            }
            this.timer && clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.getImgSrc()
            }, 100)
        }
    },
    mounted () {
        this.createPictureSrc()
    },
    beforeDestroy() {
        this.timer && clearTimeout(this.timer)
    }
}
</script>

<style lang="scss" scoped>
    .ld-fta-follow-identify {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        >img {
            width: 100%;
            height: 100%;
            position: absolute;
        }
        #mycanvas {
            width: 500px;
            height: 500px;
            background: #000;
        }
        .ld-fta-follow-prompt_words {
            font-size: 32px;
            margin-top: 50px;
        }
    }
</style>
