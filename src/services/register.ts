import axios from "./axios"

export default async function (body: {
    name: string,
    password: string,
    email: string,
    phone_number: string
}) {

   

    const info = await axios.post('/user/register', body).then(res => res).catch(err => err.response)


    return info
}