import { reactive } from "vue";

export const config = reactive<{bots:{botId: string, messagesInfo: { id: number, page: number }[]}[]}>({bots:[]})
