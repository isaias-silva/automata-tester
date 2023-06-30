export default interface Imenu {
    text: string,
    footer: string
    templateButtons:
    { index: number, quickReplyButton: { displayText: string, id: string } }[],

    headerType: 1

}