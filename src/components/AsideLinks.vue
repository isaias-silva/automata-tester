<template>
    <div class="usercard">
        <router-link to="/profile" for="profile" class="profile">
            <img :src="sessionInfo.profile || require('@/assets/icons/profile-unknow.png')" alt="">
        </router-link>

        <ul>

            <li>
                <router-link to="/"><font-awesome-icon icon='diagram-project'/> <span>fluxos</span></router-link>
            </li>
            <li v-if="sessionInfo.adm">
                <router-link to="/"> <font-awesome-icon icon='people-group'/> <span>usuários</span></router-link>
            </li>
            <li>
                <router-link to="/"><font-awesome-icon icon='people-line'/> <span>atendentes</span></router-link>
            </li>
            <li>
                <router-link to="/"> <font-awesome-icon icon='contact-card'/>  <span>contatos</span></router-link>
            </li>
            <li>
                <router-link to="/"> <font-awesome-icon icon='database'/>  <span>base de dados</span></router-link>
            </li>
            <li>
                <router-link to="/"><font-awesome-icon icon='network-wired'/> <span>integrações</span></router-link>
            </li>
            <li>
                <router-link to="/"><font-awesome-icon icon='info'/><span> sobre</span></router-link>
            </li>
            <li>
                <router-link to="/"><font-awesome-icon icon='dashboard'/> <span>dashboard</span></router-link>
            </li>
            <li>
                <router-link to="/login" @click="logout"><font-awesome-icon icon='power-off'/> <span>sair</span></router-link>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCookies } from "vue3-cookies";
import { disconnecteSocket } from '@/socket';
import router from '@/route';
import { sessionInfo, updateSessionInfo } from '@/session';
const { cookies } = useCookies();

export default defineComponent({
    name: 'AsideLinks',
    data(): {

        selectedImage?: string,
        profileFile?: File

    } {
        return {



            selectedImage: undefined,

            profileFile: undefined
        }
    }
    ,
    methods: {
        logout() {
            cookies.remove('token');
            disconnecteSocket()
        }

    }, setup() {


        onMounted(async () => {

            let info = await updateSessionInfo()
            if(!info){
                cookies.remove('token')
                router.push('/login')
            }
            if ( (info && info.status && info?.status != 200)) {
                if (info.status == 402) {
       
                    router.push('/renovate')
                }else{
                    cookies.remove('token')
                router.push('/login')

                }
        
            }



        })
        return {
            sessionInfo
        }
    }


})
</script>
<style scoped>
* {
    padding: 0;
    margin: 0;
}

ul {
    list-style-type: none;
    width: 100%;
    margin-top: 20px;
}

li {
    width: 100%;
    background-color: var(--component-color);
    border-bottom: 1px solid var(--component-two-color);
    height: 70px;

    transition: 0.2s linear;
}

li:hover {
    background-color: #00000061;
}

li a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: bold;
    color: var(--font-color);
    width: 100%;
    height: 100%;

}
li a span{
    display:block;
    margin-left: 10px;
}

.min li a span {
    display: none;
}

.usercard {


    flex-shrink: 0;
    width: 100%;
    margin: auto;

    margin-bottom: 30px;
    border-radius: 30px;
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--font-color);

    text-align: center;
}

.profile {
    position: relative;
    border-radius: 100%;
    width: 100px;
    height: 100px;
    margin: auto;
    border: 2px solid var(--component-two-color);
    overflow: hidden;
    transition: 0.4s linear;
}

.min .profile {
    width: 70px;
    height: 70px;
    border: 1px solid var(--component-two-color)
}

.profile img {
    height: 100%;
    transform: scale(1.1);
    transition: 0.5s linear;
}

.profile:hover {
    cursor: pointer;
}


.profile:hover::after {
    content: " ver perfil ";
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: #000000a1;
    color: #fff;
    backdrop-filter: blur(50%);
    position: absolute;
    top: 0;
    font-weight: bold;

}

.profile:hover img {
    transform: scale(2);
}

.blockinfo {

    display: flex;
    background-color: #0000001b;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px #0000004d;
}



.blockinfo h3 {
    margin-top: 10px;
    width: 100%;
}


.min .blockinfo {
    display: none;
}

.load {
    background-color: #00000048;
    min-width: 50px;
    height: 25px;
    border-radius: 40px;
    animation: load 1s infinite;
}


@keyframes load {
    0% {
        filter: opacity(1)
    }

    50% {
        filter: opacity(0)
    }

    100% {
        filter: opacity(1)
    }
}
</style>