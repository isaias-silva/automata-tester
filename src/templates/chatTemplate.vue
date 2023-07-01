<template>
    <AsideComponent />
    <div class="content">
        <router-view></router-view>

    </div>
    <div class="footer"></div>
</template>
  
<script lang="ts">

import AsideComponent from "@/components/AsideChatComponent.vue"
import { socket, socketState } from "@/socket";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

import { defineComponent, watch, watchEffect } from 'vue'

export default defineComponent({
    components: {
        AsideComponent
    }, setup() {
        watchEffect(() => {
            const { connected } = socketState
            if (connected) {
                socket.emit('start', cookies.get('idWa') || Math.random().toString(32).replace('0.', 'I'))

            }else{
                if(socketState.WAconnect){
                    socketState.WAconnect.status='disconnected'
                }
            }
        })

    }



});

</script>
  
<style scoped>
.content {
    position: absolute;
    right: 0;
    width: 80%;
    box-sizing: border-box;
    padding: 20px;
}
</style>