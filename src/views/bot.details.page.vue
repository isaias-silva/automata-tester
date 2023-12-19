<template>
  <div class="block">

   <img :src="bot?.botCreds.profile"/>
   <h1>bot {{ bot?.name }}</h1>
  </div>
</template>

<script lang="ts">
import { IBotInfo } from "@/interfaces/interface.bot.info";
import router from "@/route";
import getBot from "@/services/get.bot";
import { defineComponent, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default defineComponent({
  name: "botDetails",
  async setup() {
    const token = cookies.get("token");
    const route = useRoute();

    if (!token) {
    router.push("/login");
    }
    const botReq = await getBot(token, route.params.id.toString());
   
    if (!botReq) {
     router.push("/profile");
    }
    
    const bot = ref<IBotInfo>(botReq);

    return {bot}
  },
});
</script>
<style scoped>

</style>
