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
                    <h2 v-if="!editMode">{{ name }}</h2>
                    <span>{{ email }}</span>

                </div>
                <div class="blockinfo">
                    <h2>{{ adm ? 'Admin' : 'normal user' }}</h2>
                    <span>phone: <i>{{ phonenumber }}</i></span>
                </div>

                <button class="edit">
                    editar informações
                </button>

            </div>
        </div>
        <div class="content">
            <h3>seu plano</h3>
            <p v-if="adm">
            como você é admin, o vencimento do seu plano simplesmente não existe.
            </p>
            {{mountBirth() }}
            <div class="lifebar">
                <span class="status"></span>
            </div>
            <p>{{ mountTimeEnd() }}</p>
        </div>






    </div>
</template>
<script lang="ts">
import getAdm from '@/services/get.adm';
import uploadProfile from '@/services/upload.profile';
import { compareAsc } from 'date-fns';
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
        profileFile?: File,
        plan_duration?: number

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
        mountBirth() {
            if (!this.date_of_begginer) {
                return
            }
            const date=new Date(this.date_of_begginer)

            return `plano criado dia ${date.getDay()} do ${date.getMonth()} de ${date.getFullYear()}`

        },
        mountTimeEnd(){
        if(!this.date_of_begginer){
            return
        }
        const date=new Date(this.date_of_begginer)
        const today=new Date()
        const diference=compareAsc(date,today)
        return diference
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
        }

    }
    ,
    async mounted() {

        const info = await getAdm(cookies.get('token'))
        if (info.status == 200) {

            const { name, email, profile, adm, phone_number, date_of_begginner, plan_duration } = info.data
            this.name = name;
            this.email = email;
            this.profile = profile;
            this.adm = adm;
            this.phonenumber = phone_number
            this.date_of_begginer = date_of_begginner
            this.plan_duration = plan_duration

        } else {
            cookies.remove('token')
            this.$router.push('login')
        }

    }, setup() {
        const editMode = ref<boolean>(false)

        return {
            editMode
        }
    }
})

</script>
<style scoped>
.lifebar{
    width: 50%;
    height: 30px;
    margin:auto;
    background-color: #00000077;
    margin-top: 10px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    z-index: -2;
}
.lifebar::after{
    content:"tempo restante de uso" ;
    display:flex;
    align-items: center;
    justify-content: center;
    z-index: 9999!important;
    font-weight: bold;
    height: 100%;
}
.status{
    z-index: -1;
position: absolute;
display: block;
left:0;
background-color: var(--component-two-color);
width: 100%;
height: 100%;
transition: linear 0.4s ;
}
.content {
    width: 90%;
    margin: auto
}

button.edit {
    background-color: var(--component-two-color);
    border: 2px solid var(--component-color);
    color: var(--component-color);
    box-sizing: border-box;
    padding: 5px;
    border-radius: 10px;
    font-weight: bold;
    transition: 0.4s linear;
    margin: 2px;

}

button.edit:hover {
    background-color: var(--component-color);
    border-color: var(--component-two-color);
    color: var(--component-two-color);
    cursor: pointer;

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
    margin:auto;
    box-sizing: border-box;
    padding: 4px;
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

.content{
    width: 90%;
background-color: #00000032;
margin: auto;
box-sizing: border-box;
margin-top: 50px;
text-align: center;
padding: 10px;
border-radius: 10px;

}
</style>