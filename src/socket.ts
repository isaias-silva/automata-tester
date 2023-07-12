import { reactive } from "vue";
import { Socket, io } from "socket.io-client";

import { useCookies } from "vue3-cookies";
import { Icontact } from "./interfaces/interface.bot.contact";
import getContacts from "./services/get.contacts";
import getChats from "./services/get.chats";
const { cookies } = useCookies();



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



export let socket: Socket
export function connectSocket() {

  const URL = `http://localhost:8080?token=${token}`;

  if (socketState.connected == false) {
    socket = io(URL)

  }


  socket.on("connect", () => {
    socketState.connected = true;
  });

  socket.on("disconnect", () => {
    socketState.connected = false;
  });
  socket.on('conn', async (data: WAconnectType) => {
    socketState.WAconnect = data

    if (data.status == 'connected' && data.id) {
      cookies.set('idWa', data.id)
     
      const messages = await getContacts(cookies.get('token'))

      if (messages) {

        messagesState.messages = messages
        messagesState.messages.map(async (contact) => {
          const chats = await getChats(cookies.get('token'), contact._id,10,1)
          if (chats) {
            contact.msgs = chats
          }
          return contact
        })
      }
    }
  })


  socket.on('msg-no', (data: { id: string, payload: string }) => {

    const contact: Icontact = JSON.parse(data.payload)
    if (!contact) {
      return
    }
    console.log(contact)
    const contactExisting = messagesState.messages.find(contact => contact.id == data.id)
    if (contactExisting) {

      messagesState.messages.splice(messagesState.messages.indexOf(contactExisting), 1)

      contactExisting.msgs = contact.msgs
      messagesState.messages.unshift(contactExisting)

    } else {
      messagesState.messages.unshift(contact)
    }

  })
}
export function disconnecteSocket() {
  if (socketState.connected == true) {
    socket.disconnect()
  }

}