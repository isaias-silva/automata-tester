<template>
  <div :class="bot?.type == 'TelBot' ? 'allboard tel' : 'allboard norm'">
    <div class="banner">
      <div class="banner-image"></div>
      <img
        :src="bot?.botCreds?.profile || require('../../public/profile.png')"
        alt="profile"
        class="profile rounded-image"
      />
      <div class="bot-info">
        <div class="blockinfo">
          <h2>{{ bot?.name || "robot" }}</h2>
          <span>@{{ bot?.botCreds?.name || "bot automatizado" }}</span>
        </div>
        <div class="blockinfo">
          <h2>{{ bot?.mode }}</h2>
          <span>{{
            bot?.type == "TelBot"
              ? "Telegram"
              : bot?.type == "WaBot"
              ? "Whatsapp"
              : "tipo de bot"
          }}</span>
        </div>
      </div>
   
    </div>
    <div class="content">
        <h3>Detalhes </h3>
        <font-awesome-icon icon='network-wired'/> 
      </div>
  </div>
</template>

<script lang="ts">
import { IBotInfo } from "@/interfaces/interface.bot.info";
import router from "@/route";
import getBot from "@/services/get.bot";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default defineComponent({
  name: "botDetails",
  setup() {
    const token = cookies.get("token");
    const route = useRoute();
    const bot = ref<IBotInfo>();

    onMounted(async () => {
      if (!token) {
        router.push("/login");
      }
      const botReq = await getBot(token, route.params.id.toString());

      if (!botReq) {
        router.push("/profile");
      }
      bot.value = botReq;
    });

    return { bot };
  },
});
</script>
<style scoped>
.banner {
  width: 95%;
  margin: 0;
  background-color: var(--component-transparent-color);
  display: grid;
  position: relative;
  grid-template-rows: 80% 20% 20%;
  grid-template-columns: 50% 50%;
  grid-template-areas: "profile info info " "profile info info";
  border-radius: 10px;
  margin: auto;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 4px;
  overflow: hidden;
}

.banner-image {
  position: absolute;
  top: 0;
  width: 100%;
  height: 65%;
  z-index: -1;
  background-image: linear-gradient(
    to left,
    var(--component-color),
    var(--component-two-color)
  );
  background-size: 100%;
}

.profile {
  grid-area: profile;
  align-self: end;
  width: 200px;
  border-radius: 100%;
  margin: 10px;
  box-sizing: border-box;
  border: 10px solid var(--component-transparent-color);
}
.bot-info {
  width: 100%;
  grid-area: info;
  display: flex;
  justify-content: space-around;
  align-self: end;

  box-sizing: border-box;
}
.blockinfo h2 {
  font-size: 32px;
}
</style>
