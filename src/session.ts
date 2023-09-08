import { reactive } from "vue";
import getAdm from "./services/get.adm";
import { useCookies } from "vue3-cookies";
import { IBotInfo } from '@/interfaces/interface.bot.info'
import getBots from "./services/get.bots";
import { useRouter } from "vue-router";
import { messagesState } from "./socket";

export const sessionInfo = reactive<
    {
        name: string,
        email: string,
        adm: boolean,
        profile: string,
        selectedImage: string,
        phonenumber: string,
        date_of_begginer: string,
        plan_duration: number,
       
    }>({
        name: "",
        email: '',
        adm: false,
        profile: "",
        selectedImage: "",
        phonenumber: "",
        date_of_begginer: "",
        plan_duration: 0,

    })

export const bots=reactive<{info:IBotInfo[]}>({info:[]});
export async function updateSessionInfo() {
    const { cookies } = useCookies()
    const info = await getAdm(cookies.get('token'))
    const router = useRouter()

    if (info && info.status == 200) {

        const { name, email, profile, adm, phone_number, date_of_begginner, plan_duration } = info.data
        sessionInfo.name = name;
        sessionInfo.email = email;
        sessionInfo.profile = profile;
        sessionInfo.adm = adm;
        sessionInfo.phonenumber = phone_number
        sessionInfo.date_of_begginer = date_of_begginner
        sessionInfo.plan_duration = plan_duration

        return info

    } else if (info && info.status) {
        return info
    } else {
        return null
    }
}

export async function updateBots() {
    
    const { cookies } = useCookies()
    const nowBots = await getBots(cookies.get('token'))
   
    if (nowBots) {
        bots.info=nowBots
        
    }
}