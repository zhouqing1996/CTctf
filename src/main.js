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
import axios from 'axios'

import initHtml5Editor from './common/initHtml5Editor'
import 'font-awesome/css/font-awesome.min.css'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(initHtml5Editor)
Vue.prototype.$http = axios
axios.interceptors.request.use(function (config) {
  config.url=process.env.apiBaseUrl+config.url
  return config
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
Vue.use(VueResource)
Vue.use(Vuerouter)
// Vue.use(VueAxios,axios)//注册
Vue.use(ElementUI);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
