import axios from "./axios"

export default async function (body:{email:string,password:string}) {

    const info = await axios.post('/auth/login',body).then(res=>res).catch(err=>err)

    console.log(info)
    return info
}