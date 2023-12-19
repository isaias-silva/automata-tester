import { IBotInfo } from "@/interfaces/interface.bot.info"
import axios from "./axios"

export default async (token: string,id:string): Promise<IBotInfo> => {
    const info = await axios.get(`bot/${id}`, {

        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    })
        .then(res => res)
        .catch(err => err.response)
  
    const data = info.data
    
    console.log('bot')
    console.log( data)
    
    return data

}