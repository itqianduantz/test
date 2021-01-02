import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

//安装toast插件
Vue.use(toast)

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟
FastClick.attach(document.body)

//图片懒加载
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png'),
})

import Loading from 'components/content/Loading'
Vue.component('Loading',Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
