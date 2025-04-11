import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'
import qdHome from '@/pages/qdHome.vue'
import qdTasks from '@/pages/qdTasks.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: qdHome
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: qdTasks
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
