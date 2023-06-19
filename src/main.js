import Vue from 'vue'
import qdTodo from './qdTodo.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(qdTodo)
}).$mount('#qd-todo')
