import 'normalize.css/normalize.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI, {
  size: 'medium'
})

new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
