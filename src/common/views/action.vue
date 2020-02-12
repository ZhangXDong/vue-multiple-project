<template>
    <div class="ld-fta-action ld-fta-flex">
        <div class="ld-fta-action_go-back">
            <svg class="icon ld-fta-action_go-back-icon" aria-hidden="true" @click="goBack()">
                <use xlink:href="#iconhuitui-blue"></use>
            </svg>
        </div>
        <router-view />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data() {
            return {
               
            }
        },
        computed: {
            ...mapGetters([
                'userID',
                'userInfo'
            ]),
        },
        methods: {
            goBack(){
                this.$router.back()
            },
            goPosition(){
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ld-fta-action {
        margin: -15px;
        .ld-fta-action_go-back {
            width: 100%;
            height: 50px;
            background: #e9ebf7;
            .ld-fta-action_go-back-icon {
                color: #3F50B5; 
                font-size: 50px;
                line-height: 50px;
                width: 100px;
            }
        }
    }
</style>
