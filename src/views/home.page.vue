<template>
  <div class="allboard">
    <admin-card />
    <router-link to="users" class="itens">
      <h4>users</h4>
      <img :src="require('@/assets/icons/users.png')" alt="">


    </router-link>


    <router-link to="users" class="itens">
      <h4>flows</h4>
      <img :src="require('@/assets/icons/flow.png')" alt="">


    </router-link>


    <router-link to="attendants" class="itens">
      <h4>attendants</h4>
      <img :src="require('@/assets/icons/attendant.png')" alt="">



    </router-link>

    <router-link to="chat" class="itens">
      <h4>chat</h4>
      <img :src="require('@/assets/icons/chat.png')" alt="">



    </router-link>


  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AdminCard from '@/components/adminCard.vue';
export default defineComponent({
  name: "HomePage",
  components: { AdminCard }
})
</script>
<style scoped>
.allboard {
  widows: 100%;
  display: flex;
  justify-content: space-between;

  box-sizing: border-box;
  padding: 5px;
  flex-wrap: wrap;
}

.itens {
  background-color: var(--modal-color);
  width: 30%;
  text-align: center;
  min-height: 300px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 8px 8px #0000002e;
  margin-bottom: 30px;
  transition: linear 0.5s;
  overflow: hidden;
}

.itens h4,
p,
a,
span {
  text-decoration: none;
  color: var(--font-color)
}

.itens h4 {
  font-size: 24px;
  z-index: 99;
}

.itens img {
  transition: 0.5s linear;
}

.itens:hover img {
  transform: scale(1.2);
  opacity: 0.4;
}

.itens img {
  width: 60%;

}
</style>