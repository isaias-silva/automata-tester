<template>
       
       <AsideComponent/>
   
    <div class="content">
        <router-view></router-view>
    </div>

    <div class="footer"></div>
</template>
  
<script lang="ts">

import AsideComponent from "@/components/AsideComponent.vue"

export default {
    components: {
        AsideComponent
    }
}
</script>
  
<style scoped>
.content {
    padding: 0;
    margin: 0;
    width: 80%;
    position: absolute;
    right: 0;
    color: var(--font-color);
    transition: 0.2s linear;
}

div .min~.content {
    width: 90%;
}
</style>