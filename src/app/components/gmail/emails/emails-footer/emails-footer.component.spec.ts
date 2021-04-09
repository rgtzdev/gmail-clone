import { DebugElement } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { MaterialModule } from "src/app/modules/material.module"
import { EmailsFooterComponent } from "./emails-footer.component"

describe("EmailsFooterComponent", () => {

    let de: DebugElement
    let component: EmailsFooterComponent
    let fixture: ComponentFixture<EmailsFooterComponent>
    
    beforeEach(async()=> {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
            ],
            declarations: [
                EmailsFooterComponent
            ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(EmailsFooterComponent)
        component = fixture.componentInstance;
        de = fixture.debugElement
        fixture.detectChanges();
    })

	it('should create emails footer list', () => {
		expect(component).toBeTruthy();
    });
})