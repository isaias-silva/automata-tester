<template>
    <AsideComponent />
    <div class="content">
        <router-view></router-view>

    </div>
    <div class="footer"></div>
</template>
  
<script lang="ts">

import AsideComponent from "@/components/AsideChatComponent.vue"
import { connectSocket, socket, socketState, disconnecteSocket, messagesState } from "@/socket";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import { defineComponent, watch, watchEffect } from 'vue'
import soundMsg from '../assets/sounds/message.mp3'
import useSound from "vue-use-sound"
import { Icontact } from "@/interfaces/interface.bot.contact";
import { useRoute, useRouter } from "vue-router";


export default defineComponent({
    components: {
        AsideComponent
    }, setup() {
        const route = useRoute()
        const router = useRouter()

        const [play, audio] = useSound(soundMsg.toString())
        watchEffect(() => {
            const { connected } = socketState
            if (connected) {
                const botId = route.query.id
                if (!botId) {
                    router.push('/')
                }
                socket.emit('start', botId)

                socket.on('msg.now', async (data: { id: string, payload: string }) => {

                    const contact: Icontact = JSON.parse(data.payload)
                    if (!contact) {
                        return
                    }
                    if (contact.msgs && contact.msgs[0]) {

                        const message = contact.msgs[0]
                        if (!message.isMe) {
                            play()
                        }
                    }

                    console.log('tocou?')
                })
            } else {
                if (socketState.WAconnect) {
                    socketState.WAconnect.status = 'disconnected'
                }
            }
        })

    }, mounted() {

        connectSocket()

    }, beforeUnmount() {

        disconnecteSocket()
    }



});

</script>
  
<style scoped>
.content {
    position: absolute;
    right: 0;
    width: 80%;
    background-size: cover;
    background-attachment: fixed;



}

@media screen and (max-width: 768px) {

    .content {
        width: 100%;
        z-index: 99999 !important;
    }

}
</style>