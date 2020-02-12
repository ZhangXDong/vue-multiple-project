<template>
    <div class="ld-fta-content ld-fta-flex">
        <!-- 头部 -->
        <fta-header></fta-header>
        <!-- 内容区 -->
        <div class="ld-fta-flex ld-fta-container">
            <router-view />
        </div>
    </div>
</template>

<script>
    import ftaHeader from '@/components/Header.vue'
    export default {
        components: {
            ftaHeader,
        }
    }
</script>

<style lang="scss" scoped>

</style>
