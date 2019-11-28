<template>
    <div>
        <!-- 头部 -->
        <fta-header></fta-header>
        <!-- 内容区 -->
        <router-view />
    </div>
</template>

<script>
    import ftaHeader from '@/components/Header.vue'
    export default {
        components: {
            ftaHeader,
        },
        created() {
            
        },
    }
</script>

<style lang="scss" scoped>

</style>
