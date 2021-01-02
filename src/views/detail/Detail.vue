<template>
    <div id="detail">
        <detail-nav-bar
                class="detail-nav"
                @titleClick="titleClick" ref="nav"/>
        <scroll class="content"
                :pull-up-load="true"
                ref="scroll"
                @scroll="contentScroll" :property="3">
            <detail-swiper :top-images="topImages" />
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommendList"/>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop" />
        <detail-bottom-bar @addCart="addToCart"/>
<!--        <toast :message="message" :isShow="isShow" />-->
    </div>
</template>

<script>
    import DetailNavBar from './chidComps/DetailNavBar';
    import DetailSwiper from "./chidComps/DetailSwiper";
    import DetailBaseInfo from "./chidComps/DetailBaseInfo";
    import DetailShopInfo from "./chidComps/DetailShopInfo";
    import DetailGoodsInfo from "./chidComps/DetailGoodsInfo";
    import DetailParamInfo from "./chidComps/DetailParamInfo";
    import DetailCommentInfo from "./chidComps/DetailCommentInfo";
    import DetailBottomBar from "./chidComps/DetailBottomBar";
    import GoodsList from "components/content/goods/GoodsList";

    import Scroll from "components/common/scroll/Scroll";

    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
    import {debounce} from 'common/utils'
    import {itemListenerMixin,backTopMixin} from 'common/mixin'

    export default {
        name: "Detail",
        components:{
            GoodsList,
            DetailGoodsInfo,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Scroll,
        },
        mixins:[itemListenerMixin,backTopMixin],
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo: {},
                commentInfo:{},
                recommendList: [],
                themeTopYs:[],
                currentIndex:0,
            }
        },
        created() {
            //1.保存传入的iid
            this.iid = this.$route.params.iid

            //2.根据iid请求详情数据
            getDetail(this.iid).then(res => {
                // 1.获取顶部的图片轮播数据
                console.log(res)
                const data = res.result
                this.topImages = data.itemInfo.topImages

                //2.获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

                //3.创建店铺信息的对象
                this.shop = new Shop(data.shopInfo)

                //4.获取商品信息
                this.detailInfo = data.detailInfo

                //5.获取商品参数
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

                // 6.保存评论信息
                if (data.rate.list) {
                    this.commentInfo = data.rate.list[0];
                }
                //第一次获取，值不对
                //值不对的原因：this.$refs.params.$el压根没渲染
                // this.themeTopYs=[]
                // this.themeTopYs.push(0)
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                // console.log(this.themeTopYs)
                //
                // this.$nextTick(() => {
                //     //2.第二次获取：值不对
                //     //值不对的原因：图片没有计算在内
                //     //根据最新的数据，对应的DOM是已经被渲染出来
                //     //但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
                //     //offsetTop值不对的时候，都是因为图片的问题
                //     this.themeTopYs=[]
                //     this.themeTopYs.push(0)
                //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                //     console.log(this.themeTopYs)
                // })
            })


            // 3.请求推荐数据
            getRecommend().then(res => {
                this.recommendList = res.data.list
            })
        },
        methods:{
            imageLoad(){
                this.$refs.scroll.refresh()
                this.$nextTick(() => {
                    this.themeTopYs=[]
                    this.themeTopYs.push(0)
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
                    this.themeTopYs.push(Number.MAX_VALUE)
                    console.log(this.themeTopYs)
                })
            },
            titleClick(index){
                // console.log(index)
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
            },
            contentScroll(position){
                //1.判断BackTop是否显示
                this.isShowBackTop = (-position.y) > 1000
                //获取y值
                const positionY = -position.y

                //2.positionY和主题中的值进行对比
                //positionY在0和7938之间，index = 0
                //positionY在7938和9120之间，index = 1
                //positionY在9120和9452之间，index = 2

                //positionY超过9452值，index = 3
                let length = this.themeTopYs.length
                for (let i = 0;i<length - 1;i++){
                    if (this.currentIndex !==i && (positionY >= this.themeTopYs[i]
                        && positionY < this.themeTopYs[i+1])){
                        this.currentIndex = i
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                    // if (this.currentIndex !==i && ((i < length-1 && positionY >= this.themeTopYs[i] && positionY <
                    //     this.themeTopYs[i+1]) || (i === length -1 && positionY >= this.themeTopYs[i]))){
                    //     this.currentIndex = i
                    //     // console.log(this.currentIndex)
                    //     this.$refs.nav.currentIndex = this.currentIndex
                    // }
                }
            },
            addToCart(){
               //1.获取购物车需要展示的信息
                const product = {}
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;

                //2.将商品添加到购物车里
                // this.$store.commit('addCart',product)
                this.$store.dispatch('addCart',product).then(res => {
                    // this.isShow=true
                    // this.message=res
                    // setTimeout(() => {
                    //     this.isShow=false
                    //     this.message=''
                    // },2000)
                    // console.log(res)
                   this.$toast.show(res,2000)
                    console.log(this.$toast)
                })
            }
        },
        mounted() {
        },
        destroyed() {
            this.$bus.$off('itemImageLoad', this.itemImgListener)
        }
    }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 10;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height: calc(100% - 44px - 49px);
    }
</style>
