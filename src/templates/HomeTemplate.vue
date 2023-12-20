<template>
       
       <AsideComponent/>
   
    <div class="content-father">
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
.content-father {
    padding: 0;
    margin: 0;
    width: 80%;
   
    position: absolute;
    right: 0;
    color: var(--font-color);
    transition: 0.2s linear;
    display: grid;
      grid-template-columns: 1fr; /* Uma coluna */
      grid-template-rows: auto; /* Altura automática para as linhas */
      gap: 10px; /* Espaçamento entre os itens, se necessário */
    padding-top: 0;
   
}

div .min~.content-father {
    width: 90%;
}
</style>