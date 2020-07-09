import Vue from 'vue'
import store from "../store/index"

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//解决移动端延迟
import FastClick from 'fastclick'
// //图片懒加载
// import VueLazyLoad from 'vue-lazyload'

import toast from '@/components/common/toast/index'

import router from './router'
import App from './App'

Vue.prototype.$store = store

//安装toast插件
Vue.use(toast)

//解决移动端300毫秒延迟
FastClick.attach(document.body)

//新建一个事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
