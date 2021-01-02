<template>
    <div class="tab-control">
<!--文字不一样-->
        <div v-for="(item, index) in titles"
             class="tab-control-item"
             :class="{active:index === currentIndex}"
             @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props:{
            titles:{
                tyoe:Array,
                // 当为对象或数组时，default为函数
                default(){
                    return []
                }
            }
        },
        data(){
            return{
                currentIndex:0
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex=index
                this.$emit("tabClick",index)
            }
        }
    }
</script>

<style scoped>
    .tab-control{
        display:flex;
        text-align: center;
        font-size: 14px;
        background-color: #FFFFFF;
        /*z-index: 10;*/
    }

    .tab-control-item{
        flex: 1;
        height: 40px;
        line-height: 40px;
    }

    .tab-control-item span{
        padding: 5px;
    }

    .active{
        color: var(--color-high-text);
    }
    .active span{
        border-bottom: 2px solid var(--color-tint);
    }
</style>
