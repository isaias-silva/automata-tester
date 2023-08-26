import { IBotInfo } from "@/interfaces/interface.bot.info"
import axios from "./axios"

export default async (token: string,id:string): Promise<IBotInfo|null> => {
    const info = await axios.get(`botConfig/${id}`, {

        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    })
        .then(res => res)
        .catch(err => null)
    if (!info) {
        return null
    }
    const data = info.data
    
    console.log(data)
    
    return data

}