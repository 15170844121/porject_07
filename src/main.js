import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
// 定制主题  切记 为了能够覆盖默认的 less 变量 这里一定要把后缀名改为 .less
import 'vant/lib/index.less'

Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
