export interface IEmailContent {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: any | string
}