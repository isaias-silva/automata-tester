
import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.page.vue'
import userPage from '@/views/user.page.vue'
import login from '@/views/login.register.page.vue'
import chatPage from '@/views/chat.page.vue'
import chatPageDetails from '@/views/chat.page.details.vue'
import hometemplate from '@/templates/HomeTemplate.vue'
import chatTemplate from '@/templates/chatTemplate.vue'

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
      name:'profile',
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
  path:'/chat',
  name:'chat',
  component: chatTemplate,
  children:[
    {path:'',
    component: chatPage
  },

  {path:':id',
    component: chatPageDetails
}
  ]
}
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router