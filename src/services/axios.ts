import axios from "axios";


export default axios.create(
    {
        baseURL:`http://167.86.126.146:8080/`,
        headers: {
            'Content-Type': 'application/json',

        }
    }
)