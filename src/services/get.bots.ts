import { IBotInfo } from "@/interfaces/interface.bot.info"
import axios from "./axios"

export default async (token: string): Promise<IBotInfo[]|null> => {
    const info = await axios.get('botConfig/my', {

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