
<template>
    <div v-if="message" :class="`message ${message?.isMe ? 'me' : 'you'}`">
        <img v-if="message?.media && (message.type == 'image' || message.type == 'sticker') && message.media.data"
            :src="generateBase64()" />

        <audio v-if="message.media && message.type == 'audio'" :src="generateBase64()" controls></audio>

        <video v-if="message.media && message.type == 'video'" controls>
            <source :src="generateBase64()" :type="message.media.mimetype || 'video/mp4'">
        </video>
        
        <div v-if="message.quoted == true && message.msgQuoted" class="replace">
            <p>{{ message.msgQuoted.text || "["+ message.msgQuoted.type+"]" }}</p>
        </div>
        
        <p v-if="message?.text"> <span v-if="$props.isGroup==true" class="userchat">{{ message.name }}: </span> {{ message?.text }}</p>
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
        },
        isGroup:{
            type: Boolean
        }
    },
    methods: {
        generateBase64() {
            if (!this.message || !this.message.media) {
                return
            }
            return `data:${this.message.media.mimetype};base64,` + this.message.media.data
        }
    }, mounted() {
        console.log(this.$props.message)
    }
})
</script>
<style scoped>
.userchat{
    font-weight: bold;
}
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
.replace{
    background-color: #00000028;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px;
}
.message p {
    width: 90%;
    margin: 5px;
    word-wrap: break-word;
}

.message img,
.message video {
    width: 100%;

    border-radius: 10px;
}

.message.me {
    background-color: var(--component-two-color);
    margin-left: 70%;
}
.me audio::-webkit-media-controls-panel{
    background-color: var(--component-two-color);
}
audio::-webkit-media-controls-panel {
    color:var(--font-color);
    background-color: var(--modal-color);

}

</style>
    