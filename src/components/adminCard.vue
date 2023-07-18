<template>
    <div class="usercard">
        <label for="profile" class="profile">
            <img :src="selectedImage || profile || require('@/assets/icons/load.gif')" alt="">
            <input type="file" name="picture" id="profile" @change="handleImageChange" />
        </label>
        <div  class="blockinfo">
          
            <h3 :class="name ? null : 'load'">{{ name }}</h3>
            <p>{{ email }}</p>



        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import getAdm from '@/services/get.adm'
import uploadProfile from '@/services/upload.profile'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

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
            if (!this.profileFile) {
                return
            }
            const info = await uploadProfile(cookies.get('token'), this.profileFile)

            console.log(info)
        }

    }
    ,
    async mounted() {

        const info = await getAdm(cookies.get('token'))
        if (info.status == 200) {

            const { name, email, profile, adm } = info.data
            this.name = name;
            this.email = email;
            this.profile = profile;
            this.adm = adm;


        } else {
            cookies.remove('token')
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
    width: 100%;
    margin: auto;
   
    margin-bottom: 30px;
    border-radius: 30px;
    box-sizing: border-box;
    padding: 5px;
display: flex;
flex-direction: column;
align-items: center;
    color: var(--font-color);

    text-align: center;
}

.profile {
    position: relative;
    border-radius: 100%;
    width: 60%;
  
    border: 4px solid var(--component-two-color);
    overflow: hidden;
    transition: 0.4s linear;
}


.profile img {
    width: 100%;
    transform: scale(1.1);
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
  
    display: flex;
    background-color: #0000001b;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    margin-top: 10px;
    border-radius: 10px;

}



.blockinfo h3{
    margin-top: 10px;
    width: 100%;
}


.min .blockinfo{
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