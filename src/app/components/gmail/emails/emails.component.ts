import { Subscription } from "rxjs";
import { Email } from "src/app/models/email.model";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { FilterType } from "src/app/enums/filter-type.enum";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { GmailService } from "src/app/services/gmail.service";

interface FilterTab {
    type: FilterType
    label: string
    icon: string
    index: number
}

@AutoUnsubscribe()
@Component({
    selector: 'app-emails',
    templateUrl: './emails.component.html',
    styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit, OnDestroy {

    public emails: Email[]
    public filteredEmails: Email[]
    public selectedIndex: string
    public tabs: FilterTab[]
    private subCurrentEmails: Subscription

    constructor(private gmail_service: GmailService) { }

    ngOnInit() {
        this.tabs = [
            { type: null,  label: "Primary", icon: "inbox", index: 0 },
            { type: FilterType.WORK,  label: "Work", icon: "work_outline", index: 1 },
            { type: FilterType.TRAVEL,  label: "Travel", icon: "send", index: 2 },
            { type: FilterType.SNOOZED,  label: "Snoozed", icon: "info", index: 3 },
            { type: FilterType.STARRED,  label: "Starred", icon: "star_outline", index: 4 },
        ]
        this.subCurrentEmails = this.gmail_service
            .currentFilteredEmails
            .subscribe(ce => {
                this.filteredEmails = ce
            })
    }

    changeSelectedIndex(event) {
        switch (this.tabs[event].type) {
            case 'ARCHIVED':
                this.gmail_service.filterBy(FilterType.ARCHIVED)
                break;
            case 'STARRED':
                this.gmail_service.filterBy(FilterType.STARRED)
                break;
            case 'SPAM':
                this.gmail_service.filterBy(FilterType.SPAM)
                break;
            case 'DELETED':
                this.gmail_service.filterBy(FilterType.DELETED)
                break;
            case 'TRAVEL':
                this.gmail_service.filterBy(FilterType.TRAVEL)
                break;
            case 'WORK':
                this.gmail_service.filterBy(FilterType.WORK)
                break;
            case 'SNOOZED':
                this.gmail_service.filterBy(FilterType.SNOOZED)
                break;
            default :
                this.gmail_service.filterBy(null)
                break;
        }
    }

    ngOnDestroy() { }
}