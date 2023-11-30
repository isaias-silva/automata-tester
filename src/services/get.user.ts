import { Iuser } from "@/interfaces/interface.user"
import axios from "./axios"
import { AxiosResponse } from "axios"

export default async function (token: string):Promise<AxiosResponse<Iuser>> {

    const info = await axios.get('/user/me', {
        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    }).then(res=>res).catch(err=>err.response)

    console.log(info)
    return info
}