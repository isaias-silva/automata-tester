

<template>
  <div class="aside">
    <div class="control">
      <router-link to="/">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
      </router-link>
      <button class="mode" @click="toggleDarkMode">
        <span class="moon">&#127769;</span>
        <span class="sun">&#9728;</span>
      </button>
      <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg></button>

      <button @click="killBot()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="feather feather-power">
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"></path>
        </svg>
      </button>
    </div>

    <div class="qr">
      <img :src="src" alt="logo">
      <p>{{ status }}</p>
    </div>
  
   
    <div class="messages" >
      <div class="load" v-if="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
      <router-link  :to="'/chat/' + value.id" v-for="(value, key) in messages" class="contact" v-bind:key="key" @click="readMessage(value.id)">
      
        <img  v-if="value"
          :src="value.picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'"
          alt="profile">
        <div class="blockchat">
          <h5 v-if="value">{{ value.name }}:</h5>

          <p> <span  class="user-title" v-if="value && value.isGroup">{{value && value.msgs && value.msgs.length>0 ? value.msgs[(value.msgs?.length || 1) -
            1].name : 'member' }}: </span>
            {{value && value.msgs && value.msgs.length>0 ? resumeText(value.msgs[(value.msgs?.length || 1) - 1].text) || value.msgs[(value.msgs?.length
              || 1) - 1].type || '[]' : null }}</p>
        </div>
        <div class="count">
          <span v-if="value && value.newMessages && value.newMessages > 0">
            {{value && value.newMessages }}
          </span>
        </div>
      
  
        </router-link>
      <div>
        <button class="btn-view">

          mais conversas
        </button>

      </div>
    </div>
  </div>
</template>
<script lang="ts">

import { defineComponent, watch } from 'vue'
import { useCookies } from "vue3-cookies";
import { socketState, messagesState, socket } from '@/socket'
import { Icontact } from '@/interfaces/interface.bot.contact';
import router from '@/route';
import getContacts from '@/services/get.contacts';
const { cookies } = useCookies();



export default defineComponent({
  name: 'HeaderComponent',
  data(): {
    loading: boolean,
    noturne: boolean,
    src?: string,
    status: string,
    messages: Icontact[]


  } {
    return {
      noturne: cookies.get('noturne') ? true : false,
      src: require('@/assets/icons/load.gif'),
      status: 'disconnected',
      loading: true,
      messages: []
    }
  },
  async mounted() {


    watch(messagesState, (newMessage => {
      this.loading = false
      
     
      this.messages = newMessage.messages
  
  
    }))
    watch(socketState, (newSocketState => {

      if (!newSocketState.WAconnect) {
        return
      }
      const { status, qr } = newSocketState.WAconnect
      this.status = status
      switch (status) {
        case 'qrcode':
          this.src = qr
          console.log(qr)
          break
        case 'connected':

          this.src = require('@/assets/icons/bot.gif')
          break
        case 'disconnected':
          this.src = 'https://cdn2.iconfinder.com/data/icons/malware-and-threats-2/512/Dead_Desktop-512.png'
          break
        case 'loading':
          this.src = require('@/assets/icons/load.gif')
          break
        case 'phone closed session':
          cookies.remove('idWa')
          this.src = 'https://cdn2.iconfinder.com/data/icons/malware-and-threats-2/512/Dead_Desktop-512.png'

          break
        default:
          this.src = require('@/assets/icons/load.gif')
          break
      }
    }))
  },

  methods: {
    killBot() {
      cookies.remove('idWa')
      socket.emit('kill')
      window.location.reload();

    },

    resumeText(text?: string | null) {
      if (!text) {
        return
      }
      let newText = text
      if (newText.length > 17) {
        newText = newText.substring(0, 17) + "..."
      }
      return newText
    },
    toggleDarkMode() {
      this.noturne = !this.noturne;
      if (this.noturne == true) {
        document.body.classList.add('dark');
        cookies.set('noturne', this.noturne ? 'true' : 'false', '15d');
      } else {
        document.body.classList.remove('dark');
        cookies.remove('noturne')
      }


    },
    readMessage(jid?: string|null) {
      if(!jid){
        return
      }
      socket.emit('messageConfig', { read: true, id: jid })
    },
    logout() {
      socket.emit('kill')
    },
    showMenu() {
      alert('show menu')
    }
  }

})
</script>
<style scoped>
* {
  text-align: center;
}

.qr {
  width: 80%;
  margin: auto;
  background: #0000003d;
  margin-top: 80px;

  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 20px;
}

.qr img {
  width: 100%;
}

.user-title {
  font-weight: bold;
}

.arrow {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 20px 10px 0;
  border-color: transparent var(--font-color) transparent transparent;
  transform: rotate(0deg);
  margin: auto;
}

.aside {
  z-index: 999 !important;
  color: var(--font-color);
  background: var(--component-color);
  position: fixed;
  left: 0;
  width: 20%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  border-right: 1px solid #0000003c;
}

.aside::-webkit-scrollbar {
  display: none;
}

.logo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: auto;
  margin-top: 100px;
}

.logo h1 {
  font-size: 18px;
  text-shadow: 2px 2px var(--component-two-color);
}

.logo img {
  grid-area: image;
  width: 70px;
  border-radius: 50%;
  background-color: var(--component-two-color);
  box-sizing: border-box;
}

.logo span {
  grid-area: legenda;
  width: 100%;
  display: block;
}

.control {
  display: flex;
  width: 20%;
  margin-bottom: 20px;
  justify-content: space-between;
  border-bottom: 1px solid var(--component-two-color);
  background-color: #0000002f;
  position: fixed;
  backdrop-filter: blur(3px);
  z-index: 999 !important;
  height: 60px;

}


button {
  width: 40px;
  height: 40px;
  background-color: transparent;
  color: var(--font-color);
  font-size: 24px;
  font-weight: bold;
  border: none;
  transition: 0.5s linear;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 5px;
  padding: 10px;
}

button:hover {
  cursor: pointer;
  background-color: var(--link-color);
}

.mode {
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.mode .moon,
.mode .sun {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  color: #fff;
}

.mode .moon {
  background-color: #000;
  transition-delay: 0.1s;
  transform-origin: left;
}

.mode .sun {
  background-color: #ffc107;
  transition-delay: 0s;
  transform-origin: right;
}

.dark .mode .sun {
  transform: scale(2) rotate(45deg) translate(-50%, -50%) scale(0.5);
}

.mode label:hover {
  cursor: pointer;
  filter: invert(40%);
}

.menu {
  grid-area: opcoes;
  position: relative;
}

.menu input[type='checkbox'] {
  display: none;
}

.menu label {
  width: 40px;
  grid-area: menu;
  position: absolute;
  right: 0;
  transition: 0.5s linear;
}

.menu label span {
  display: block;
  position: relative;
  width: 80%;
  height: 4px;
  margin: 5px;
  background-color: var(--component-two-color);
  transition: 0.1s linear;
  border-radius: 10px;
  right: 10px;
}

.menu label:hover span {
  filter: contrast(60%);
  cursor: pointer;
}

#checker:checked~label span:nth-child(1) {
  rotate: 45deg;
  top: 10px;
  right: 5px;
}

#checker:checked~label span:nth-child(3) {
  rotate: -45deg;
  right: 7px;
  top: -7px;
}

#checker:checked~label span:nth-child(2) {
  opacity: 0;
}

#checker:checked~ul {
  display: block;
}

.btn-view {
  width: 100%;
  margin: 0;
  border-radius: 0;
  font-size: 18px;
}


.menu ul {
  grid-area: list;
  list-style: none;
  position: absolute;
  right: 0;
  top: 65px;
  width: 100%;
  background-color: var(--component-color);
  border-radius: 5px;
  display: none;
  z-index: 1000 !important;
  transition: linear 0.2s;
}

.menu ul li {
  border-bottom: 1px solid var(--link-color);
  padding-top: 5px;
  padding-bottom: 5px;
}

.menu ul li a,
.menu ul li span {
  color: var(--link-color);
  text-decoration: none;
}

.menu ul li a:hover,
.menu ul li span:hover {
  filter: invert(100%);
  cursor: pointer;
}

.messages {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.contact {
  width: 100%;
  display: flex;
  position: relative;
  text-decoration: none;
  color: var(--font-color);
  border-bottom: 1px solid var(--component-two-color);
  box-sizing: border-box;
  padding: 5px;
  transition: 0.5s linear;
}
.contact p{
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 100%;
}
.count {

  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;

}

.count span {
  background-color: #00000057;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  width: 25px;
  height: 25px;
  border-radius: 100%;
}

.contact:hover {
  background-color: #00000060;
  color: #fff;
}

.contact img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  flex-shrink: 1;
  box-sizing: border-box;
  border: 4px solid var(--component-two-color)
}

.blockchat {
  flex-shrink: 1;
  width: 90%;
  margin-left: 5px;

}

.blockchat p,
.blockchat h5 {
  text-align: left;
  font-size: 12px;

}

.blockchat h5 {
  margin-bottom: 10px;
}

.load {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.load span {
  width: 90%;
  height: 60px;
  display: block;
  margin: 5px;
  margin-top: 10px;
  background-color: #00000044;
  border-radius: 10px;

}

.load span:nth-child(1) {
  animation: loadchat 1s infinite;
}

.load span:nth-child(2) {
  animation: loadchat 1.5s infinite;
}

.load span:nth-child(3) {
  animation: loadchat 1.8s infinite;
}

.load span:nth-child(4) {
  animation: loadchat 2s infinite;
}

@keyframes loadchat {
  0% {
    opacity: 1;

  }

  100% {
    opacity: 0.5;

  }

}

@media screen and (max-width: 768px) {
  .aside {
    width: 100%;
    z-index: 9997 !important;

  }

  .control {
    width: 100%;
  }
}
</style>