import axios from "./axios"

export default async (token: string): Promise<{
    number:string,
    mode:string,
    flowId:string,
    userId:string,
    status?:string,
    name: string,
    path:string,
    _id:string
}[]|null> => {
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