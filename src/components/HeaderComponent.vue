<template>
    <div :class="min ? 'min header' : 'header'">
        <div class="control">

            <button class="mode" @click="toggleDarkMode">
                <span class="moon">&#127769;</span>
                <span class="sun">&#9728;</span>
            </button>
            <button @click="toogleMin()">

                <svg v-if="min == false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                </svg>

                <svg v-if="min == true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>


        </div>
        <AdminCard />


    </div>
</template>
<script lang="ts">

import { socket } from '@/socket';
import { defineComponent } from 'vue'
import { useCookies } from "vue3-cookies";
import AdminCard from './adminCard.vue';
const { cookies } = useCookies();


export default defineComponent({
    components: {
        AdminCard
    },
    name: 'HeaderComponent',
    data(): {
        message: string,
        noturne: boolean,
        min: boolean
    } {
        return {
            noturne: cookies.get('noturne') ? true : false,
            message: 'the tester automata',
            min: false
        }
    },
    methods: {
        setMessage(value: string) {
            this.message = value
        },

        toggleDarkMode() {
            this.noturne = !this.noturne;
            if (this.noturne == true) {
                document.body.classList.add('dark');
                cookies.set('noturne', this.noturne ? "true" : "false", '15d');

            } else {

                document.body.classList.remove('dark');
                cookies.remove('noturne')
            }
        },
        toogleMin() {
            this.min = !this.min
        },
        logout() {

            cookies.remove('token');
            socket.disconnect()
            this.$router.push('/login')
        }
    }
})
</script>
<style scoped>
.header {
    z-index: 999 !important;
    color: var(--font-color);
    background: var(--component-color);

    width: 20%;
    height: 100%;

    border-right: 2px solid var(--component-two-color);
    transition: 0.2s linear;
    position: fixed;
    overflow-y: scroll;
    box-shadow: 4px 4px 5px #000000;

}

.header::-webkit-scrollbar {
    display: none;
}

.min {
    width: 10%;
}


.control {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    justify-content: space-between;
    border-bottom: 1px solid var(--component-two-color);
    background-color: #0000002f;
    position: sticky;
    backdrop-filter: blur(3px);
    z-index: 999 !important;
    height: 60px;

}

.control button {

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

.control button:hover {
    cursor: pointer;
    background-color: var(--link-color);
}

.logo {

    display: flex;
    justify-content: space-between;
}

.logo h1 {
    font-size: 24px;
    text-shadow: 2px 2px var(--component-two-color)
}

.logo img {

    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: var(--component-two-color);
    box-sizing: border-box;
    margin: 10px;

}

.logo span {

    width: 100%;
    display: block;
}



button.mode {

    background: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 100%;
    flex-shrink: 0;
}

.mode .moon,
.mode .sun {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
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
    transform: rotate(45deg) translateX(45%);
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

@media screen and (max-width: 768px) {
    .header {
        display: flex;
    }

    .logo {
        display: flex;
        flex-direction: column;
    }

    .mode {
        position: absolute;
        top: 0;
        left: 20%
    }

    .logo h1 {
        text-align: center;

    }

    .menu {
        position: static;
        margin-top: 20px;
    }

    .menu ul {
        top: 10%;
    }

    .menu ul li {
        border-bottom: none;
        padding: 0;
    }
}
</style>