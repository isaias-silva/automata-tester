
import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.page.vue'
import userPage from '@/views/user.page.vue'
import login from '@/views/login.register.page.vue'
import chatPage from '@/views/chat.page.vue'
import chatPageDetails from '@/views/chat.page.details.vue'
import hometemplate from '@/templates/HomeTemplate.vue'
import chatTemplate from '@/templates/chatTemplate.vue'
import planRenovate from '@/views/plan.renovate.vue'
const routes = [

  {

    path: '/',
    name: 'home',
    component: hometemplate,
    children: [
      {
        path: '',
        component: home
      },
      {
        name: 'profile',
        path: '/profile',
        component: userPage
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login,

  },
  {
    path: '/chat/:botId',
    name: 'chat',
    component: chatTemplate,
    children: [
      {
        path: '',
        component: chatPage
      },

      {
        path: '/chat/:botId/:id',
        component: chatPageDetails
      },
      
     
      
    ]
  },
  {
    path: '/renovate',
    component: planRenovate
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router