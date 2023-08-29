<template>
    <div class="main">
        <div class="bot-info">
            <img src="../../public/telwallpaper.png" alt="bot">
            <h2>{{ botInfo?.name }}</h2>
            <h4>{{ botInfo?.mode }}</h4>
            <p>{{ botInfo?.type }}</p>
        </div>
        <label class="hidden-bar" for="submisses">
            <span>submissões</span>
        </label>
        <div class="block-hidden">
            <label for="hierarchy">
                <span>hierarquia:</span>
                <select id="hierarchy">

                    <option value="own">comandante</option>
                    <option value="sub">submisso</option>

                </select>

            </label>
            <label for="botrelation">
                <span>bot relacionado:</span>
                <select id="botrelation">


                    <option v-for=" bot, i of myBots" :value="bot._id" :key="i">{{ bot.name }}</option>
                </select>

            </label>

            <button>alterar</button>
        </div>
        <label class="hidden-bar">
            <span>grupos</span>
        </label>
        <div class="block-hidden">
            <div v-for="group, i of groups" class="group-card" :key="i">
                <img :src="group.picture" alt="image">
                <h5>{{ group.name }}</h5>
                <button>{{ group.marked ? 'excluir da lista' : 'adicionar a lista' }}</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { IBotInfo } from '@/interfaces/interface.bot.info';
import getBot from '@/services/get.bot';
import getBots from '@/services/get.bots';
import getGroups from '@/services/get.groups';
import getGroupsMarkeds from '@/services/get.groups.markeds';
import getProducts from '@/services/get.products';
import { defineComponent, ref } from 'vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies()



export default defineComponent({
    name: "BotInfo",
    data(): { botInfo?: IBotInfo, myBots: IBotInfo[], groups: { name: string, picture: string, id: string, marked?: boolean }[] } {

        return { botInfo: undefined, myBots: [], groups: [] }
    }
    ,
    mounted() {
        const { botId } = this.$route.params
        const { cookies } = useCookies()
        const token = cookies.get('token')
        getBot(token, botId.toString()).then(res => {
            if (res) {
                this.botInfo = res

            }
        })

        getBots(token).then((res) => {
            if (res) {
                this.myBots = res
                let botNow = this.myBots.find(value => value._id == this.botInfo?._id)
                if (botNow)
                    this.myBots.splice(this.myBots.indexOf(botNow), 1)
            }
        })

        getGroups(token, botId.toString()).then(
            (res) => {
                if (res) {

                    this.groups = res
                    console.log(this.groups)
                }
            }
        )
        getGroupsMarkeds(token, botId.toString()).then(
            (res) => {
                if (res) {

                    res.forEach(value => {
                        const mark = this.groups.find(gp => gp.id == value.id)
                        if (mark) {
                          
                            mark.marked = true
                        } else {
                            let newGroupMark = { ...value, marked: true }

                            this.groups.push(newGroupMark)
                        }
                    })
                }
            }
        )
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
    border-right: 1px solid var(--component-two-color);

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

.hidden-bar {
    background-color: var(--component-two-color);
    border: 2px solid var(--component-color);
    color: var(--component-color);
    box-sizing: border-box;
    padding: 5px;

    font-weight: bold;
    transition: 0.4s linear;

    width: 100%;
    height: 40px;
    text-decoration: none;
    font-size: 18px;
}


.hidden-bar::before {
    content: "\27A4";
    margin-right: 10px;
}


.block-hidden button:hover {
    background-color: var(--component-color);
    border-color: var(--component-two-color);
    color: var(--component-two-color);
    cursor: pointer;

}

.block-hidden button {
    width: 100px;
    font-size: 16px;
    border-radius: 10px;
    padding: 0;
    border: none;
    background-color: var(--component-two-color);
    margin: 10px;
    max-height: 400px;

}

.block-hidden {
    width: 100%;
    background-color: #00000045;
    max-height: 50%;
    overflow-y: scroll;
    flex-direction: column;
    align-items: center;
    justify-content: center;


}

.block-hidden label {
    width: 60%;
    margin-top: 10px;
}

.block-hidden select {
    width: 100%;
    height: 30px;
    font-size: 16px;
    border-radius: 3px;
}

.block-hidden button:before {
    content: "";
    display: none;
}

.group-card {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    background-color: #00000042;
    font-size: 10px;
}

.group-card button {
    transition: ease-in-out 0.4s;
    height: 70%;
    font-size: 12px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 3px;
}

.group-card img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
}
</style>