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
 

      const messages = await getContacts(cookies.get('token'))
     
      if (messages && messagesState.messages.length<1) {
     
        messagesState.messages = messages
     
      }
    }
  })


  socket.on('msg.now', (data: { id: string, payload: string }) => {
    
    const contact: Icontact = JSON.parse(data.payload)
    if (!contact) {
      return
    }
    console.log(contact)
    const contactExisting = messagesState.messages.find(contact => contact.id == data.id)
    if (contactExisting && contactExisting.msgs && contact.msgs) {

      messagesState.messages.splice(messagesState.messages.indexOf(contactExisting), 1)

      const [newMessage] = contact.msgs

      contactExisting.msgs.push(newMessage)
    
      if (contactExisting.newMessages) {
        if(!newMessage.isMe){
          contactExisting.newMessages += 1
   
        }
          }else{
        contactExisting['newMessages']=newMessage.isMe?0:1
      }
      messagesState.messages.unshift(contactExisting)

    } else {

      messagesState.messages.unshift(contact)
    }

  })
  socket.on('msg.read', (data:{id:string}) => {
    const contactExisting = messagesState.messages.find(contact => contact.id == data.id)
  
    if (contactExisting && contactExisting.newMessages) {
    
      contactExisting.newMessages = 0
    }
  })
}
export function disconnecteSocket() {
  if (socketState.connected == true) {
    socket.disconnect()
  }

}