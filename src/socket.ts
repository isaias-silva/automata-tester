import { reactive } from "vue";
import { io } from "socket.io-client";

import { useCookies } from "vue3-cookies";
import { Icontact } from "./interfaces/interface.bot.contact";
const { cookies } = useCookies();

type WAconnectType = {
  status: 'qrcode'| 'connected' | 'disconnected' | 'loading' | "phone closed session",
  qr?: string, id?: string
}

export const socketState = reactive<{ connected: boolean, WAconnect?: WAconnectType }>({
  connected: false,

  WAconnect: {
    status: 'disconnected'
  }
});
export const messagesState = reactive<{ messages: Icontact[] }>({ messages: [] })


const token = cookies.get('token')

const URL = process.env.URL || `https://api.zappchat.com.br/?token=${token}`;

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
socket.on('msg', (data: Icontact[]) => {
  messagesState.messages = data
})