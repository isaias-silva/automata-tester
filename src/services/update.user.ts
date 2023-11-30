import { Iuser } from "@/interfaces/interface.user"
import axios from "./axios"
import { AxiosResponse } from "axios"

export default async function (token: string, body: { name: string, phone_number: string, email: string }): Promise<AxiosResponse<any>> {

    const info = await axios.put('/user/update', body, {
        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    }).then(res => res).catch(err => err.response)

    console.log(info)
    return info
}