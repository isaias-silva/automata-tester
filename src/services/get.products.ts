
import { Iproduct } from "@/interfaces/interface.payment.products";
import axios from "./axios";

export default async (): Promise< Iproduct[] |null> => {
    const info = await axios.get('payment/product')
        .then(res => res)
        .catch(err => null)
    if (!info) {
        return null
    }
    const data = info.data.products

    return data

}