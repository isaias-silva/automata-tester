<template>
  <loadPopup v-if="inLoading == true" />

  <form @submit.prevent="submitForm">
    <div class="menu">
      <button type="button" class="mode" @click="toggleDarkMode">
        <span class="moon">&#127769;</span>
        <span class="sun">&#9728;</span>
      </button>
    </div>
    <h3>
      {{ mode == "login" ? "Entre na sua conta" : "registre sua conta teste" }}
    </h3>

    <img
      :src="require('@/assets/icons/profile.jpg')"
      alt="bot"
      class="icon-profile"
    />
    <div class="inputBlock">
      <input
        v-model="form.name"
        type="text"
        placeholder="seu nome"
        v-if="mode == 'register'"
      />
      <div
        class="errorBlock"
        v-for="error in errors"
        v-bind:key="errors.indexOf(error)"
      >
        <span v-if="error.value == 'name'">{{ error.message }}</span>
      </div>

      <div class="block">
        <input v-model="form.email" type="email" placeholder="E-mail" />
        <div
          class="errorBlock"
          v-for="error in errors"
          v-bind:key="errors.indexOf(error)"
        >
          <span v-if="error.value == 'email'">{{ error.message }}</span>
        </div>
        <input
          v-model="form.cpf"
          type="text"
          placeholder="seu cpf"
          v-mask="'###.###.###-##'"
          v-if="mode == 'register'"
        />

        <input
          v-model="form.number"
          v-mask="'(##)#####-####'"
          type="text"
          placeholder="seu número"
          v-if="mode == 'register'"
        />

        <div
          class="errorBlock"
          v-for="error in errors"
          v-bind:key="errors.indexOf(error)"
        >
          <span v-if="error.value == 'number'">{{ error.message }}</span>
        </div>

        <input v-model="form.password" type="password" placeholder="Senha" />

        <input
          v-model="form.passwordRepite"
          type="password"
          placeholder="repita a senha"
          v-if="mode == 'register'"
        />
        <div
          class="errorBlock"
          v-for="error in errors"
          v-bind:key="errors.indexOf(error)"
        >
          <span v-if="error.value == 'password'">{{
            error.message || "erro interno"
          }}</span>
        </div>
      </div>
    </div>
    <button type="submit">
      {{ mode == "login" ? "Entrar" : "Cadastrar" }}
    </button>

    <span class="clickspan" @click="toggleLoginResister">
      {{
        mode == "login"
          ? "não possui conta? registre!"
          : `possui
            uma
            conta ? entre!`
      }}
    </span>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import loginRequest from "@/services/login";
import register from "@/services/register";

import loadPopup from "@/components/popups/load.popup.vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default defineComponent({
  name: "loginPage",

  data(): {
    form: {
      email?: string;
      password?: string;
      passwordRepite?: string;
      number?: string;
      name?: string;
      cpf?: string;
    };
    noturne: boolean;
    errors: {
      message: string;
      value: "password" | "email" | "number" | "name" | "cpf";
    }[];
    mode: "login" | "register";

    inLoading: boolean;
  } {
    return {
      form: {},
      noturne: cookies.get("noturne") ? true : false,
      errors: [],
      mode: "login",

      inLoading: false,
    };
  },
  methods: {
    async submitForm() {
      this.validateForm();
      if (this.errors.length > 0) {
        return;
      } else {
        this.inLoading = true;
        setTimeout(async () => {
          switch (this.mode) {
            case "login":
              if (this.form.email && this.form.password) {
                const info = await loginRequest({
                  email: this.form.email,
                  password: this.form.password,
                });
                try {
                  const { data, status } = info;

                  if (status == 201) {
                    cookies.set("token", data.token);
                    this.$router.push("/");
                  } else {
                    throw new Error(data.message);
                  }
                } catch (err: any) {
                  this.errors.push({ message: err.message, value: "password" });
                }
                console.log(info);
              }

              break;
            case "register":
              if (
                this.form.name &&
                this.form.email &&
                this.form.password &&
                this.form.number
              ) {
                const info = await register({
                  email: this.form.email,
                  password: this.form.password,
                  name: this.form.name,
                  phone_number: this.form.number.replace(/[^\w\s]/gi, "").trim(),
                  cpf: this.form.cpf?.replace(/[^\w\s]/gi, "").trim(),
                });
                const { data, status } = info;

                if (status == 201 || status == 200) {
                  cookies.set("token", data.token);

                  this.$router.push("/renovate");
                } else {
                  this.errors.push({
                    message: data.message,
                    value: "password",
                  });
                }
                console.log(info);
              }

              break;
          }

          this.inLoading = false;
        }, 5000);
      }
    },
    validateForm() {
      this.errors = [];
      if (!this.form.email) {
        this.errors.push({ message: "Digite um email.", value: "email" });
      }

      if (this.form.email && !this.form.email.includes("@")) {
        this.errors.push({ message: "Email inválido.", value: "email" });
      }

      if (!this.form.password) {
        this.errors.push({
          message: "Digite uma senha válida.",
          value: "password",
        });
      }

      if (this.form.password && this.form.password.length < 8) {
        this.errors.push({
          message: "Senha muito curta. Use no mínimo 8 dígitos.",
          value: "password",
        });
      }
      if (this.mode == "register") {
        if (!this.form.name) {
          this.errors.push({ message: "Digite um nome.", value: "name" });
        }
        if (this.form.name && this.form.name.length < 4) {
          this.errors.push({
            message: "nome muito curto, no minimo 4 digitos.",
            value: "name",
          });
        }
        if (this.form.name && this.form.name.length > 20) {
          this.errors.push({
            message: "nome muito longo use no maximo 20 digitos.",
            value: "name",
          });
        }
        if (this.form.password != this.form.passwordRepite) {
          this.errors.push({
            message: "senhas não são iguais.",
            value: "password",
          });
        }
        if (!this.form.number) {
          this.errors.push({
            message: "numero de telefone é necessário.",
            value: "number",
          });
        } else {
          this.form.number = this.form.number.replace(/[^\w\s]/gi, "").trim();
         
        }

        if (!this.form.cpf) {
          this.errors.push({
            message: "cpf é necessário",
            value: "cpf",
          });
        } else {
          this.form.cpf = this.form.cpf.replace(/[^\w\s]/gi, "");
         
        }

        if (this.form.cpf && this.form.cpf.toString().length < 11) {
          this.errors.push({
            message: "cpf inválido use no minimo 11 digitos",
            value: "cpf",
          });
        }

        if (this.form.number && this.form.number.toString().length > 14) {
          this.errors.push({
            message: "numero inválido use no máximo 14 digitos",
            value: "number",
          });
        }
      }
    },
    toggleDarkMode() {
      this.noturne = !this.noturne;
      if (this.noturne == true) {
        document.body.classList.add("dark");
        cookies.set("noturne", this.noturne ? "true" : "false", "15d");
      } else {
        document.body.classList.remove("dark");
        cookies.remove("noturne");
      }
    },
    toggleLoginResister() {
      this.mode = this.mode == "login" ? "register" : "login";
      this.errors = [];
    },
  },
  mounted() {
    if (cookies.get("token")) {
      this.$router.push("/");
    }
  },
  components: {
    loadPopup,
  },
});
</script>
<style lang="css" scoped>
form {
  position: relative;
  background-color: var(--modal-color);
  color: var(--font-color);
  width: 40%;
  min-height: 250px;
  margin: auto;
  margin-top: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 8px 8px #1d1d1d99;
  transition: 1s linear;
}

.clickspan {
  color: var(--link-color);
  cursor: pointer;
  margin: 10px;
  transition: linear 1s;
}

.clickspan:hover {
  filter: invert(100%);
  text-decoration: underline;
}

.menu {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}

.icon-profile {
  border-radius: 100%;
  width: 200px;
  height: 200px;
  margin: 15px 15px;
}

.errorBlock span {
  margin: auto;
  display: block;
  text-align: center;
  background-color: rgb(225, 130, 130);
  color: #ff0000;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
}
.inputBlock {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
}

.block {
  margin: 10px;
  display: flex;
  flex-direction: column;
  width: 80%;
}

.inputBlock input {
  width: 100%;
  height: 30px;
  margin-bottom: 15px;
  border: 2px solid var(--component-two-color);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 5px;
}

.inputBlock input:focus {
  outline: none;
}

button[type="submit"] {
  width: 50%;
  border: none;
  background-color: var(--component-two-color);
  height: 30px;
  border-radius: 10px;
  transition: 0.4s linear;
}

button[type="submit"]:hover {
  cursor: pointer;
  background-color: var(--link-color);
}

.mode {
  grid-area: btn;
}

.mode {
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 100%;
}

.mode .moon,
.mode .sun {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.mode .moon {
  background-color: #000;
  transition-delay: 0.1s;
  transform-origin: left;
}

.mode .sun {
  background-color: #ffc107;
  transition-delay: 0s;
  transform-origin: right;
}

.dark .mode .sun {
  transform: rotate(45deg) translateX(45%);
}

@media screen and (max-width: 768px) {
  form {
    width: 90%;
  }
}
</style>
