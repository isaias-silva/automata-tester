import { reactive } from "vue";
import { io } from "socket.io-client";

import { useCookies } from "vue3-cookies";
import { Icontact } from "./interfaces/interface.bot.contact";
const { cookies } = useCookies();
import dotenv from 'dotenv'
dotenv.config()


type WAconnectType = {
  status: 'qrcode' | 'connected' | 'disconnected' | 'loading' | "phone closed session",
  qr?: string, id?: string
}

export const socketState = reactive<{ connected: boolean, WAconnect?: WAconnectType }>({
  connected: false,

  WAconnect: {
    status: 'loading'
  }
});
export const messagesState = reactive<{ messages: Icontact[] }>({ messages: [] })


const token = cookies.get('token')

const URL = (process.env.URL || `http://localhost:8080`)+`/?token=${token}`;

export const socket = io(URL)
socket.on("connect", () => {
  socketState.connected = true;
});

socket.on("disconnect", () => {
  socketState.connected = false;
});
socket.on('conn', (data: WAconnectType) => {
  socketState.WAconnect = data
  
  if (data.status == 'connected' && data.id) {
    cookies.set('idWa', data.id)
  }
})

socket.on('msg', (data: { id: string, payload: string }[]) => {

 messagesState.messages= data.map(value => {

    const object: Icontact = JSON.parse(value.payload)
    
   return object
   
  }).filter(value=>value!=undefined)
})