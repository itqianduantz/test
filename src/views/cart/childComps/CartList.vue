<template>
    <div class="cart-list">
        <scroll class="content" :pull-up-load="true" ref="scroll">
           <cart-list-item v-for="(item,index) in CartList" :key="index" :product="item">
           </cart-list-item>
        </scroll>
    </div>
</template>

<script>
    import Scroll from "components/common/scroll/Scroll";
    import CartListItem from "./CartListItem";

    import {mapGetters} from 'vuex'

    export default {
        name: "CartList",
        components:{
            Scroll,
            CartListItem
        },
        computed:{
            ...mapGetters(['CartList'])
        },
        activated() {
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
    .cart-list{
    }
    .content{
        height: 531px;
        overflow: hidden;
        z-index: 999;
    }
</style>
