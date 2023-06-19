<template>
    <div class="usercard">
        <div class="profile">
            <img :src="profile || require('@/assets/icons/load.gif')" alt="">

        </div>
        <div class="blockinfo">
            <h3 :class="name ? null : 'load'">{{ name }}</h3>
            <ul>
                <li :class="email ? null : 'load'">{{ email }}</li>
                <li :class="adm ? null : 'load'">{{ adm }}</li>
                <li :class="plan ? null : 'load'">{{ plan }}</li>
            </ul>
            <p>Este site é exclusivo para uso de administradores autorizados. Se você não possui privilégios de
                administração, pedimos gentilmente que respeite essa restrição e evite tentar acessar áreas restritas.</p>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import getAdm from '@/services/get.adm'


export default defineComponent({
    name: 'adminCard',
    data(): {
        name?: string,
        email?: string,
        adm?: boolean,
        plan?: string,
        profile?: string

    } {
        return {

        }
    },
    async mounted() {

        const info=await getAdm(this.$cookies.get('token'))
         if(info.status==200){
           
            const { name, email, profile, adm} = info.data
                this.name=name;
                this.email=email;
                this.profile=profile;
                this.adm=adm;
   
         }else{
            this.$router.push('login')        
         }
          
            }
        
    

})
</script>
<style scoped>
.usercard {
    flex-shrink: 0;
    background-color: var(--modal-color);
    width: 90%;
    margin: auto;
    border-radius: 30px;
    box-sizing: border-box;
    padding: 5px;
    box-shadow: 8px 8px #0000002e;
    color: var(--font-color);
    display: grid;
    grid-template-columns: 20% 20% 60%;
    grid-template-areas: 'profile info info';
}

.profile {
    border-radius: 100%;
    width: 200px;
    height: 200px;
    border: 4px solid var(--component-two-color);
    grid-area: profile;
}

.profile img {
    width: 100%;
}

.blockinfo {
    grid-area: info;

}

.blockinfo ul {
    width: 20%;
    list-style: none;
    margin: 20px 20px;
}

.blockinfo h3 {
    width: 30%;
}

.blockinfo ul li {
    margin: 4px;
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