import { reactive } from "vue";
import getAdm from "./services/get.adm";
import { useCookies } from "vue3-cookies";


export const sessionInfo = reactive({
    name: "",
    email: '',
    adm: false,
    profile: "",
    selectedImage: "",
    phonenumber: "",
    date_of_begginer: "",
    plan_duration: 0
})

export async function updateSessionInfo() {
    const { cookies } = useCookies()
    const info = await getAdm(cookies.get('token'))

    if (info.status == 200) {

        const { name, email, profile, adm, phone_number, date_of_begginner, plan_duration } = info.data
        sessionInfo.name = name;
        sessionInfo.email = email;
        sessionInfo.profile = profile;
        sessionInfo.adm = adm;
        sessionInfo.phonenumber = phone_number
        sessionInfo.date_of_begginer = date_of_begginner
        sessionInfo.plan_duration = plan_duration
    }
}
