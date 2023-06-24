<template>
    <AsideComponent />
    <div class="content">
        <router-view></router-view>

    </div>
    <div class="footer"></div>
</template>
  
<script lang="ts">

import AsideComponent from "@/components/AsideChatComponent.vue"
import io from 'socket.io-client'
export default {
    components: {
        AsideComponent
    }
    // ...
};

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