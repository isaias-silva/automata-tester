
import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.page.vue'
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
}]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router