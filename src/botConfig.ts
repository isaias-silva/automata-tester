import { reactive } from "vue";

export const config = reactive<{ botId: string, messagesInfo: { id: number, page: number }[] }>({ botId: '', messagesInfo: [] })
