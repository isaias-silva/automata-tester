/* eslint-disable */

import { Imessage } from "./interface.bot.message"

export interface Icontact {
info: Imessage
    _id:number,
    isGroup: boolean
    name?: string | null,
    picture?: string | null,

    msgs?: Imessage[],
    id?: string | null,
    newMessages?:number
}