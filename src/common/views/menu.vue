<template>
    <div @click="$router.push('/relocation')">
        这是一个菜单页面
        <br />
        这里是当前环境对应的访问地址
        <div>{{ $baseUrl.baseUrl }}</div>
        <div>{{ $baseUrl.loginUrl }}</div>
        <div>{{ $baseUrl.artificialSchedulURl }}</div>
        <div>{{ $baseUrl.followImageURL }}</div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>