<template>
    <div class="header-chat">
        <img :src="chatInfo?.picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'" alt="profile">
        <h2> {{ chatInfo ? chatInfo?.name : '' }}</h2>
    </div>

    <p>

    </p>
</template>
<script lang="ts">
import { Icontact } from '@/interfaces/interface.bot.contact';
import { messagesState, socket, socketState } from '@/socket';

import { defineComponent, watch } from 'vue'
export default defineComponent({
    name: "ChatPageDetails",
    data(): { chatInfo?: Icontact } {
        return {
            chatInfo: undefined
        }
    },
    mounted() {
        this.updateChatInfo();
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
        updateChatInfo() {
            const id = this.$route.params.id;
            this.chatInfo = messagesState.messages.find((value) => value.id === id);
            this.readMessage()
            if (!this.chatInfo) {
                this.$router.push('/chat');
            }
        },
        readMessage(){
      socket.emit('messageConfig',{read:true,id:this.chatInfo?.id})
    },
    }




})
</script>
<style scoped>
* {
    color: var(--font-color);

}


.header-chat {
    width: 100%;
    background-color: var(--component-color);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
}

.header-chat img {
    width: 50px;
    border: 2px solid var(--component-two-color);
    box-sizing: border-box;
    border-radius: 100%;
    margin-right: 10px;

}
</style>