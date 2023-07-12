

export interface Imessage {
    _id:number,
    text?: string | null,
    type?: 'text' | 'warking' | 'image' | 'sticker' | 'video' | 'audio' | 'doc' | 'quoted'
    name?: string | null
    number?: string
    media?: { data: string | null, type?: any, mimetype?: string | null }
    picture?: string | null
    isMe?: boolean
    quoted?: boolean
    read?: boolean
    msgQuoted?: Imessage | null
    msgObject?: any
    date?:string
}