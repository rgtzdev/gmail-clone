import { Subscription } from "rxjs";
import { Email } from "src/app/models/email.model";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { AppService } from "src/app/services/app.service";
import { MatPaginator } from "@angular/material/paginator";
import { GmailService } from "src/app/services/gmail.service";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FilterType } from "src/app/enums/filter-type.enum";

@AutoUnsubscribe()
@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

    public pageSize: number = 50

    public filteredEmails: Email[]
    public showAdvancedOptions: boolean = false
    public selectCheckbox: boolean = false
    
    @ViewChild(MatPaginator, {static: true})
    public paginator: MatPaginator

    private subCurrentFilteredEmails: Subscription

    constructor(
        private app_service: AppService,
        private gmail_service: GmailService,
    ) { }

    ngOnInit() {
        this.paginator._intl.itemsPerPageLabel = ""
        this.subCurrentFilteredEmails = this.gmail_service
            .currentFilteredEmails
            .subscribe(cfe => {
                this.filteredEmails = cfe
                this.showAdvancedOptions = this.filteredEmails
                    .every(fe => !fe.checked)
            })
    }

    paginatorEventHandler(event) {}

    allCheckChanges(event) {
        this.toggleChecked(event.checked)
    }

    toggleChecked(val: boolean) {
        this.filteredEmails
            .forEach(email => { 
                email.checked = val 
            })
        this.gmail_service
            .setFilteredEmails(
                this.filteredEmails
            )
    }

    selectAllRead() {
        this.filteredEmails
            .forEach(email => { 
                email.checked = email.read
            })
        this.gmail_service
            .setFilteredEmails(
                this.filteredEmails
            )
    }

    selectAllUnread() {
        this.filteredEmails
            .forEach(email => {
                email.checked = !email.read
            })
        this.gmail_service
            .setFilteredEmails(
                this.filteredEmails
            )
    }

    selectAllStarred() {
        this.filteredEmails
            .forEach(email => {
                email.checked = email.star
            })
        this.gmail_service
            .setFilteredEmails(
                this.filteredEmails
            )
    }

    selectAllUnstarred() {
        this.filteredEmails
            .forEach(email => {
                email.checked = !email.star
            })
        this.gmail_service
            .setFilteredEmails(
                this.filteredEmails
            )
    }
    
    toggleSelected(typeF: string) {
        let tempSelectedFilter = null
        switch(typeF) {
            case FilterType.ARCHIVED :
                this.filteredEmails
                    .forEach(email => {
                        email.archived = email.checked ? 
                            true : email.archived
                    })
                tempSelectedFilter = FilterType.ARCHIVED
                break;
            case FilterType.READ :
                this.filteredEmails
                    .forEach(email => {
                        email.read = email.checked ? 
                            true : email.read
                    })
                tempSelectedFilter = FilterType.READ
                break;
            case FilterType.SNOOZED :
                this.filteredEmails
                    .forEach(email => {
                        email.snoozed = email.checked ? 
                            true : email.snoozed
                    })
                tempSelectedFilter = FilterType.SNOOZED
                break;
            case FilterType.DELETED :
                this.filteredEmails
                    .forEach(email => {
                        email.deleted = email.checked ? 
                            true : email.deleted
                    })
                tempSelectedFilter = FilterType.DELETED
                break;
            case FilterType.STARRED :
                this.filteredEmails
                    .forEach(email => {
                        email.star = email.checked ? 
                            true : email.star
                    })
                tempSelectedFilter = FilterType.STARRED
                break;
            case FilterType.SPAM :
                this.filteredEmails
                    .forEach(email => {
                        email.spam = email.checked ? 
                            true : email.spam
                    })
                tempSelectedFilter = FilterType.SPAM
                break;
        }
        this.gmail_service
            .currentFilter
            .next(tempSelectedFilter)
        this.gmail_service
            .setFilteredEmails(
                this.filteredEmails
            )
        this.gmail_service.filterBy(null)
    }

    ngOnDestroy() { }
}