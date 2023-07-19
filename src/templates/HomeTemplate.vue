<template>
    <HeaderComponent/>
   <div class="content">
    <router-view></router-view>
   </div>
  
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
  
<style scoped>
.content{
    width: 80%;
    position: absolute;
    right: 0;
}
div .min ~ .content{
width: 90%;
}
</style>