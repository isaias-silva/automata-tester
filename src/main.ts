import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import VueCookies  from 'vue-cookies'




const app=createApp(App)
app.use(VueCookies)
app.use(router)

 app.config.globalProperties.$swal;

app.mount('#app')
