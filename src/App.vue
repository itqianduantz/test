<template>
  <div id="app">
      <transition>
          <keep-alive exclude="Detail">
              <router-view/>
          </keep-alive>
      </transition>
    <main-tab-bar></main-tab-bar>
      <icon></icon>
      <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
import Icon from 'components/content/Icon/Icon'
import SvgIcon from 'components/content/Icon/svg'

export default {
  name: 'App',
  components: {
	 MainTabBar,
      Icon,
      SvgIcon,
  },
    data() {
        return {
            animate: ""
        };
    },
}
</script>

<style scoped>
		@import url("assets/css/base.css");
        #app{
            overflow-x: hidden;
        }
    .v-enter{
        opacity: 0;
        transform: translate(100%);
    }
    .v-leave-to{
        opacity: 0;
        transform: translate(-100%);
        position: absolute;
    }
    .v-enter-active,.v-leave-active{
        transition: all 0.1s ease;
    }
</style>
