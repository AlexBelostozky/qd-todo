import Vue from 'vue'
import VueRouter from 'vue-router'
import qdHome from '../views/qdHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: qdHome
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/qdTasks.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
