import { createApp} from 'vue'
import App from './App.vue'
import router from './route'
import VueCookies from 'vue3-cookies'





const app = createApp(App)
app.use(router)
app.use(VueCookies)



app.mount('#app')

