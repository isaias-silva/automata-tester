import axios from "./axios"

export default async (token: string): Promise<any> => {
    const info = await axios.get('payments/plans', {

        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    })
        .then(res => res)
        .catch(err => null)
    if (!info) {
        return null
    }
    const data = info.data
    
    return data

}