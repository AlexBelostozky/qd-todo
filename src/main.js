import Vue from 'vue'
import qdTodo from './qdTodo.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(qdTodo)
}).$mount('#qd-todo')
