<template>
    <div class="header">
        <div class="logo">
            <img src="logo.png" alt="logo">
            <h1>Automata tester</h1>
            <span>{{ message }}</span>
            <div v-bind:class="noturne?'mode reverse':'mode'">
                <input type="checkbox" id="check" v-model="noturne">
                <label for="check"></label>
                <img v-bind:src="noturne?require('@/assets/moon.png'):require(`@/assets/sun.png`)" alt="">
            </div>
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
            </ul>
        </div>

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'



export default defineComponent({
    name: 'HeaderComponent',
    data(): { message: string, noturne: boolean } {
        return {
            noturne: false,
            message: 'the tester automata'
        }
    } ,
    methods: {
        setMessage(value: string) {
            this.message = value
        }
    },
    watch: {
        noturne(newVal) {
         
            if (newVal) {
            this.noturne=true
            } else {
          this.noturne=false
            }
        }
    }
})
</script>
<style scoped>
.header {
    color: var(--font-color);
    background: var(--component-color);
    display: grid;
    width: 100%;
    grid-template-areas: "logo logo opcoes";
    grid-template-columns: 70% 10%;
    border-bottom: 2px solid var(--component-two-color)
}

.logo {
    grid-area: logo;
    display: grid;
    grid-template-areas: "image title btn" "image legenda btn";
    grid-template-columns: 10% 15% 35%;

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
    display: flex;
    width: 100px;
    height: 50px;
    border-radius: 40px;
    border: none;
    background-color: var(--component-two-color);
margin-top: 25px;
    transition: linear 0.4s;
}

.mode img,
.mode input {
    height: 50px;
    width: 50px;

}

.mode input {
    position: relative;
    filter: opacity(0);
}

.mode label {
    content: "";
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: var(--font-color);
    transition: linear 0.2s;
}

.mode label:hover {
    cursor: pointer;
    filter: invert(40%)
}

.mode button:hover {
    cursor: pointer;
    background-color: var(--component-color);
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
}

.menu ul li {
    border-bottom: 1px solid #fff;
    padding-top: 5px;
    padding-bottom: 5px;
}

.menu ul li a {
    color: var(--link-color);
    text-decoration: none;
}

.menu ul li a:hover {
    filter: invert(100%)
}

.reverse {
    flex-direction: row-reverse;
}
</style>