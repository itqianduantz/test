<template>
	<div id="home">
	  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

		<tab-control
				:titles="['流行','新款','精选']"
				@tabClick="tabClick"
				ref="tabControl1"
				class="tab-control"
				v-show="isTabFixed" />
	  <scroll class="content"
			  ref="scroll"
			  :probe-type="3"
			  @scroll="contentScroll"
			  :pull-up-load="true"
			  @pullingUp="loadMore">
		  <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
		  <recommend-view :recommends="recommends" />
		  <feature-view />
		  <tab-control
					   :titles="['流行','新款','精选']"
					   @tabClick="tabClick"
					   ref="tabControl2"/>
		  <goods-list :goods="showGoods"/>
	  </scroll>
<!--		//.native修饰-->
<!--		//在我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符，才能进行监听-->
		<back-top @click.native="backTop" v-show="isShowBackTop"/>
	</div>
</template>

<script>
	// 子组件
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from "./childComps/FeatureView";

	//公共组件
	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from "components/content/tabControl/TabControl"
	import GoodsList from "components/content/goods/GoodsList";
	import Scroll from "components/common/scroll/Scroll";

	import {getHomeMultidata,getHomeGoods} from 'network/home'
	import {debounce} from "common/utils";
	import {itemListenerMixin,backTopMixin} from 'common/mixin'

	export default {
		name:'Home',
		components:{
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabControl,
			GoodsList,
			Scroll,
		},
		mixins:[itemListenerMixin,backTopMixin],
		data(){
			return{
				banners:[],
				recommends:[],
				goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]},
				},
				currentType:'pop',
				tabOffsetTop:0,
				isTabFixed:false,
				saveY:0,
			}
		},
		computed:{
			showGoods(){
				return  this.goods[this.currentType].list
			}
		},
		destroyed() {
			console.log('home destroyed')
		},
		activated() {
			//保存Y值
			this.$refs.scroll.scrollTo(0,this.saveY,200)
			this.$refs.scroll.refresh()
			//取消全局事件的监听
			this.$bus.$off('itemImageLoad', this.itemImgListener)
		},
		deactivated() {
			this.saveY = this.$refs.scroll.getScrollY()
			// console.log(this.saveY);
		},
		created(){
			//1.请求多个数据
			this.getHomeMultidata()

			//2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted() {
			//3.监听item中图片加载完成

			//this.$refs.srcoll.refresh对这个函数进行防抖操作

		},
		methods:{
			//事件监听相关的方法


			tabClick(index){
				switch (index) {
					case 0:
						this.currentType='pop'
						break
					case 1:
						this.currentType='new'
						break
					case 2:
						this.currentType='sell'
						break
				}
				//让两个TabControl的currentIndex保持一致
				this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index
			},
			backTop(){
				this.$refs.scroll.scrollTo(0,0)
			},
			contentScroll(position){
				// console.log(position)
				//1.判断BackTop是否显示
				this.isShowBackTop = (-position.y) > 1000

				//2. 决定tabControl是否吸顶(position: fixed)
				this.isTabFixed = (-position.y) > this.tabOffsetTop
			},
			loadMore(){
				// console.log('上拉加载更多')
				//currentType当前选中
				this.getHomeGoods(this.currentType)
			},

			//获取tabcontrol的offsetop
			//所有的组件都有一个属性$el:用于获取组件中的元素
			swiperImageLoad(){
				this.tabOffsetTop =	this.$refs.tabControl2.$el.offsetTop;
			},

			//网络请求相关的方法
			getHomeMultidata(){
				getHomeMultidata().then(res => {
					// this.result = res
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods(type){
				const page = this.goods[type].page + 1
				getHomeGoods(type,page).then(res => {
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1

					//完成上拉加载更多
					this.$refs.scroll.finishPullUp()
				})
			}
		}
	}
</script>

<style scoped>
	#home{
		/*padding-top: 44px;*/
		height: 100vh;
		position: relative;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #FFFFFF;

		/*position: fixed;*/
		/*left: 0;*/
		/*right: 0;*/
		/*top: 0;*/
		/*z-index: 9;*/
	}

	.tab-control{
		position: relative;
		z-index: 9;
	}
	.content{
		/*height: 300px;*/
		overflow: hidden;

		position: absolute;
		top:44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}

</style>
