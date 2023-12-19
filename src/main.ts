import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import VueCookies from 'vue3-cookies'
import VueTheMask from 'vue-the-mask'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faDiagramProject, faRobot,
    faPhone, faDatabase, faPeopleGroup, faUser,
    faPeopleLine, faContactCard, faNetworkWired, faInfo,
    faDashboard, faPowerOff, faMoon, faSun
} from '@fortawesome/free-solid-svg-icons'



library.add(faDatabase,
    faDiagramProject, faRobot,
    faPhone, faPeopleGroup, faUser,
    faPeopleLine, faContactCard,
    faNetworkWired, faInfo, faDashboard, faPowerOff, faMoon, faSun)

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(VueTheMask as any)
app.component('font-awesome-icon', FontAwesomeIcon)



app.mount('#app')

