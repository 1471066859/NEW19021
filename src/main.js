import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../src/assets/base.css'
import axios from 'axios'
import VueAxios from 'vue-axios'



import qs from 'qs'
import "@/assets/fonts/iconfont.css"

axios.defaults.timeout = 5000;
Vue.prototype.qs = qs;
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(MintUI)

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')