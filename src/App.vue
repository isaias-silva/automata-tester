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
  }, mounted() {
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
  --main-color: #d4f3dc; /* Light green */
  --modal-color: #ffffff; /* White */
  --component-color: #337658; /* Dark green */
  --component-two-color: #6abd85; /* Pastel green */
  --font-color: #000000; /* Black */
  --link-color: #00aa44; /* Deep green */
  --popup-text-color: var(--font-color);
  --component-transparent-color: rgba(255, 255, 255, 0.457); /* White with transparency */
}





body {
  background-color: var(--main-color);
}

body.dark {

  --component-transparent-color: rgba(0, 0, 0, 0.457);

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
  scrollbar-color: var(--main-color);
}


*::-webkit-scrollbar-track {
  background-color: var(--component-color)
}

*::-webkit-scrollbar-thumb {
  background-color: var(--link-color)
}
</style>
