import { DebugElement } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { By } from "@angular/platform-browser"
import { Email } from "src/app/models/email.model"
import { EmailsListComponent } from "./emails-list.component"
import { GmailService } from "src/app/services/gmail.service"
import { MaterialModule } from "src/app/modules/material.module"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import * as emailData from "../../../../../assets/mocks/emails.json"
import { EmailRowComponent } from "../email-row/email-row.component"
import { EmptyListComponent } from "../empty-list/empty-list.component"
import { EmailsFooterComponent } from "../emails-footer/emails-footer.component"

describe("EmailsListComponent", () => {

    let de: DebugElement
    let component: EmailsListComponent
    let fixture: ComponentFixture<EmailsListComponent>
    let emailsMock: Email[]
    let serviceMock: any

    beforeEach(async()=> {
        emailsMock = emailData.messages as Email[]
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MaterialModule,
            ],
            declarations: [
                EmailRowComponent,
                EmptyListComponent,
                EmailsFooterComponent,
                EmailsListComponent
            ],
            providers: [
                { privide: GmailService, useValue: serviceMock }
            ]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(EmailsListComponent)
        component = fixture.componentInstance;
        de = fixture.debugElement
        component.emails = emailsMock
        fixture.detectChanges();
    })

	it('should create emails list', () => {
		expect(component).toBeTruthy();
    });

    it('should render emails', (() => {
        expect(component.emails)
            .toBeDefined()
        expect(component.emails)
            .toEqual(emailsMock)
        expect(de.queryAll(By.css('app-email-row')).length)
            .toBe(emailsMock.length)
    }))
    
    it('should show empty component if no emails', (() => {
        component.emails = null
        fixture.detectChanges()
        expect(component.emails)
            .toBeFalsy()
        expect(de.queryAll(By.css('app-empty-list')))
            .toBeTruthy()
    }))
})