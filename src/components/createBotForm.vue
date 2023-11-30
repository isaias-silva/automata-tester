<template>
    <LoadPopup v-if="load" />
    <Popup :title="popupMessages.title" :message="popupMessages.message" v-if="showPopup"
        @close="() => showPopup = false" />

        <div class="modal">
            <form @submit.prevent="createBotNow">
        <h3>crie um novo bot</h3>

        <div class="inputBlock">

            <input v-model="name" placeholder="nome do bot" type="text">
            <div class="block">
                <label for="type">tipo de bot</label>
                <select v-model="type" id="type">
                    <option value="WaBot">whatsapp</option>
                    <option value="TelBot">Telegram</option>

                </select>
                <div v-if="type == 'TelBot'">
                    <input type="text" v-model="apiKeyTel" placeholder="chave do bot">

                </div>

            </div>

            <label for="mode">modo do bot</label>

            <div class="block">
                <select v-model="mode" id="mode">
                    <option value="attendant">attendant</option>
                    <option value="attendant">sniper</option>
                    <option value="attendant">repasse</option>
                </select>
            </div>

        </div>


        <button> criar </button>
    </form>
        </div>
   
</template>
<script lang="ts">
import createBot from '@/services/createBot';
import { defineComponent, ref } from 'vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()

import Popup from './popups/popup.vue';
import LoadPopup from './popups/load.popup.vue';

import { updateBots } from '@/session';

export default defineComponent({
    name: "createBotForm",

    data(): {

        load: boolean,
        showPopup: boolean,
        popupMessages: { title: string, message: string }
    } {
        return {



            load: false,
            showPopup: false,
            popupMessages: { title: '', message: '' }
        };
    },
    setup() {
        const name = ref<string>()
        const mode = ref<string>()
        const type = ref<string>()
        const apiKeyTel = ref<string>()

        return {
            name, mode, type, apiKeyTel
        }

    },
    methods: {
        async createBotNow() {

            if (this.name && this.mode && this.type) {
                this.load = true
                const response = await createBot(cookies.get("token"), {
                    name: this.name, mode: this.mode, type: this.type,
                    path: Math.random().toString(32).replace('0.', 'I'),
                    integrations: {
                        telegram: {
                            apiKey: this.apiKeyTel
                        }
                    }
                });
                setTimeout(async () => {

                    await updateBots()

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
    border: 2px solid var(--component-two-color);
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
    margin-top: 200px;
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