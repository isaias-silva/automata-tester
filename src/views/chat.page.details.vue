<template>
    <div class="header-chat">
        <img :src="chatInfo.value?.picture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'"
            alt="profile">
        <h2> {{ chatInfo ? chatInfo?.value?.name : '' }}</h2>
        <div class="control">
            <router-link :to="'/chat/' + $route.params.botId">
                <img :src="require('@/assets/icons/return.png')" alt="return">

            </router-link>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

        </div>
    </div>


    <div class="section-chat" v-if="chatInfo.value?.msgs && chatInfo.value?.msgs.length > 0">

        <div class="load-messages" ref="loadRef" v-show="!inviRef && showRef">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div ref="nowRef">

        </div>

        <div class="warking" v-show="!showRef">
            <p>mensagens anteriores a esta não estão disponíveis.</p>
        </div>
        <div class="blockMessages" :id="messageDate.id"
            v-for=" messageDate, key of forDateMessages.value?.filter(v => v != undefined && v != null)" :key="key">

            <div class="warking min">
                <p>{{ messageDate.date }}</p>
            </div>
            <MessagesComponent v-for="message, key of messageDate.messages" :key="key" :message="message"
                :is-group="chatInfo.value?.isGroup" />

        </div>

    </div>


    <div ref="foot" class="footer-chat">
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2v20M2 12h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
        <div>


        </div>
        <textarea v-model="message">

        </textarea>
        <button @click="sendMessage()">
            <img :src="require('@/assets/icons/sender.png')" alt="send">

        </button>
    </div>
</template>
<script lang="ts">
import { Icontact } from '@/interfaces/interface.bot.contact';
import { messagesState, socket, disconnecteSocket, connectSocket } from '@/socket';
import MessagesComponent from '@/components/Messages.vue'
import { defineComponent, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import getChats from '@/services/get.chats';
import { useCookies } from 'vue3-cookies';
import { Imessage } from '@/interfaces/interface.bot.message';
import { parse, compareAsc } from 'date-fns';
import { config } from '@/botConfig';
import router from '@/route';



export default defineComponent({

    name: "ChatPageDetails",
    components: {
        MessagesComponent,

    },
    data(): { message?: string } {
        return {

            message: undefined
        }
    },

mounted() {

        const observer = new IntersectionObserver((entry) => {
            const [object] = entry
            if (object.isIntersecting) {
                alert('nya')
                setTimeout(async () => {

                    await this.searchMessage()
                    if (this.$refs.nowRef) {

                        (this.$refs.nowRef as Element).scrollIntoView({
                            behavior: 'smooth'
                        })

                    }
                }, 3000)

            }
        },{
            root:null,
            threshold: 0.1
        });

        if (this.loadRef != undefined) {

            observer.observe(this.loadRef)
           
            socket.on('msg.now', (data: { id: string, payload: string }) => {

                const contact: Icontact = JSON.parse(data.payload)
                if (!contact) {
                    return
                }
                if (contact.id == this.$route.params.id) {
                    socket.emit('messageConfig', { read: true, id: this.$route.params.id })
                    this.scrollToBottom()
                }
            })

        }


    },

    methods: {



        sendMessage() {
            if (!this.message || this.message.length < 1) {
                return
            }
            socket.emit('sendText', { phone: this.$route.params.id, text: this.message })
            this.message = ''
            this.scrollToBottom()

        }
    },
    setup() {
        const Cookies = useCookies()

        const { cookies } = Cookies



        const forDateMessages = reactive<{ value?: Array<{ date: string, messages: Imessage[], id: string }> }>({ value: [] })

        const loadRef = ref<Element | undefined>(undefined);
        const showRef = ref(true);
        const inviRef = ref(false)
        const nowRef = ref<Element | undefined>(undefined)









        const route = useRoute()
        const chatInfo = reactive<{ value: Icontact | undefined }>({ value: undefined });

        function setChatInfo(info: Icontact, botId: string) {
            if (info.msgs && info.msgs.length < 1) {


                getChats(cookies.get('token'), info._id, botId, 10).then(response => {
                    if (response) {
                        info.msgs = response
                    }
                }).catch(() => router.push(`/chat/${route.params.botId}/`))



            }
            chatInfo.value = info
            clearForDate()
            organize()


        }

        function updateChatInfo(id: string | string[]) {


            const bot = messagesState.messages.find(value => value.botId == route.params.botId)
            if (bot) {
                const chat = bot.contacts.find(value => value.id == route.params.id)
                if (chat) {

                    setChatInfo(chat, bot.botId)
                }
            } else {

                router.push(`/chat/${route.params.botId}/`)
            }

        }

        function scrollToBottom() {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }

        watch(
            () => route.params.id,
            (newId) => {

                if (newId && typeof newId == 'string') {

                    updateChatInfo(newId)

                }
            },
            { immediate: true, deep: true }
        );

        watch(
            () => chatInfo,
            () => {
                showRef.value = true
                clearForDate()
                organize()



            },
            { immediate: true, deep: true }
        );


        function sortByDate(a: Imessage, b: Imessage) {

            const dateA = parse(a.date || new Date().toString(), 'dd/MM/yyyy HH:mm:ss', new Date());
            const dateB = parse(b.date || new Date().toString(), 'dd/MM/yyyy HH:mm:ss', new Date());
            return compareAsc(dateA, dateB);


        }
        function removeRepite() {
            if (chatInfo && chatInfo.value && chatInfo.value.msgs) {
                chatInfo.value.msgs.sort(sortByDate).filter((item, index, array) => array[index] == item)

            }
        }
        function clearForDate() {
            forDateMessages.value = []
        }
        function organize() {

            removeRepite()

            if (chatInfo && chatInfo.value && chatInfo.value.msgs) {
                chatInfo.value.msgs.forEach(value => {

                    if (forDateMessages.value) {
                        const exists = forDateMessages.value.find(item => {
                            const formatDate = value.date?.split(' ')[0]

                            return formatDate == item.date
                        })
                        if (exists) {
                            const existMessage = exists.messages.find(msg => msg == value)
                            if (!existMessage) {
                                exists.messages.push(value)

                            }
                            exists.messages.filter((item, index, array) => array[index] == item)
                            exists.messages.sort(sortByDate)
                        } else {
                            if (value.date) {
                                const chatData: {
                                    date: string,
                                    messages: Imessage[]
                                    id: string
                                } = {
                                    date: value.date?.split(" ")[0],
                                    messages: [value],
                                    id: Math.random().toString(32).replace('0.', 'div')
                                }
                                forDateMessages.value.push(chatData)

                            }
                        }
                        forDateMessages.value.filter((item, index, array) => array[index] == item)
                    }




                })
            }
            if (forDateMessages.value) {
                forDateMessages.value.sort((a, b) => {
                    const dateA = parse(a.date || new Date().toString(), 'dd/MM/yyyy', new Date());
                    const dateB = parse(b.date || new Date().toString(), 'dd/MM/yyyy', new Date());
                    return compareAsc(dateA, dateB);
                })
                console.log(forDateMessages)

            }
        }




        async function searchMessage() {

            if (chatInfo.value?._id) {
                const botInfo = config.bots.find(value => value.botId == route.params.botId)
                const existsId = botInfo?.messagesInfo.find(value => value.id == chatInfo.value?._id)

                const pastMessages = await getChats(cookies.get('token'), chatInfo.value?._id, route.params.botId.toString(), 10, existsId?.page || 2)

                if (pastMessages && pastMessages.length > 0) {
                    if (existsId) {
                        existsId.page += 1
                    }

                    botInfo?.messagesInfo.push({ id: chatInfo.value._id, page: 3 })

                    pastMessages.forEach(value => {
                        clearForDate()
                        chatInfo.value?.msgs?.push(value)
                    })

                } else {

                    showRef.value = false
                }
            } else {
                console.log('gangplank')
            }





        }


        return {
            chatInfo,
            forDateMessages,
            setChatInfo,
            scrollToBottom,
            updateChatInfo,
            searchMessage,
            loadRef,
            showRef,
            inviRef,
            nowRef,
        };
    }
}


)
</script>
<style scoped>
* {
    color: var(--font-color);

}

.warking {
    margin: auto;
    background-color: #0000003d;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    width: 50%;
}

.min {
    width: 20%;
}

.emojiModal {
    width: 200px;
    height: 300px;
    display: flex;
}

.header-chat,
.footer-chat {
    width: 80%;
    background-color: var(--component-color);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
    position: fixed;
    z-index: 999 !important;
}

h2 {
    font-size: 16px;
}

.footer-chat {

    bottom: 0;
    justify-content: space-between;
}

.footer-chat textarea {
    background-color: var(--modal-color);
    resize: none;
    width: 90%;
    height: 40px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px;

}

.footer-chat button {
    width: 40px;
    border-radius: 10px;
    display: flex;
    border: none;
    align-items: center;
    justify-content: center;
    background-color: var(--component-two-color);
    box-sizing: border-box;
    padding: 5px;
    cursor: pointer;
    transition: 0.5s linear;
}

.footer-chat button:hover {
    background-color: var(--component-color);
}

.footer-chat button img {
    width: 100%;
    transition: 0.5s linear;
}

.footer-chat button:hover img {
    transform: scale(1.1);
    filter: invert(100%);
}

.header-chat img {
    width: 50px;
    border: 2px solid var(--component-two-color);
    box-sizing: border-box;
    border-radius: 100%;
    margin-right: 10px;

}

.section-chat {



    box-sizing: border-box;
    padding: 10px;
    padding-bottom: 100px;
    padding-top: 100px;
    position: relative;
    min-height: 100vh;

}

.section-chat::after {
    content: " ";
    position: absolute;
    top: 0;
    height: 100%;
    width: 99%;
    background-image: url('../../public/background.png');
    background-attachment: fixed;
    background-size: cover;
    z-index: -1;
    background-position: center;
    filter: opacity(0.1);
}

.control {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    width: 10%;
    height: 50px;
    align-items: center;
    justify-content: space-around;
}

.control a {
    width: 30%;
    border: none;
}

.control button {
    width: 30%;
    background-color: var(--component-color);
    border: none;
}

.control a img {
    border: none;
    width: 100%;
}

.control a,
.control button {
    box-sizing: border-box;
    padding: 5px;
    border-radius: 5px;
    transition: 1s linear;
}

.control a:hover,
.control button:hover {
    cursor: pointer;
    background-color: var(--component-two-color);
}

.dark .control a img {
    filter: invert(100%);
}

.load-messages {
    margin: auto;
    width: 50px;
    position: relative;
    margin-bottom: 100px;

}

.load-messages span {

    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    height: 10px;
    margin: auto;
    margin: 4px;
    border-radius: 10px;



}

.load-messages span::after {
    content: " ";
    height: 10px;
    width: 10px;
    border-radius: 100%;
    display: block;
    background-color: var(--component-two-color);
}

.load-messages span:nth-child(1) {

    animation: rotate 1s infinite;
}

.load-messages span:nth-child(2) {

    animation: rotate 1.1s infinite;
}

.load-messages span:nth-child(3) {

    animation: rotate 1.2s infinite;
}

.load-messages span:nth-child(4) {

    animation: rotate 1.3s infinite;
}

.load-messages span:nth-child(5) {

    animation: rotate 1.4s infinite;
}

.load-messages span:nth-child(6) {

    animation: rotate 1.5s infinite;
}

.load-messages span:nth-child(7) {

    animation: rotate 1.6s infinite;
}

.load-messages span:nth-child(8) {

    animation: rotate 0.7s infinite;
}

.load-messages span:nth-child(9) {

    animation: rotate 0.8s infinite;
}

.load-messages span:nth-child(10) {

    animation: rotate 0.9s infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {

        transform: rotate(360deg);
    }
}

@media screen and (max-width: 768px) {

    .section-chat {
        width: 100%;
        background-color: var(--main-color);
        height: 100%;
        margin: 0;
        box-sizing: border-box;
        padding-top: 70px;
        padding-bottom: 50px;
    }

    .header-chat,
    .footer-chat {
        width: 100%;
    }
}
</style>