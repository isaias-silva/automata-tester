<template>
    <div class="component">
        <slot class="content"></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'GalleryComponent'
})
</script>
<style scoped>
.component{
   
    max-height: 100px;

   box-sizing: border-box;
   align-items: center;

}
.content{
    display: none;
}
</style>