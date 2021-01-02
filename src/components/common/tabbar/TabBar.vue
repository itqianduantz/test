<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "TabBar"
	}
</script>

<style scoped>
  #tab-bar {
    /* 本身的样式 */

    height: 49px;
    border-top: 1px solid #eee;
   box-shadow: 0px -1px 5px 0px
   rgba(3,0,0,0.2);
    z-index: 9;

    /* 定位相关 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* 利用flex进行布局 */
    display: flex;
    text-align: center;
  }
</style>


