<template>
  <p>
    wellcome to the chat! test the realtime messages!
  </p>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "ChatPage"
})
</script>
<style scoped>
* {
  color: var(--font-color)
}

p {
  box-sizing: border-box;
  padding: 10px;
  text-align: center;

}

@media screen and (max-width: 768px) {
  p {
    position: absolute;
    bottom:100%;
   display: none;
  }
}
</style>