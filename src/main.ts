import { createApp} from 'vue'
import App from './App.vue'
import router from './route'
import VueCookies from 'vue3-cookies'
import { messagesState, socketState } from './socket'




const app = createApp(App)
app.use(router)
app.use(VueCookies)



app.mount('#app')