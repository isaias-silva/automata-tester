import { Icontact } from "@/interfaces/interface.bot.contact";
import axios from "./axios";

export default async (token: string, botId: string): Promise<Icontact[] | null> => {

    const info = await axios.get(`chats/me/${botId}`, {
        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    })
        .then(res => res)
        .catch(err => null)
    if (!info) {
        return null
    }
    const data: Icontact[] = info.data
    console.log('contacts')
    console.log(data)
    return data

}