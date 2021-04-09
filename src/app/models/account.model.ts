import { Email } from "./email.model"

export class Account {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
    profilePic: string
    emails?: Email[]
}