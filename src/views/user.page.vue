<template>
    <div class="allboard">

        <div class="banner">
            <div class="banner-image">

            </div>
            <label class="profile" for="profile">
                <img :src="selectedImage || profile || require('@/assets/icons/load.gif')" alt="">
                <input type="file" name="picture" id="profile" @change="handleImageChange" />

            </label>
            <div class="user-info">
              
                <div class="blockinfo">
                    <h2>{{ name }}</h2>
                    <span>{{ email }}</span>
                </div>
                <div class="blockinfo">
                  <h2>{{ adm? 'Admin':'normal user' }}</h2>
                    <span>phone: <i>{{ phonenumber }}</i></span>
                </div>
          

            </div>
        </div>






    </div>
</template>
<script lang="ts">
import getAdm from '@/services/get.adm';
import uploadProfile from '@/services/upload.profile';
import { defineComponent, ref } from 'vue'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default defineComponent({
    name: "UserPage",
    data(): {
        name: string,
        email: string,
        adm?: boolean,
        profile: string,
        selectedImage?: string,
        phonenumber?: string,
        date_of_begginer?: string
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

            const { name, email, profile, adm, phone_number, date_of_begginner } = info.data
            this.name = name;
            this.email = email;
            this.profile = profile;
            this.adm = adm;
            this.phonenumber = phone_number
            this.date_of_begginer = date_of_begginner


        } else {
            cookies.remove('token')
            this.$router.push('login')
        }

    }


})

</script>
<style scoped>
.allboard {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: auto;
    box-sizing: border-box;
    padding: 10px;
    flex-wrap: wrap;
    text-align: justify;
    position: relative;
}

.banner {
    width: 100%;
    margin:0;
    background-color: #00000032;
    display: grid;
    position: relative;
    grid-template-rows: 80% 20% 20%;
    grid-template-areas: 'profile info info' 'profile info info';
}

.banner-image {
    position: absolute;
    top: 0;
    width: 100%;
    height: 70%;
    z-index: -1;
    background-image: url('../../public/wallpaper.jpg');
    background-size: 100%;
}

.profile {
    grid-area: profile;
    align-self: end;
    box-sizing: border-box;
    margin: 10px;
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

}</style>