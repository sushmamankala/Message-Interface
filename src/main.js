import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

var app = new Vue({
  el: '#app',
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
window.app = app