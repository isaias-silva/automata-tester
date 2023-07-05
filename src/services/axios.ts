import axios from "axios";


export default axios.create(
    {
        baseURL: `https://api.zappchat.com.br/`,
        headers: {
            'Content-Type': 'application/json',

        }
    }
)