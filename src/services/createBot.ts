import axios from "./axios"

export default async (token: string, object: {
    name: string,
    type: string,
    mode: string,
    path: string
}): Promise<{ message: string }> => {
    
    const info = await axios.post('botConfig/create', object, {

        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    })
        .then(res => res)
        .catch(err => err.response)

    const data = info.data

    console.log(data)

    return data

}