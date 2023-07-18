/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
/* eslint-disable */
declare module '*.mp3' {
export default String
}
declare module 'vue/types/vue' {
  interface Vue {
    $cookies: any; // ou substitua 'any' pelo tipo correto para os cookies
  }
}
