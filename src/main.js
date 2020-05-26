import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from 'store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import 'assets/css/base.scss'
import Loading from 'plugin/loading'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)

// 注意点: 如果想通过use的方式来注册组件, 那么必须先将组件封装成插件
Vue.use(Loading, {
  title: '正在加载...'
})

Vue.use(VueLazyload, {
  // 设置占位图片
  loading: require('assets/images/placeholder.png')
})

// 解决移动端100~300ms延迟的问题
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // 预渲染自动添加
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
