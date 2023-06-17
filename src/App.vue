<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'App',
  components: {

  }
});
</script>

<style>
* {
  font-family: sans-serif;
  padding: 0;
  margin: 0;
}

:root {
  --main-color: #e9eee4;/* Verde principal */
  --modal-color: #ffffff; /* Branco */
  --component-color: #539d72; /* Verde claro */
  --component-two-color: #d4f6d3; /* Verde mais claro */
  --font-color: #404040; /* Cinza escuro */
  --link-color: #ffffff; /* Verde principal */
}
body{
  background-color: var(--main-color);
}
</style>
