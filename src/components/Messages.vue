
<template>
    <div :id="message._id.toString()" v-if="message" :class="`message ${message?.isMe ? 'me' : 'you'} ${!message.text ? 'invis' : ''}`">

        <div :href="'#'+message.msgQuoted._id" v-if="message.quoted == true && message.msgQuoted != undefined" class="replace">
            <p v-if="isGroup"><strong>{{ (message.msgQuoted.name || message.msgQuoted.number)}} </strong></p>
            <div v-if="message.msgQuoted" class="block-replace">
                <img v-if="message.msgQuoted && message?.msgQuoted.media && (message.msgQuoted.type == 'image' || message.type == 'sticker') && message.msgQuoted.media.data"
                    :src="generateBase64Quoted()" />

                <p v-if="message.msgQuoted && message?.msgQuoted.media && message.msgQuoted.type!='image' && message.msgQuoted.type!='sticker'&& message.msgQuoted.type!='text' && message.msgQuoted.type!='quoted' " >{{ message.msgQuoted.type }}</p>
                <p v-if="message.msgQuoted && message.msgQuoted.text">{{ message.msgQuoted.text }}</p>

            </div>
        </div>
        

        <p v-if="isGroup && message.type != 'text' && !message.text"><strong>{{ message.name }}</strong></p>



        <img v-if="message?.media && (message.type == 'image' || message.type == 'sticker') && message.media.data"
            :src="generateBase64()" />

        <audio v-if="message.media && message.type == 'audio'" :src="generateBase64()" controls></audio>

        <video v-if="message.media && message.type == 'video'" controls>
            <source :src="generateBase64()" :type="message.media.mimetype || 'video/mp4'">
        </video>

        <div class="doc" v-if="message.type == 'doc'">
            <a :href="generateBase64()" download>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 17l4 4 4-4m-4-5v9" />
                </svg>
            </a>
            <i>clique no icone para baixar o arquivo.</i>
        </div>

        <p v-if="message?.text"> <span v-if="$props.isGroup == true" class="userchat">{{ message?.name || message.number}}: </span> {{
            message?.text }}</p>

        <div v-if="message.media && !message.media.data" :class="`null ${message.type}`">

        </div>
        <div class="time">
            <span>{{ getDate() }}</span>
        </div>
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
        isGroup: {
            type: Boolean
        }
    },
    methods: {
        generateBase64() {
            try{
            if (!this.message || !this.message.media) {
                return
            }
            return `data:${this.message.media.mimetype};base64,` + this.message.media.data
        }catch(err){
            console.log(err)
        }
        },
        generateBase64Quoted() {
            try {
                if (!this.message?.msgQuoted || !this.message.msgQuoted.media) {
                    return
                }
                return `data:${this.message.msgQuoted.media.mimetype};base64,` + this.message.msgQuoted.media.data


            } catch (err) {
                console.log(err)
            }
        },
        getDate() {
            if (this.message?.date) {
                const [date, hours] = this.message.date.split(' ')
                return hours

            }

        }
    }, mounted() {
        console.log(this.$props.message)
    }
})
</script>

<style scoped>
.null{
    display: none;
}
.null.sticker{
    display: block;
    width:200px;
    height: 200px;
    background-color: rgba(215, 215, 215, 0.238);
    border-radius: 10px;
}
.userchat {
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

.replace {
    text-decoration: none;
    color:var(--font-color);
    display: block;
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

.me audio::-webkit-media-controls-panel {
    background-color: var(--component-two-color);
}

audio::-webkit-media-controls-panel {
    color: var(--font-color);
    background-color: var(--modal-color);

}

.doc {
    width: 100%;
    display: flex;

    align-items: center;
}

.doc a {
    width: 30px;
    margin: 10px;
    margin-right: 10px;
    height: 30px;
    color: var(--font-color);
    border-bottom: 2px solid var(--font-color);
    border-radius: 5px;
}

.doc i {
    font-size: 18px;
}

a svg {
    width: 100%;

}

.time {
    font-size: 12px;
    text-align: right;
    margin: 4px;
}

.block-replace {
    display: flex;
}

.block-replace img {
    width: 40%;
}

.block-replace p {
    width: 90%;
    font-size: 14px;
}

.invis {
    background-color: #00000000;
}

@media screen and (max-width: 768px) {
    .message {
        width: 70%;
    }

    .message.me {
        margin-left: 30%;
    }
}
</style>
    