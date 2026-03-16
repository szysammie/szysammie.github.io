import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LandingPage from '@/views/LandingPage.vue'

// 定义路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage, // Temporarily switch to new design
  },
  {
    path: '/old',
    name: 'old-home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'about',
    component: {
      template: '<div class="text-center text-xl p-8">About Page - Coming Soon</div>',
    },
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
