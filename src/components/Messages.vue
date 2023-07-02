
<template>
    <div v-if="message" :class="`message ${message?.isMe ? 'me' : 'you'}`">
        <img v-if="message?.media && (message.type == 'image' || message.type == 'sticker') && message.media.data"
            :src="generateBase64()" />

        <audio v-if="message.media && message.type == 'audio'" :src="generateBase64()" controls></audio>

        <p v-if="message?.text"> {{ message?.text }}</p>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Imessage } from '@/interfaces/interface.bot.message';
export default defineComponent({
    name: 'MessageComponent',
    data() {
        return {
            linkMedia: undefined
        }
    },
    props: {
        message: {
            type: Object as () => Imessage,
            required: false
        }
    },
    methods: {
        generateBase64() {
            if (!this.message || !this.message.media) {
                return
            }
            return `data:${this.message.media.mimetype};base64,` + this.message.media.data
        }
    }
})
</script>
<style scoped>
.message {

    display: block;
    width: 30%;
    position: relative;
    padding: 2px;
    background-color: var(--modal-color);
    border-radius: 10px;
    margin-bottom: 10px;
    position: relative;

    box-sizing: border-box;
}

.message p {
    width: 90%;
    margin: 5px;
    word-wrap: break-word;
}

.message img {
    width: 100%;

    border-radius: 10px;
}

.message.me {
    background-color: var(--component-two-color);
    margin-left: 70%;
}
audio::-webkit-media-controls-panel{

    border:20px solid #000;
    background-color: var(--component-two-color);
    
}
</style>
    