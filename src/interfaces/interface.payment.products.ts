export interface Iproduct {
    days:number,
    name:string,
    price:number,
    rules
    : {
        maxAttendants:number
        maxBots:number
        sizeOfCsv:number
        maxGroups:number
    },
    _id:string
}