import axios from "./axios"
import { Buffer } from "buffer"
export default async function (token: string, file: File) {
    
    const arrayBuffer = await file.arrayBuffer()
   
    const bufferProfile = Buffer.from(arrayBuffer)
  
    const info = await axios.put('/upload/userprofile', {
        file: bufferProfile
    },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }

        }
    ).then(res => res).catch(err => err.response)
    return info
}