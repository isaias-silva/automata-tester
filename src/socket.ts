import { reactive } from "vue";
import { Socket, io } from "socket.io-client";

import { useCookies } from "vue3-cookies";
import { Icontact } from "./interfaces/interface.bot.contact";
import getContacts from "./services/get.contacts";
import getChats from "./services/get.chats";
import { useRoute } from "vue-router";
const { cookies } = useCookies();


type WAconnectType = {
  status: 'qrcode' | 'connected' | 'disconnected' | 'loading' | "phone closed session",
  qr?: string,
  id?: string
}

export const socketState = reactive<{ connected: boolean, WAconnect?: WAconnectType }>({
  connected: false,

  WAconnect: {
    status: 'loading'
  }
});
export const messagesState = reactive<{ messages: { botId: string, contacts: Icontact[] }[] }>({ messages: [] })


const token = cookies.get('token')



export let socket: Socket
export function connectSocket() {

  const URL = `http://localhost:8080`;

  if (socketState.connected == false) {
    socket = io(URL, {
      auth: {
        token
      }
    })

  }


  socket.on("connect", () => {
    socketState.connected = true;
  });

  socket.on("disconnect", () => {
    socketState.connected = false;
  });
  socket.on('conn', async (data: WAconnectType) => {
    socketState.WAconnect = data

    console.log(data)
    if (data.status == 'connected' && data.id) {


      const messages = await getContacts(cookies.get('token'), data.id)
    
      

        const bot = messagesState.messages.find(value => value.botId == data.id)
        if (bot && messages) {
          bot.contacts = messages
        } else {
          const newBot = { botId: data.id, contacts: messages||[] }
     
          messagesState.messages.push(newBot)
        }

      
    }
  })


  socket.on('msg.now', (data: { botId: string, id: string, payload: string }) => {

    const contact: Icontact = JSON.parse(data.payload)
    if (!contact) {
      return
    }
    console.log(contact)
    const botExist = messagesState.messages.find(value => value.botId == data.botId)
    if (!botExist) {

      return
    }
    const contactExisting = botExist.contacts.find(value => value.id == data.id)

    if (contactExisting && contactExisting.msgs && contact.msgs) {

      botExist.contacts.splice(botExist.contacts.indexOf(contactExisting), 1)

      const [newMessage] = contact.msgs

      contactExisting.msgs.push(newMessage)

      if (contactExisting.newMessages) {
        if (!newMessage.isMe) {
          contactExisting.newMessages += 1

        }
      } else {
        contactExisting['newMessages'] = newMessage.isMe ? 0 : 1
      }
      botExist.contacts.unshift(contactExisting)

    } else {
      botExist.contacts.unshift(contact)
    }

  })

}

export function disconnecteSocket() {
  if (socketState.connected == true) {
    socket.disconnect()
  }

}