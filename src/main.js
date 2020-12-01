// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store/index'
import Vuerouter from 'vue-router'
import VueResource from 'vue-resource'
import Axios from 'axios'
import Vuex from 'vuex'

import initHtml5Editor from './common/initHtml5Editor'
import 'font-awesome/css/font-awesome.min.css'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// Vue.use(VueResource)
// Vue.use(Vuerouter)
Vue.use(ElementUI);

Vue.prototype.$http = Axios

Axios.interceptors.request.use(function (config) {
  console.log(config.url)
  config.url = process.env.API_HOST + config.url
  return config
},function (error) {
  console.log(error)
  return Promise.reject(error)
})

router.beforeEach((to,from,next)=>{
  let stoken = store.getters.getsToken
  let user = store.getters.getsName
  console.log(stoken)
  console.log(user)
  if(to.meta.isLogin==true)
  {
    if(!user)
    {
      //获取不到登录信息
      next({path:'/login'})
    }
    else
    {
      return next()
    }
  }else{
    return next();
  }
})
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(initHtml5Editor)
import MonacoInstall from './common/install'
Vue.use(MonacoInstall)
import Video from 'video.js'
import 'video.js/dist/video-js.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
