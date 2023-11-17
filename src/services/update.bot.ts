import axios from "./axios"

export default async (token: string, id: string,
    mode: string,
    flowId?: string,): Promise<any | null> => {
    const info = await axios.put(`bot/update/${id}`,{mode,flowId}, {

        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    })
        .then(res => res)
        .catch(err => err.response)
    
    


    return info

}