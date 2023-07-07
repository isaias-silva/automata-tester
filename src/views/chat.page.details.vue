<template>
    <div class="header-chat">
        <img :src="chatInfo?.picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'"
            alt="profile">
        <h2> {{ chatInfo ? chatInfo?.name : '' }}</h2>
    </div>

    <div class="section-chat" v-if="chatInfo?.msgs && chatInfo.msgs.length > 0">
        <MessagesComponent v-for=" message, key of chatInfo?.msgs" :message="message" :key="key"
            :is-group="chatInfo.isGroup" />
    </div>

    <div class="footer-chat">
        <button>
            <img :src="require('@/assets/icons/anex.png')" alt="anex">
        </button>
        <div>
       
     
        </div>
        <textarea v-model="message">

        </textarea>
        <button @click="sendMessage()">
            <img :src="require('@/assets/icons/sender.png')" alt="send">

        </button>
    </div>
</template>
<script lang="ts">
import { Icontact } from '@/interfaces/interface.bot.contact';
import { messagesState, socket} from '@/socket';
import MessagesComponent from '@/components/Messages.vue'
import { defineComponent, watchEffect } from 'vue'



export default defineComponent({
    name: "ChatPageDetails",
    components: {
        MessagesComponent,
        
    },
    data(): { chatInfo?: Icontact, message?: string } {
        return {
            chatInfo: undefined,
            message: undefined
        }
    },
    mounted() {
        this.updateChatInfo();
        watchEffect(() => {
            this.updateChatInfo()
        })


    },
    watch: {
        "$route.params.id": {
            immediate: true,
            handler() {
                this.updateChatInfo();
            },

        },

    },
    methods: {
        onEmojiSelect(emoji:any){
           alert('aaaaaaaaaaaa')
        },
        updateChatInfo() {
            const id = this.$route.params.id;
            this.chatInfo = messagesState.messages.find((value) => value.id === id);
            if (!this.chatInfo) {
                this.$router.push('/chat');
            }
        },
        readMessage() {
            socket.emit('messageConfig', { read: true, id: this.chatInfo?.id })
        },
        sendMessage(){
            if(!this.message|| this.message.length < 1){
                return
            }
            socket.emit('sendText',{phone:this.$route.params.id, text:this.message})
            this.message=''
        }
    }




})
</script>
<style scoped>
* {
    color: var(--font-color);

}

.emojiModal{
    width: 200px;
    height: 300px;
    display: flex;
}
.header-chat,
.footer-chat {
    width: 80%;
    background-color: var(--component-color);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
    position: fixed;
    z-index: 999 !important;
}

.footer-chat {
  
    bottom: 0;
    justify-content: space-between;
}

.footer-chat textarea {
    background-color: var(--modal-color);
    resize: none;
    width: 90%;
    height: 40px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px;

}

.footer-chat button {
    width: 40px;
    border-radius: 10px;
    display: flex;
    border: none;
    align-items: center;
    justify-content: center;
    background-color: var(--component-two-color);
    box-sizing: border-box;
    padding: 5px;
    cursor: pointer;
    transition: 0.5s linear;
}

.footer-chat button:hover {
    background-color: var(--component-color);
}

.footer-chat button img {
    width: 100%;
    transition: 0.5s linear;
}

.footer-chat button:hover img {
    transform: scale(1.1);
    filter: invert(100%);
}

.header-chat img {
    width: 50px;
    border: 2px solid var(--component-two-color);
    box-sizing: border-box;
    border-radius: 100%;
    margin-right: 10px;

}

.section-chat {
    margin-top: 100px;
    margin-bottom: 50px;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
}
@media screen and (max-width: 768px) {
  
   .section-chat{
    width: 100%;
    background-color: var(--main-color);
    height: 100%;
    margin: 0;
    box-sizing: border-box;
    padding-top: 70px;
    padding-bottom: 50px;
   }
 .header-chat,.footer-chat{
    width: 100%;
 }
}
</style>