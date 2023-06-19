<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'App',
  components: {

  },
  methods: {
    getTheme() {
      const theme = this.$cookies.get('noturne')
      if (theme) {
    
        
        document.querySelector('body')?.classList.add('dark')
      }
    }
  },mounted(){
    this.getTheme()
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
  --main-color: #e9eee4;
  /* Verde principal */
  --modal-color: #ffffff;
  /* Branco */
  --component-color: #539d72;
  /* Verde claro */
  --component-two-color: #a6e7a3;
  /* Verde mais claro */
  --font-color: #404040;
  /* Cinza escuro */
  --link-color: #ffffff;
  /* Verde principal */
}

body {
  background-color: var(--main-color);
}

body.dark {


  --main-color: #2a2a2a;
  /* Verde principal escuro */
  --modal-color: #1c1c1c;
  /* Preto */
  --component-color: #181b19;
  /* Verde escuro */
  --component-two-color: #638c6a;
  /* Verde mais escuro */
  --font-color: #f5f5f5;
  /* Branco */
  --link-color: #00f090;
  /* Verde principal escuro */


}</style>
