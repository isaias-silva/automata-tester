<template>
    <HeaderComponent />
    <div class="content">
        <router-view></router-view>
    </div>

    <div class="footer"></div>
</template>
  
<script lang="ts">

import HeaderComponent from "@/components/HeaderComponent.vue"

export default {
    components: {
        HeaderComponent
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