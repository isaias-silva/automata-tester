<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default defineComponent({
  name: 'App',
  components: {

  },
  methods: {
    getTheme() {
      const theme = cookies.get('noturne')
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

  --modal-color: #ffffff;
  
  --component-color: #539d72;
 
  --component-two-color: #a6e7a3;

  --font-color: #404040;

  --link-color: #007b2f;

  --popup-text-color: var(--font-color);
}

body {
  background-color: var(--main-color);
}

body.dark {


  --main-color: #2a2a2a;
 
  --modal-color: #1c1c1c;
 
  --component-color: #181b19;
 
  --component-two-color: #638c6a;
 
  --font-color: #f5f5f5;
  
  --link-color: #00f090;
  --popup-text-color: #fff;
 


}


::-webkit-scrollbar {
  width: 6px;
}


::-webkit-scrollbar-track {
  background-color: var(--component-color);
}


::-webkit-scrollbar-thumb {
  background-color: var(--link-color)
}

* {
  scrollbar-width: thin;
  scrollbar-color:var(--main-color);
}


*::-webkit-scrollbar-track {
  background-color: var(--component-color)
}

*::-webkit-scrollbar-thumb {
  background-color:var(--link-color)
}

</style>
