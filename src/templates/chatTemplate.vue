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
import getContacts from "@/services/get.contacts";

export default defineComponent({
    components: {
        AsideComponent
    }, setup() {
        watchEffect(() => {
            const { connected } = socketState
            if (connected) {

                socket.emit('start', cookies.get('idWa') || Math.random().toString(32).replace('0.', 'I'))

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