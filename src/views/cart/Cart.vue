<template>
	<div id="Cart">
<!--		导航-->
		<nav-bar class="nav-bar">
			<div slot="center">购物车({{CartLength}})</div>
		</nav-bar>

<!--		商品列表-->
		<cart-list/>

<!--		底部汇总-->
		<cart-bottom-bar/>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";
	import CartList from "./childComps/CartList";
	import CartBottomBar from "./childComps/CartBottomBar";
	import {mapGetters} from 'vuex'

	export default {
		name:'Cart',
		components:{
			NavBar,
			CartList,
			CartBottomBar
		},
		computed:{
			//两种语法
			...mapGetters(['CartLength','CartList'])
			// ...mapGetters({
			// 	length:'CartLength',
			// 	list:'CartList'
			// })
		}
	}
</script>

<style>
	.nav-bar{
		background-color: var(--color-tint);
		font-size: 16px;
		font-weight: 700;
		color: #fff;
	}
</style>
