<template>
    <div class="main">
        <div class="bot-info">
            <img src="../../public/telwallpaper.png" alt="bot">
            <h2>{{ botInfo?.name }}</h2>
            <h4>{{ botInfo?.mode }}</h4>
            <p>{{ botInfo?.type }}</p>
        </div>
        <button>submissões</button>
        <button>grupos</button>
        <button>integrações</button>
        <button>fluxos</button>
        <button>configurações</button>
    </div>
</template>
<script lang="ts">

import { IBotInfo } from '@/interfaces/interface.bot.info';
import getBot from '@/services/get.bot';
import { defineComponent, ref } from 'vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()



export default defineComponent({
    name: "BotInfo",
    data(): { botInfo?: IBotInfo } {
        return { botInfo: undefined }
    }
    ,
    mounted() {
        const { botId } = this.$route.params
        const { cookies } = useCookies()

        getBot(cookies.get('token'), botId.toString()).then(res => {
            if (res) {
                this.botInfo = res

            }
        })
    }

})
</script>
<style scoped>
.bot-info img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 4px solid var(--component-two-color)
}

.main {
    z-index: 997 !important;
    transition: linear 0.1s;
    position: fixed;
    background-color: var(--component-color);
    color: var(--font-color);
    width: 20%;
    height: 100vh;
    margin: auto;
    border: 1px solid var(--component-two-color);

    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;

    top: 0;

    transition: 1s linear;

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
 
    font-weight: bold;
    transition: 0.4s linear;
    margin: 2px;
   width: 100%;
    height: 40px;
    text-decoration: none;
    font-size: 18px;
}
button::before{
    content:"\27A4";
    margin-right: 10px;
}
button:hover {
    background-color: var(--component-color);
    border-color: var(--component-two-color);
    color: var(--component-two-color);
    cursor: pointer;

}
</style>