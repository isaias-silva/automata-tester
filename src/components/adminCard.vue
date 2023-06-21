<template>
    <div class="usercard">
        <label for="profile" class="profile">
            <img :src="selectedImage || profile || require('@/assets/icons/load.gif')" alt="">
            <input type="file" name="picture" id="profile" @change="handleImageChange" />
        </label>
        <div class="blockinfo">
            <h3 :class="name ? null : 'load'">{{ name }}</h3>
            <ul>
                <li :class="email ? null : 'load'">{{ email }}</li>

            </ul>
            <p>Este site é exclusivo para uso de administradores autorizados. Se você não possui privilégios de
                administração, pedimos gentilmente que respeite essa restrição e evite tentar acessar áreas restritas.</p>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import getAdm from '@/services/get.adm'
import uploadProfile from '@/services/upload.profile'


export default defineComponent({
    name: 'adminCard',
    data(): {
        name: string,
        email: string,
        adm?: boolean,
        profile: string,
        selectedImage?: string,
        profileFile?: File

    } {
        return {
            name: '',
            email: '',
            adm: undefined,
            selectedImage: undefined,
            profile: '',
            profileFile: undefined
        }
    },
    methods: {

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
            if(!this.profileFile){
                return
            }
            const info = await uploadProfile(this.$cookies.get('token'), this.profileFile)
          
            console.log(info)
        }

    }
    ,
    async mounted() {

        const info = await getAdm(this.$cookies.get('token'))
        if (info.status == 200) {

            const { name, email, profile, adm } = info.data
            this.name = name;
            this.email = email;
            this.profile = profile;
            this.adm = adm;


        } else {
            this.$cookies.remove('token')
            this.$router.push('login')
        }

    }



})
</script>
<style scoped>
#profile {
    display: none;
}

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
    position: relative;
    border-radius: 100%;
    width: 200px;
    height: 200px;
    border: 4px solid var(--component-two-color);
    grid-area: profile;
    overflow: hidden;
    transition: 0.4s linear;
}


.profile img {
    
    width: 100%;
    height: 100%;
    transition: 0.1s linear;
}

.profile:hover {
    cursor: pointer;
}


.profile:hover::after {
    content: " trocar perfil ";
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