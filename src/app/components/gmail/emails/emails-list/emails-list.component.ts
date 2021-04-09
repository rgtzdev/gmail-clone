import { Email } from "src/app/models/email.model";
import { Component, Input, OnInit } from "@angular/core";
import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
    selector: 'app-emails-list',
    templateUrl: './emails-list.component.html',
    styleUrls: ['./emails-list.component.scss']
})
export class EmailsListComponent implements OnInit {

    @Input('emails')
    public emails: Email[]

    ngOnInit() { }

    drop(event: CdkDragDrop<any[]>) {
        if (event.previousContainer !== event.container) {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

}