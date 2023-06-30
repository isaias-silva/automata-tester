

<template>
  <div class="aside">
    <div class="control">
      <router-link to="/">
        <button>
          <i class="arrow"></i>
        </button>
      </router-link>
      <button class="mode" @click="toggleDarkMode">
        <span class="moon"></span>
        <span class="sun"></span>
      </button>
    </div>
    <div class="logo">

      <img src="logo.png" alt="logo">
      <h1>Automata tester</h1>

    </div>
    <div class="qr">
      <img :src="src" alt="logo">
    </div>
    <p>{{ status }}</p>
    <div class="messages">

    </div>
  </div>
</template>
<script lang="ts">

import { defineComponent, inject, watch } from 'vue'
import { useCookies } from "vue3-cookies";
import { socketState, messagesState } from '@/socket'
const { cookies } = useCookies();



export default defineComponent({
  name: 'HeaderComponent',
  data(): {

    noturne: boolean,
    src: any,
    status: string,



  } {
    return {
      noturne: cookies.get('noturne') ? true : false,
      src: require('@/assets/icons/load.gif'),
      status: 'disconnected'
    }
  },
  mounted() {
    watch(messagesState, (newMessage => {
      console.log(newMessage)
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
          this.src = 'https://cdn2.iconfinder.com/data/icons/malware-and-threats-2/512/Dead_Desktop-512.png'

        break
        default:
          this.src = require('@/assets/icons/load.gif')
        break
      }
    }))
  },

  methods: {

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
    logout() {
      cookies.remove('token');
      this.$router.push('/login')
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
  margin-top: 10px;
  overflow: hidden;
  border-radius: 20px;
}

.qr img {
  width: 100%;
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
}

.logo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: auto;
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
  width: 100%;
  margin-bottom: 20px;

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
  transition: transform 0.3s ease;
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

.reverse {
  flex-direction: row-reverse;
}
</style>