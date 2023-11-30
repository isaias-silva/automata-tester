export interface IBotInfo {
    _id:string,
    mode: 'sniper' | 'attendant' | 'repasse',
    type: 'WaBot' | 'TelBot'
    path?: string,
    sleep: boolean,
    userId?: string,
    flowId?: string,
    number?: Number,
    name: string,
    status:'online'|'offline',
    botCreds:{
        profile?:string,
        name?:string,
        number?:string
    }
    integrations: {
        telegram?: {
            apiKey: string,
            groupMarkeds: string[],
        },
        whatsapp?: {
            groupMarkeds: string[]
        },

        hierarchy?: {
            dominated_id: string,
        },
        observer_tools?: {
            observer: boolean,
            wellcome?: IsendMessage,
            bye?: IsendMessage
        }
    }
}

export interface IsendMessage {
    text?: string,
    data?:IdataMessage
    type: 'text' | 'audio' | 'video' | 'image' | 'doc'
}
export interface IdataMessage {
    buffer?: string,
    mimetype?: string
}