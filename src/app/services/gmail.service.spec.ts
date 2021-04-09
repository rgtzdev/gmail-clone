import { Email } from "../models/email.model"
import { GmailService } from "./gmail.service"
import { FilterType } from "../enums/filter-type.enum"
import * as emailData from "../../assets/mocks/emails.json"

describe('GmailService', () => {

    it('should update email', () => {
        let emailsMock: Array<Email>
        const service: GmailService = new GmailService()
        emailsMock = emailData.messages as Email[]
        service.setCurrentEmails(emailsMock)
        let email = { ...emailsMock[0] }
        email.subject = "this is a new subject daaah"
        expect(email.subject)
            .not
            .toContain(
                service.getCurrentEmails()[0].subject
            )
        service.update(email)
        expect(email.subject)
            .toContain(
                service
                    .getCurrentEmails()[0].subject
            )
    })

    it('should filterby archived', () => {
        let emailsMock: Array<Email>
        const service: GmailService = new GmailService()
        emailsMock = emailData.messages as Email[]
        emailsMock[0].archived = true
        emailsMock[1].archived = true
        emailsMock[2].archived = true
        service.setCurrentEmails(emailsMock)
        service.filterBy(FilterType.ARCHIVED)
        expect(
            service
                .getCurrentFilteredEmails()
                .every(email => email.archived)
        ).toBeTrue()
    })

    it('should filterby spam', () => {
        let emailsMock: Array<Email>
        const service: GmailService = new GmailService()
        emailsMock = emailData.messages as Email[]
        emailsMock[0].spam = true
        emailsMock[1].spam = true
        emailsMock[2].spam = true
        service.setCurrentEmails(emailsMock)
        service.filterBy(FilterType.SPAM)
        expect(
            service
                .getCurrentFilteredEmails()
                .every(email => email.spam)
        ).toBeTrue()
    })

    it('should filterby work tag', () => {
        let emailsMock: Array<Email>
        const service: GmailService = new GmailService()
        emailsMock = emailData.messages as Email[]
        service.setCurrentEmails(emailsMock)
        service.filterBy(FilterType.WORK)
        expect(
            service
                .getCurrentFilteredEmails()
                .every(email => email.tags.find(tag => tag == 'work'))
        ).toBeTrue()
    })

    it('should filterby travel tag', () => {
        let emailsMock: Array<Email>
        const service: GmailService = new GmailService()
        emailsMock = emailData.messages as Email[]
        service.setCurrentEmails(emailsMock)
        service.filterBy(FilterType.TRAVEL)
        expect(
            service
                .getCurrentFilteredEmails()
                .every(email => email.tags.find(tag => tag == 'travel'))
        ).toBeTrue()
    })

    it('should filterby deleted', () => {
        let emailsMock: Array<Email>
        const service: GmailService = new GmailService()
        emailsMock = emailData.messages as Email[]
        emailsMock[0].deleted = true
        emailsMock[1].deleted = true
        emailsMock[2].deleted = true
        service.setCurrentEmails(emailsMock)
        service.filterBy(FilterType.DELETED)
        expect(
            service
                .getCurrentFilteredEmails()
                .every(email => email.deleted)
        ).toBeTrue()
    })

    it("should get all except archived or deleted or spammed", () => {
        let emailsMock: Array<Email>
        const service: GmailService = new GmailService()
        emailsMock = emailData.messages as Email[]
        emailsMock[0].archived = true
        emailsMock[1].deleted = true
        emailsMock[2].spam = true
        service.setCurrentEmails(emailsMock)
        expect(
            service
                .filterWithoutArchivedOrDeleted(emailsMock)
                .length
        ).toBe(emailsMock.length - 3)
    })

    it("should get not read amount", () => {
        let emailsMock: Array<Email>
        const service: GmailService = new GmailService()
        emailsMock = emailData.messages as Email[]
        emailsMock[0].read = true
        emailsMock[1].read = true
        service.setCurrentEmails(emailsMock)
        expect(
            service
                .getInboxNotReadAmount()
        ).toBe(emailsMock.length - 2)
    })

})