import axios from "./axios"

export default async function (token: string) {

    const info = await axios.get('/user/me', {
        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    }).then(res=>res).catch(err=>err)

    console.log(info)
    return info
}