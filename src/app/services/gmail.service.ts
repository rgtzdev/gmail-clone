import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Email } from "../models/email.model";
import { FilterType } from "../enums/filter-type.enum";
import * as emailData from '../../assets/mocks/emails.json'

@Injectable({
    providedIn: 'root'
})
export class GmailService { 

    private emails: BehaviorSubject<Email[]> = new BehaviorSubject<Email[]>(
        JSON.parse(
            JSON.stringify(
                emailData.messages
            )
        ) as Email[]
    )
    public currentEmails = this.emails.asObservable()

    private filteredEmails: BehaviorSubject<Email[]> = new BehaviorSubject<Email[]>(JSON.parse(JSON.stringify(emailData.messages)) as Email[])
    public currentFilteredEmails = this.filteredEmails.asObservable()

    public currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0)
    public currentFilter: BehaviorSubject<FilterType> = new BehaviorSubject<FilterType>(null)

    update(email: Email) {
        const emails = this.emails.value
        let findedI = emails.findIndex(e => e.id == email.id)
        emails[findedI] = email
        this.emails.next(emails)
        if(this.currentFilter.value) {
            this.filterBy(this.currentFilter.value)
        } else {
            this.setFilteredEmails(
                this.filterWithoutArchivedOrDeleted(
                    this.emails.value
                )
            )
        }
    }

    filterBy(filter: FilterType) {
        switch(filter) {
            case FilterType.ARCHIVED :
                this.setFilteredEmails(
                    this.emails
                        .value
                        .filter(email => email.archived)
                )
                break;
            case FilterType.SNOOZED :
                this.setFilteredEmails(
                    this.emails
                        .value
                        .filter(email => email.snoozed)
                )
                break;
            case FilterType.DELETED :
                this.setFilteredEmails(
                    this.emails
                        .value
                        .filter(email => email.deleted)
                )
                break;
            case FilterType.STARRED :
                this.setFilteredEmails(
                    this.emails
                        .value
                        .filter(email => email.star)
                )
                break;
            case FilterType.WORK :
                this.setFilteredEmails(
                    this.emails
                        .value
                        .filter(email => email.tags.find(t => t == 'work'))
                )
                break;
            case FilterType.TRAVEL :
                this.setFilteredEmails(
                    this.emails
                        .value
                        .filter(email => email.tags.find(t => t == 'travel'))
                )
                break;
            case FilterType.SPAM :
                this.setFilteredEmails(
                    this.emails
                        .value
                        .filter(email => email.spam)
                )
                break;
            default:
                this.setFilteredEmails(
                    this.filterWithoutArchivedOrDeleted(
                        this.emails.value
                    )
                )
                break;
        }
        this.currentFilter.next(filter)
    }

    filterWithoutArchivedOrDeleted = (
        emails: Email[]
    ):Email[] => emails
        .filter(email => 
            !email.archived && 
            !email.deleted &&
            !email.spam
        )

    setFilteredEmails(emails: Email[]) {
        this.filteredEmails.next(emails)
    }
}