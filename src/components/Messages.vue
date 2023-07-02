
<template>
    <div class="message">
       <p v-if="message?.text"> {{ message?.text }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Imessage } from '@/interfaces/interface.bot.message';
export default defineComponent({
    name: 'Message',
props:{
    message:{
        type: Object as ()=> Imessage,
        required:false
    }
}
})
    