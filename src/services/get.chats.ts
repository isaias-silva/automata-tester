import { Icontact } from "@/interfaces/interface.bot.contact";
import axios from "./axios";
import { Imessage } from "@/interfaces/interface.bot.message";

export default async (token: string, id: number, count?: number, page?: number): Promise<Imessage[] | null> => {
    const info = await axios.post('chats/chatForId', {
        id, count, page
    }, {

        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    })
        .then(res => res)
        .catch(err => null)
    if (!info) {
        return null
    }
    const data: Imessage[] = info.data
    
    console.log(data)
    
    return data

}