<template>
  <LoadPopup v-if="load" />
  <Popup
    :title="popupMessages.title"
    :message="popupMessages.message"
    v-if="showPopup"
    @close="() => (showPopup = false)"
  />

  <div class="modal">
    <form @submit.prevent="submit" method="post">
      <h3>Editar dados</h3>

      <div class="collum">
        <div class="collum">
          <Profile :profile-prop="infoUpdated?.profile" :reload="true" />
        </div>
        <div class="collum">
          <div class="block">
            <label for="name">Nome:</label>
            <input
              v-model="infoUpdated.name"
              type="text"
              id="name"
              name="name"
            />
          </div>

          <div class="block">
            <label for="email">E-mail:</label>
            <input
              type="email"
              v-model="infoUpdated.email"
              id="email"
              name="email"
            />
          </div>
          <div class="block">
            <label for="email">telefone:</label>
            <input
              type="number"
              v-model="infoUpdated.phone"
              id="email"
              name="email"
            />
          </div>
        </div>
      </div>

      <button type="submit">Salvar Alterações</button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import Popup from "./popups/popup.vue";
import LoadPopup from "./popups/load.popup.vue";
import Profile from "./profile.vue";
import { sessionInfo } from "@/session";
import updateUser from "@/services/update.user";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default defineComponent({
  name: "editFormUser",

  data(): {
    load: boolean;
    showPopup: boolean;
    popupMessages: { title: string; message: string };
    infoUpdated: {
      profile: string;
      name: string;
      email: string;
      phone: string;
    };
  } {
    return {
      load: false,
      showPopup: false,
      popupMessages: { title: "", message: "" },
      infoUpdated: {
        phone: sessionInfo.phonenumber,
        name: sessionInfo.name,
        email: sessionInfo.email,
        profile: sessionInfo.profile,
      },
    };
  },
  methods: {
    async submit() {
      const { name, phone, email } = this.infoUpdated;
      if (
        sessionInfo.name == name &&
        sessionInfo.phonenumber == phone &&
        sessionInfo.email == email
      ) {
        return;
      }

      if(name.length<3 || phone.length<3){
        this.popupMessages.message = "o nome do usuário ou numero de telefone estão inválidos.";
        this.popupMessages.title = "aviso"
      
        this.showPopup = true;
        return
      }
      this.load = true;

      const info = await updateUser(cookies.get("token"), {
        name,
        phone_number: phone,
        email,
      });

      if (info.status == 200) {
        location.reload();
      } else {
        this.popupMessages.message = "erro ao atualizar informações";
        this.popupMessages.title = info.statusText;
        this.load = false;
        this.showPopup = true;
      }
    },
  },

  components: { Popup, LoadPopup, Profile },
});
</script>
<style scoped>
form {
  position: relative;
  background-color: var(--modal-color);
  color: var(--font-color);
  border: 2px solid var(--component-two-color);
  width: 50%;
  min-height: 250px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 8px 8px #1d1d1d99;
  transition: 1s linear;
  margin-top: 200px;
  margin-bottom: 20px;
}
.block,
.collum {
  display: flex;
  width: 60%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.collum {
  flex-direction: column;
  width: 100%;
}
input {
  width: 80%;
  border-radius: 3px;
  padding-left: 4px;
  height: 26px;
  border: 1px solid var(--component-two-color);
}
button {
  background-color: var(--component-two-color);
  border: 2px solid var(--component-color);
  color: var(--component-color);
  box-sizing: border-box;
  padding: 5px;
  border-radius: 10px;
  font-weight: bold;
  transition: 0.4s linear;

  margin-top: 50px;
  width: 30%;
  height: 40px;
  text-decoration: none;
  font-size: 18px;
}

button:hover {
  background-color: var(--component-color);
  border-color: var(--component-two-color);
  color: var(--component-two-color);
  cursor: pointer;
}
</style>
