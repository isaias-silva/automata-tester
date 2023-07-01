<template>
    <div :class="headerFixed ? 'header fixed' : 'header'">
        <div class="logo">
            <img src="logo.png" alt="logo">
            <h1>Automata tester</h1>
            <span>{{ message }}</span>
            <button class="mode" @click="toggleDarkMode">

                <span class="moon"></span>
                <span class="sun"></span>
            </button>
        </div>

        <div class="menu">
            <input type="checkbox" id="checker">
            <label for="checker">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <ul>
                <li>
                    <router-link to="/">create flow</router-link>
                </li>
                <li>
                    <router-link to="/">create attendants</router-link>
                </li>
                <li>
                    <router-link to="/">create users</router-link>
                </li>
                <li>
                    <router-link to="/">get users</router-link>
                </li>
                <li>
                    <router-link to="/">get attendants</router-link>
                </li>
                <li>
                    <router-link to="/">get chat</router-link>
                </li>
                <li>
                    <router-link to="/">documentation</router-link>
                </li>
                <li>
                    <span @click="logout">logout</span>
                </li>
            </ul>
        </div>

    </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default defineComponent({
    name: 'HeaderComponent',
    data(): {
        message: string,
        noturne: boolean,
        headerFixed: boolean
    } {
        return {
            noturne: cookies.get('noturne') ? true : false,
            message: 'the tester automata',
            headerFixed: false
        }
    },
    methods: {
        setMessage(value: string) {
            this.message = value
        },
        handleScroll() {
            const header = document.querySelector('.header');

            if (header && header.scrollHeight) {
                const sticky = header.scrollHeight;
                this.headerFixed = window.scrollY > sticky + header.clientHeight-(header.clientHeight/2);
            }
        },
        toggleDarkMode() {
            this.noturne = !this.noturne;
            if (this.noturne == true) {
                document.body.classList.add('dark');
                cookies.set('noturne', this.noturne?"true":"false", '15d');
            } else {
                document.body.classList.remove('dark');
                cookies.remove('noturne')
            }


        },
        logout(){
            cookies.remove('token');
            this.$router.push('/login')
        }
    }, mounted() {
        window.addEventListener('scroll', this.handleScroll);
    }
})
</script>
<style scoped>
.header {
    z-index: 999!important;
    color: var(--font-color);
    background: var(--component-color);
    display: grid;
    width: 100%;
    grid-template-areas: "logo logo opcoes";
    grid-template-columns: 60% 10%;
    border-bottom: 2px solid var(--component-two-color);
    transition: 0.2s linear;

}

.fixed {
    position: sticky;
    top: 0;
}

.logo {
    grid-area: logo;
    display: grid;
    grid-template-areas: "image title btn" "image legenda btn";
    grid-template-columns: 10% 20% 30%;
    

}

.logo h1 {
    grid-area: title;
    text-shadow: 2px 2px var(--component-two-color)
}

.logo img {
    grid-area: image;
    width: 70px;
    border-radius: 100%;
    background-color: var(--component-two-color);
    box-sizing: border-box;

}

.logo span {
    grid-area: legenda;
    width: 100%;
    display: block;
}

.mode {
    
    grid-area: btn;
}

.mode {
   
    background: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    width: 40px;
    height: 40px;
}

.mode .moon,
.mode .sun {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
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
    transform: scale(2);
    transform: rotate(45deg);
    transform: translate(-50%, -50%) scale(0.5);
}



.mode label:hover {
    cursor: pointer;
    filter: invert(40%)
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
    z-index: 998 !important;
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