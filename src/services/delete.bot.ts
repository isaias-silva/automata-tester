import axios from "./axios"

export default async (token: string, id: string): Promise<any | null> => {
  
    const info = await axios.delete(`bot/delete/${id}`, {

        headers:
            { 'Authorization': token ? 'Bearer ' + token : null }
    })
        .then(res => res)
        .catch(err => err.response)
    
        
    console.log(info)


    return info

}