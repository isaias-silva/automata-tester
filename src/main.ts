import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import VueCookies  from 'vue-cookies'
createApp(App).use(VueCookies).use(router).mount('#app')
