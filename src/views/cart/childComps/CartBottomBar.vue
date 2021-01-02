<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button
                    :is-checked="isSelectAll"
                    class="check-button" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="price">
            总价:<span>{{ totalPrice }}</span>
        </div>
        <van-button type="warning" class="calculate" @click.native="calcClick">去计算({{checkLength}})</van-button>
    </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton";
    import { mapGetters } from 'vuex'
    import {Button} from 'vant'
    export default {
        name: "CartBottomBar",
        components:{
            CheckButton,
            [Button.name]:Button,
        },
        computed:{
            ...mapGetters(['CartList']),
            totalPrice(){
                return '￥' + this.CartList.filter(item => {
                    return item.checked
                }).reduce((preValue,item) => {
                    return preValue + item.price * item.count
                },0).toFixed(2)
            },
            checkLength(){
                return this.CartList.filter(item => item.checked).length
            },
            isSelectAll(){
                if(this.CartList.length === 0) return false
                for (let item of this.CartList){
                    if (!item.checked){
                        return false
                    }
                }
                return true
            }
        },
        methods:{
            checkClick(){
                if (this.isSelectAll){//全部选中
                    this.CartList.forEach(item => item.checked = false)
                } else {//部分或全部不选中
                    this.CartList.forEach(item => item.checked = true)
                }
            },
            calcClick(){
                if (this.CartList.filter(item => item.checked = false)){
                    this.$toast.show('请选择商品')
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-bar{
        display: flex;
        height: 40px;
        background-color: #eee;
        bottom: 132px;
        /*width: 100%;*/
        line-height: 40px;
    }
    .check-content{
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    .check-content span{
        font-size: 16px;
    }
    .check-button{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .price{
        margin-left: 50px;
    }
    .price span{
        font-size: 20px;
        font-weight: 700;
        color: red;
    }
    .calculate{
        height: 40px;
        margin-left: auto;
    }
</style>
