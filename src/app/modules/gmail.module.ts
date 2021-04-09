import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SafePipe } from "../pipes/safe.pipe";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";
import { GmailRoutes } from "../routes/gmail.routes";
import { GmailComponent } from "../pages/gmail/gmail.component";
import { EmailComponent } from "../components/gmail/email/email.component";
import { EmailsComponent } from "../components/gmail/emails/emails.component";
import { ToolbarComponent } from "../components/gmail/toolbar/toolbar.component";
import { EmailRowComponent } from "../components/gmail/emails/email-row/email-row.component";
import { EmptyListComponent } from "../components/gmail/emails/empty-list/empty-list.component";
import { EmailsListComponent } from "../components/gmail/emails/emails-list/emails-list.component";
import { EmailsFooterComponent } from "../components/gmail/emails/emails-footer/emails-footer.component";

@NgModule({
    declarations: [
		SafePipe,
        GmailComponent,
        EmailComponent,
        EmailsComponent,
        ToolbarComponent,
        EmailRowComponent,
        EmptyListComponent,
        EmailsListComponent,
        EmailsFooterComponent,
    ],
    imports: [
        FormsModule,
		CommonModule,
        MaterialModule,
        RouterModule.forChild(GmailRoutes)
    ],
    exports: [],
    providers: []
})
export class GmailModule { }