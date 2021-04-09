import { Subscription } from "rxjs";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { AppService } from "src/app/services/app.service";
import { FilterType } from "src/app/enums/filter-type.enum";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { GmailService } from "src/app/services/gmail.service";

@AutoUnsubscribe()
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    public inboxNotRead: number = 0
    public currentSelectedMenuOption: string = 'INBOX'

    public sidebarOpen: boolean = true
    private subSideBarOpen: Subscription

    constructor(
        private app_service: AppService,
        private gmail_service: GmailService
    ) { }

    ngOnInit() {
        this.subSideBarOpen = this.app_service
            .sidebarOpen
            .subscribe(so => {
                this.sidebarOpen = so
            })
        this.inboxNotRead = this.gmail_service
            .getInboxNotReadAmount()
    }
    
    ngOnDestroy() {}

    clickOnMenu(option: string) {
        this.currentSelectedMenuOption = option
        switch (this.currentSelectedMenuOption) {
            case 'INBOX':
                this.gmail_service.filterBy(null)
                break;
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
        }
    }
}