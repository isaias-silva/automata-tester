<template>
  <label class="profile" for="profile">
    <img
      :src="
        selectedImage ||
        profileProp ||
        require('@/assets/icons/profile-unknow.png')
      "
      alt=""
    />
    <input
      type="file"
      name="picture"
      id="profile"
      @change="handleImageChange"
    />
  </label>
</template>

<script lang="ts">
import uploadProfile from "@/services/upload.profile";
import { defineComponent } from "vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default defineComponent({
  name: "profileEdit",
  data(): {
    selectedImage?: string;

    profileFile?: File;
  } {
    return {
      selectedImage: undefined,

      profileFile: undefined,
    };
  },
  props: {
    profileProp: String,
    reload: Boolean,
  },
  methods: {
    handleImageChange(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.profileFile = file;
        const [type, format] = file.type.split("/");

        if (type != "image") {
          
          this.selectedImage = require("@/assets/icons/corrupted.jpg");
          return;
        }
        this.updateProfile().then(() => {
            if(this.reload.valueOf()){
          
                location.reload();
            }
          });

        this.selectedImage = URL.createObjectURL(file);
      }
    },
    async updateProfile() {
      if (!this.profileFile) {
        return;
      }
      const info = await uploadProfile(cookies.get("token"), this.profileFile);

      console.log(info);
    },
  },
});
</script>

<style scoped>
.profile {
  box-sizing: border-box;
background-color: var(--font-color);
  overflow: hidden;
  border-radius: 100%;
  border: 2px solid var(--component-color);
  height: 160px;
  width: 160px;
  position: relative;
}

.profile:hover {
  cursor: pointer;
}

.profile:hover::after {
  content: " trocar perfil ";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0000006d;
  z-index: 1000 !important;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.profile input {
  display: none;
}

.profile img {
  transition: 0.3s linear;
  height: 100%;
}

.profile:hover img {
  transform: scale(2);
}
</style>
