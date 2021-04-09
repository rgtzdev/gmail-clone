import { of } from "rxjs"
import { DatePipe } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { DebugElement } from "@angular/core"
import { Email } from "src/app/models/email.model"
import { EmailRowComponent } from "./email-row.component"
import { GmailService } from "src/app/services/gmail.service"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import * as emailData from "../../../../../assets/mocks/emails.json"
import { MaterialModule } from "src/app/modules/material.module"

describe('EmailRowComponent', () => {
    
    let de: DebugElement
    let component: EmailRowComponent
    let fixture: ComponentFixture<EmailRowComponent>
    let emailMock: Email
    let datePipe: DatePipe
    let serviceMock: any

    beforeEach(async () => {
        serviceMock = {
            currentEmails: () => of(emailData.messages as Email[]),
            currentFilteredEmails: () => of(emailData.messages as Email[])
        }
		await TestBed.configureTestingModule({
			imports: [
                FormsModule,
                MaterialModule,
			],
			declarations: [
                EmailRowComponent,
            ],
            providers: [
                { privide: GmailService, useValue: serviceMock }
            ]
		}).compileComponents();
    });

    beforeEach(() => {
        datePipe = new DatePipe("en") 
        fixture = TestBed.createComponent(EmailRowComponent)
        component = fixture.componentInstance;
        de = fixture.debugElement
        emailMock = new Email()
        emailMock = {
            "id": "1",
            "subject": "Hello",
            "sender": "bob.smith@gmail.com",
            "body": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia vestibulum eros, a aliquet odio fermentum et. Fusce in volutpat est, eu aliquam ante. Integer at sapien sit amet nisl venenatis ullamcorper eu sed magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a odio vitae risus dictum pellentesque in vehicula leo. Nam massa sem, pretium at lacus quis, aliquam facilisis odio. Maecenas risus purus, dapibus sed viverra a, efficitur eget leo. Integer quis magna id ante ornare euismod. Nunc aliquet arcu sit amet tincidunt feugiat. Ut et sapien ut leo blandit egestas a non arcu.</p><p>Sed finibus rhoncus nulla, eu molestie urna volutpat non. Etiam molestie faucibus nisi eget molestie. Vestibulum porta a leo a scelerisque. Mauris eget nisl sapien. Aliquam consectetur sed massa eget accumsan. Pellentesque eget arcu quam. Vivamus feugiat lacinia laoreet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis quam vitae lorem rhoncus viverra vel et dolor. Sed pharetra cursus risus sit amet accumsan.</p>",
            "tags": [
                "work"
            ],
            "date": "2017-03-05T03:25:43.511Z"
        }
        component.email = emailMock
        fixture.detectChanges();
    })

    it("should have email", () => {
        expect(component.email).toBeTruthy()
    })

    it('should render email sender', (() => {
        expect(
            de.nativeElement
                .querySelector('.email-container .sender')
                .textContent
        ).toContain(emailMock.sender)
    }))

    it('should render email subject', (() => {
        expect(
            de.nativeElement
                .querySelector('.email-container .content-preview .title')
                .textContent
        ).toContain(emailMock.subject)
    }))

    it('should render email content', (() => {
        expect(
            de.nativeElement
                .querySelector('.email-container .content-preview .content')
                .textContent
        ).toContain(emailMock.body.replace(/<[^>]*>/g, ''))
    }))

    it('should render email date as format MMM d', (() => {
        expect(
            de.nativeElement
                .querySelector('.email-container .date')
                .textContent
        ).toContain(datePipe.transform(emailMock.date, "MMM d"))
    }))

    it('should toggle archive', (() => {
        expect(component.email.archived).toBeFalsy()
        const button = de.nativeElement.querySelector('#toggleArchive')
        button.click()
        expect(component.email.archived).toEqual(true)
    }))

    it('should toggle snooze', (() => {
        expect(component.email.snoozed).toBeFalsy()
        const button = de.nativeElement.querySelector('#toggleSnoozed')
        button.click()
        expect(component.email.snoozed).toEqual(true)
    }))

    it('should toggle read', (() => {
        expect(component.email.read).toBeFalsy()
        const button = de.nativeElement.querySelector('#toggleRead')
        button.click()
        expect(component.email.read).toEqual(true)
    }))

    it('should toggle delete', (() => {
        expect(component.email.deleted).toBeFalsy()
        const button = de.nativeElement.querySelector('#toggleDelete')
        button.click()
        expect(component.email.deleted).toEqual(true)
    }))

    it('should toggle star', (() => {
        expect(component.email.star).toBeFalsy()
        const button = de.nativeElement.querySelector('.email-container .star')
        button.click()
        expect(component.email.star).toEqual(true)
        
    }))

    it('should toggle checked', (() => {
        expect(component.email.star).toBeFalsy()
        const button = de.nativeElement.querySelector('.email-container .star')
        button.click()
        expect(component.email.star).toEqual(true)
    }))
})