
import { Iproduct } from "@/interfaces/interface.payment.products";
import axios from "./axios";
import { useCookies } from "vue3-cookies";

export default async (): Promise<Iproduct[] | null> => {
    const { cookies } = useCookies()
    const info = await axios.get('payments/plans', { headers: { 'Authorization': 'Bearer '+cookies.get('token') } })
        .then(res => res)
        .catch(err => null)
    if (!info) {
        return null
    }
    console.log(info)
    const data = info.data

    return data

}