<template>
    <div :class="bot.type == 'TelBot' ? 'bot-card blue' : 'bot-card'">
        <span :class="bot.status == 'online' ? 'status-bot on' : 'status-bot off'"> {{ bot.status }}</span>
        <img :src="bot.type == 'TelBot' ? 'telwallpaper.png' : 'wallpaper.jpg'" alt="">

        <h4>{{ bot.name }}</h4>

        <ul>
            <li>
                <strong>type: </strong> {{ bot.type }}
            </li>
            <li v-if="bot.number">
                <strong>number: </strong> {{ bot.number }}
            </li>
            <li>
                <select name="mode" id="mode" v-model="mode" @change="updateBot">
                    <option value="repasse">repasse</option>
                    <option value="sniper">sniper</option>
                    <option value="attendant">attendant</option>

                </select>
            </li>
            <li>
                <select name="flow" id="flow" v-model="flowId">
                    <option value="1">flow1</option>
                </select>
            </li>
        </ul>
        <router-link class="buttonOpen" :to="'chat/' + bot._id">
            open
        </router-link>


    </div>
</template>
<script lang="ts">
import updateBot from '@/services/update.bot';
import { defineComponent, reactive, ref, defineProps, onMounted } from 'vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()
type BotInfo = {
    number: string,
    mode: string,
    flowId: string,
    userId: string,
    status?: string,
    name: string,
    path: string,
    _id: string,
    type: string
}
export default defineComponent({
    name: "BotCard",

    props: ['botData'],
    data() {
        return { mode: '', flowId: '' }
    },
    methods: {
        async updateBot() {
            await updateBot(cookies.get('token'), this.bot._id, this.mode, this.flowId)
        }
    },
    mounted() {

        this.mode = this.bot.mode

    },
    setup(props) {
        const bot = reactive<BotInfo>(props.botData)

        return {
            bot
        }
    }
})
</script>
<style scoped>
.bot-card {
    width: 30%;
    background-color: #0000001b;
    overflow: hidden;
    border-radius: 10px;
    min-height: 350px;
    margin: 10px;
    transition: linear 0.5s;
    position: relative;

}

.status-bot {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: rgb(54, 54, 54);
    font-weight: bold;
    border-radius: 100%;
    top: 0;
    box-sizing: border-box;
    font-size: 12px;
    margin: 4px;
}

.on {
    background-color: #00b900;
}

.blue .on {
    background-color: #00a6ff;
}

.on::after {
    content: " ";
    position: absolute;
    top: 0;
    width: 50px;
    height: 50px;
    display: block;
    border-radius: 100%;
    background-color: #03ff03;
    animation: on 1s infinite;

}

.bot-card img {
    width: 100%;


}



.bot-card ul {
    list-style: none;
}

.bot-card select {
    width: 150px;
    height: 30px;
    margin-bottom: 10px;
    color: var(--font-color);
    background-color: var(--component-color);
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
}

.bot-card.blue {
    border: 2px solid #44a5d2;
}

.buttonOpen {
    background-color: var(--component-two-color);
    border: 2px solid var(--component-color);
    color: var(--component-color);
    box-sizing: border-box;
    padding: 5px;
    border-radius: 10px;
    font-weight: bold;
    transition: 0.4s linear;
    margin: 2px;
    text-decoration: none;

}

.buttonOpen {
    margin: 0;
    margin: auto;
    display: block;
    border: 1px solid var(--component-color);
    width: 40%;

}

.buttonOpen:hover {
    background-color: var(--component-color);
    border-color: var(--component-two-color);
    color: var(--component-two-color);
    cursor: pointer;

}

.blue .buttonOpen:hover {
    border-color: #44a5d2;
    color: #44a5d2;
}

.blue .buttonOpen {
    background-color: #44a5d2;
}

@keyframes on {
    0% {

        width: 50px;
        filter: opacity(1)
    }

    100% {
        top: -25px;
        width: 100px;
        height: 100px;
        filter: opacity(0)
    }
}
</style>