
import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.page.vue'
import login from '@/views/login.register.page.vue'
import hometemplate from '@/templates/HomeTemplate.vue'
const routes = [{
  path: '/',
  name: 'home',
  component: hometemplate,
  children: [
    {
      path: '',
      component: home
    }
  ]
},
{
  path: '/login',
  name: 'login',
  component: login,

}
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router