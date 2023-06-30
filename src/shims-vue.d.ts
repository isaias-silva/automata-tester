/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue/types/vue' {
  interface Vue {
    $cookies: any; // ou substitua 'any' pelo tipo correto para os cookies
  }
}
