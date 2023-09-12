<template>
    <div class="allboard">

        <div class="banner">
            <div class="banner-image">

            </div>
            <label class="profile" for="profile">
                <img :src="selectedImage || sessionInfo.profile || require('@/assets/icons/profile-unknow.png')" alt="">
                <input type="file" name="picture" id="profile" @change="handleImageChange" />

            </label>
            <div class="user-info">

                <div class="blockinfo">
                    <h2>{{ sessionInfo.name }}</h2>
                    <span>{{ sessionInfo.email }}</span>

                </div>
                <div class="blockinfo">
                    <h2>{{ sessionInfo.adm ? 'Admin' : 'normal user' }}</h2>
                    <span>phone: <i>{{ sessionInfo.phonenumber }}</i></span>
                </div>

                <button class="edit">
                    editar informações
                </button>

            </div>
        </div>
        <div class="content">
            <h3>seu plano</h3>
            <p v-if="sessionInfo.adm">
                como você é admin, o vencimento do seu plano simplesmente não existe.
            </p>
            {{ mountBirth() }}
            <div class="lifebar">
                <span ref="status" :style="{ width: widthLifeBar + '%' }" class="status"></span>

            </div>
            <router-link to="/renovate" class="renovate-plan">renovar</router-link>
        </div>
        <div class="content noback" v-if="modes.createBot">
            <button class="closeBtn" @click="() => modes.createBot = false">x</button>
            <createBotForm />

        </div>




        <div class="content">
            <h3>seus Bots</h3>
            <div class="flex">
                <BotCard :bot-data="bot" v-for="bot, key of bots.info" :key="key" />
             
                <div class="plus-card" @click="() => modes.createBot = true">
                    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="5" />
                        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="5" />
                    </svg>
                </div>

            </div>

        </div>



    </div>
</template>
<script lang="ts">
import uploadProfile from '@/services/upload.profile';
import { differenceInDays, format, getMonth } from 'date-fns';
import createBotForm from '@/components/createBotForm.vue';
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCookies } from "vue3-cookies";
import { useRouter } from 'vue-router';
import { sessionInfo, updateSessionInfo,updateBots,bots } from '@/session';
const { cookies } = useCookies();
import BotCard from '@/components/bot.card.vue';
import { IBotInfo } from '@/interfaces/interface.bot.info';
export default defineComponent({
    name: "UserPage",
    components: {
        createBotForm,
        BotCard
    },
    data(): {

        selectedImage?: string,

        profileFile?: File,



    } {
        return {



            selectedImage: undefined,

            profileFile: undefined,

        }
    },
    methods: {
        mountBirth() {
            if (!this.sessionInfo.date_of_begginer) {
                return
            }
            const date = new Date(this.sessionInfo.date_of_begginer)
            const month = (getMonth(date) + 1)
            const formatMonth = month < 10 ? '0' + month.toString() : month.toString()
            return 'plano iniciado em: ' + format(date, "dd / # / yyyy").replace('#', formatMonth)

        },

        handleImageChange(event: Event) {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                this.profileFile = file
                const [name, type] = file.name.split('.')
                if (!type || (type.toLowerCase() != 'png' && type.toLowerCase() != 'jpg')) {
                    this.selectedImage = require('@/assets/icons/corrupted.jpg')
                    return
                }
                this.updateProfile()
                this.selectedImage = URL.createObjectURL(file);
                console.log(this.selectedImage)
            }
        },
        async updateProfile() {
            if (!this.profileFile) {
                return
            }
            const info = await uploadProfile(cookies.get('token'), this.profileFile)

            console.log(info)
        },


    }
    ,
    setup() {
        const router = useRouter()
        const modes = ref<{ editProfile: boolean, createBot: boolean }>({ editProfile: false, createBot: false })
      
        const status = ref<any>(null)

        const widthLifeBar = ref<number>(0)
       
        function mountTimeEnd() {
            if (!sessionInfo.date_of_begginer || !sessionInfo.plan_duration) {

                return
            }
            const date = new Date(sessionInfo.date_of_begginer)

            const today = new Date()

            const diference = 100 - ((differenceInDays(today, date) * 100) / sessionInfo.plan_duration)


            setTimeout(() => {
                widthLifeBar.value = diference

            }, 1000)


        }
        onMounted(async () => {
            if (sessionInfo.name.length < 2) {
               const info= await updateSessionInfo()
                await updateBots()
         

            }
            setTimeout(async () => {
              
                await mountTimeEnd()
            }, 1000)


        })

        return {
            modes,
            status,
            sessionInfo,
            widthLifeBar,
            bots
        
        }
    }
})

</script>
<style scoped>
.closeBtn {
    width: 40px;
    height: 40px;
    border: 1px solid var(--font-color);
    background-color: var(--component-color);
    font-weight: bold;
    font-size: 18px;
    color: var(--font-color);
    border-radius: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    transition: linear 1s;
    justify-content: center;
    right: 0;
}

.closeBtn:hover {
    cursor: pointer;
    background-color: red;
}

.flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
}



.allboard {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: auto;
    box-sizing: border-box;

    flex-wrap: wrap;
    text-align: justify;
    position: relative;
}

.banner {
    width: 95%;
    margin: 0;
    background-color: #00000032;
    display: grid;
    position: relative;
    grid-template-rows: 80% 20% 20%;
    grid-template-areas: 'profile info info' 'profile info info';
    border-radius: 10px;
    margin: auto;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 4px;
}

.banner-image {
    position: absolute;
    top: 0;
    width: 100%;
    height: 70%;
    z-index: -1;
   background-image: linear-gradient(to left,var(--component-color),var(--component-two-color));
    background-size: 100%;
}

.profile {
    grid-area: profile;
    align-self: end;
    box-sizing: border-box;

    overflow: hidden;
    border-radius: 100%;
    border: 2px solid var(--component-color);
    height: 160px;
    width: 160px;
    position: relative;
}

.profile:hover {
    cursor: pointer;
}

.profile:hover::after {
    content: " trocar perfil ";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #0000006d;
    z-index: 1000 !important;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;

}

.profile input {
    display: none;
}

.profile img {
    transition: 0.3s linear;
    height: 100%;
}

.profile:hover img {
    transform: scale(2);
}

.user-info {
    width: 100%;
    grid-area: info;
    display: flex;
    justify-content: space-around;
    align-self: end;

    box-sizing: border-box;

}

.content {
    width: 90%;
    background-color: #00000032;
    margin: auto;
    box-sizing: border-box;
    margin-top: 50px;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    position: relative;

}

.noback {
    background-color: #00000000;
}


.plus-card {
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

.plus-card {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--component-two-color);
    border: 2px dashed var(--component-two-color);
}

.plus-card svg {
    transition: 0.3s linear;
}

.plus-card:hover {
    cursor: pointer;
    border-color: var(--link-color);
    color: var(--link-color);
}

.plus-card:hover svg {
    transform: rotate(270deg);

}

.plus-card::after {
    content: "criar novo bot";
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    position: absolute;
    background-color: #00000064;
    backdrop-filter: blur(8px);
    filter: opacity(0);
    transition: linear 0.5s;
}

.plus-card:hover::after {
    filter: opacity(1);
}





.lifebar {
    width: 50%;
    height: 30px;
    margin: auto;
    background-color: #00000077;
    margin-top: 10px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    z-index: -2;
}

.lifebar::after {
    content: "tempo restante de uso";
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999 !important;
    font-weight: bold;
    height: 100%;
}

.status {
    z-index: -1;
    position: absolute;
    display: block;
    left: 0;
    background-color: var(--component-two-color);
    width: 100%;
    height: 100%;
    transition: linear 0.4s;
}

.content {
    width: 90%;
    margin: auto;
    margin-top: 10px;
}

button.edit,
.renovate-plan {
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


.blue .buttonOpen {
    background-color: #44a5d2;
}

button.edit:hover {
    background-color: var(--component-color);
    border-color: var(--component-two-color);
    color: var(--component-two-color);
    cursor: pointer;

}



.renovate-plan {
    display: block;
    width: 20%;
    margin: auto;
    margin-top: 10px;
    background-color: #ffb300;
    text-decoration: none;
    color: #000000;
    border: 1px solid #000000;
}

.renovate-plan:hover {
    background-color: #ffcc56;
}
</style>