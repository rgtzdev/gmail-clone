export class Email {
    id: string
    subject: string
    sender: string
    body: string
    tags: string[]
    date: string
    star?: boolean
    archived?: boolean
    snoozed?: boolean
    read?: boolean
    deleted?: boolean
    checked?: boolean
    spam?: boolean
}