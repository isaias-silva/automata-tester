<template>
    <LoadPopup v-if="load" />
    <Popup :title="popupMessages.title" :message="popupMessages.message" v-if="showPopup" @close="() => showPopup = false" />

    <form @submit.prevent="createBotForm">
        <h3>crie um novo bot</h3>

        <div class="inputBlock">

            <input v-model="name" placeholder="nome do bot" type="text">

            <label for="mode">modo do bot</label>
            <div class="block">
                <select v-model="mode" id="mode">
                    <option value="attendant">attendant</option>
                    <option value="attendant">sniper</option>
                </select>
            </div>
            <div class="block">
                <label for="type">tipo de bot</label>
                <select v-model="type" id="type">
                    <option value="WaBot">whatsapp</option>
                </select>
            </div>
        </div>


        <button> criar </button>
    </form>
</template>
<script lang="ts">
import createBot from '@/services/createBot';
import { defineComponent } from 'vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()

import Popup from './popups/popup.vue';
import LoadPopup from './popups/load.popup.vue';

export default defineComponent({
    name: "createBotForm",

    data() {
        return {
            name: "",
            mode: "",
            type: "",
            load: false,
            showPopup: false,
            popupMessages: { title: '', message: '' }
        };
    },
    methods: {
        async createBotForm() {
            if (this.name.length > 2 && this.mode.length > 1 && this.type.length > 1) {
                this.load = true
                setTimeout(async () => {
                    const response = await createBot(cookies.get("token"), { name: this.name, mode: this.mode, type: this.type, path: Math.random().toString(32).replace('0.', 'I') });
                    this.load = false
                    this.popupMessages.message = response.message
                    this.showPopup = true
                }, 5000)

            }
        }
    },
    components: { Popup, LoadPopup }
})
</script>
<style scoped>
form {
    position: relative;
    background-color: var(--modal-color);
    color: var(--font-color);
    width: 50%;
    min-height: 250px;
    margin: auto;

    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 8px 8px #1d1d1d99;
    transition: 1s linear;
    margin-top: 20px;
    margin-bottom: 20px
}

.inputBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;

}

.block {
    margin: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
}

.inputBlock input,
.inputBlock select {
    width: 100%;
    height: 30px;
    margin-bottom: 15px;
    border: 2px solid var(--component-two-color);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 5px;



}

.inputBlock select {
    width: 70%;
}

button {
    background-color: var(--component-two-color);
    border: 2px solid var(--component-color);
    color: var(--component-color);
    box-sizing: border-box;
    padding: 5px;
    border-radius: 10px;
    font-weight: bold;
    transition: 0.4s linear;
    margin: 2px;
    width: 30%;
    height: 40px;
    text-decoration: none;
    font-size: 18px;
}

button:hover {
    background-color: var(--component-color);
    border-color: var(--component-two-color);
    color: var(--component-two-color);
    cursor: pointer;

}
</style>