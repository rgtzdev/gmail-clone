import { Subscription } from "rxjs";
import { Email } from "src/app/models/email.model";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { GmailService } from "src/app/services/gmail.service";

@AutoUnsubscribe()
@Component({
    selector: 'app-emails',
    templateUrl: './emails.component.html',
    styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit, OnDestroy {

    public emails: Email[]
    public filteredEmails: Email[]

    private subCurrentEmails: Subscription

    constructor(private gmail_service: GmailService) { }

    ngOnInit() {
        this.subCurrentEmails = this.gmail_service
            .currentFilteredEmails
            .subscribe(ce => {
                this.filteredEmails = ce
            })
    }

    ngOnDestroy() { }
}