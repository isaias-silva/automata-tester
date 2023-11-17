
import axios from "./axios"

export default async (token: string, id: string): Promise<{ picture: string, name: string, id: string }[] | null> => {
    const info = await axios.post('botConfig/groupList', {
        id
    }, {

        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    })
        .then(res => res)
        .catch(err => null)
    if (!info) {
        return null
    }
    const data = info.data.your_groups

    console.log(data)

    return data

}