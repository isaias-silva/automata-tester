<template>
    <HeaderComponent/>
    <router-view></router-view>
    <div class="footer"></div>
</template>
  
<script lang="ts">

import HeaderComponent from "@/components/HeaderComponent.vue"

export default {
 components:{
    HeaderComponent
 }
}
</script>
  
<style scoped></style>