// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('@/common/img/default.jpg')
})

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.filter('date', (val) => {
  var val = new Date(val);
  var year = val.getFullYear();

  var month = val.getMonth() + 1;
  month = month>9 ? month : '0' + month

  var day = val.getDate();
  return `${year}-${month}-${day}`
})
Vue.filter('datetime', (val) => {
  var val = new Date(val);
  var year = val.getFullYear()

  var month = val.getMonth() + 1
  month = month>9 ? month : '0' + month

  var day = val.getDate()
  day = day>9 ? day : '0' + day 

  var hour = val.getHours()
  hour = hour>9 ? hour : '0' + hour

  var min = val.getMinutes()
  min = min>9 ? min : '0' + min

  var sec = val.getSeconds()
  sec = sec>9 ? sec : '0' + sec
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
})
Vue.filter('currency', (val) => {
  return `￥${val.toFixed(2)}`
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
