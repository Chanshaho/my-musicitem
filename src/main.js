import Vue from 'vue'
import './plugins/axios'
import './plugins/filter'
import App from './App.vue'
import router from './router'
import '@/assets/reset.css'
import '@/assets/animate.4.css'
import '@/assets/css/font-awesome.min.css'
import 'reset-css'
import Loading from '@/components/Loading.vue'
import Playing from '@/components/Playing.vue'
Vue.component('loading', Loading)
Vue.component('playing', Playing)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
