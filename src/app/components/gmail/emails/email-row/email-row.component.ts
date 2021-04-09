import { Component, Input } from "@angular/core";
import { Email } from "src/app/models/email.model";
import { AppService } from "src/app/services/app.service";
import { GmailService } from "src/app/services/gmail.service";

@Component({
    selector: 'app-email-row',
    templateUrl: './email-row.component.html',
    styleUrls: ['./email-row.component.scss']
})
export class EmailRowComponent {
    
    @Input('email')
    public email: Email

    public showBody: string
    public showDate: string
    public isMobile: boolean = false

    constructor(
        private app_service: AppService,
        private gmail_service: GmailService
    ) {
        this.isMobile = this.app_service.isMobile()
    }
    
    ngOnInit() {
        this.showBody = ' - ' + this.email.body.replace(/<[^>]*>/g, '')
    }

    toggleArchive() {
        this.email.archived = !this.email.archived
        this.gmail_service.update(this.email)
    }

    toggleDelete() {
        this.email.deleted = !this.email.deleted
        this.gmail_service.update(this.email)
    }

    selectedChanged(event) {
        this.gmail_service.update(this.email)
    }

    toggleStar() {
        this.email.star = !this.email.star
        this.gmail_service.update(this.email)
    }

    toggleSnoozed() {
        this.email.snoozed = !this.email.snoozed
        this.gmail_service.update(this.email)
    }

    toggleRead() {
        this.email.read = !this.email.read
        this.gmail_service.update(this.email)
    }

}