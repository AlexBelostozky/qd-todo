import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'
import qdHome from '../views/qdHome.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: qdHome
  },
  {
    path: '/tasks',
    name: 'tasks',
    // route level code-splitting
    // this generates a separate chunk for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/qdTasks.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

let previousRoute: RouteLocationNormalized | null = null
export const getPreviousRoute = () => previousRoute

router.beforeEach((to, from, next) => {
  if (from.name) {
    previousRoute = from
  }

  next()
})

export default router
