import { Subscription } from "rxjs";
import { MatDrawer } from "@angular/material/sidenav";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { AppService } from "src/app/services/app.service";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

@AutoUnsubscribe()
@Component({
    templateUrl: './gmail.layout.component.html',
    styleUrls: ['./gmail.layout.component.scss']
})
export class GmailLayoutComponent implements OnInit, OnDestroy {

    public mode: string = 'side'
    public sidebarOpen: boolean = true
    private subSideBarOpen: Subscription

	@ViewChild('drawer', { static: true }) 
	public drawer: MatDrawer

    constructor(
        private app_service: AppService
    ) {}

    ngOnInit() {
        this.subSideBarOpen = this.app_service
            .sidebarOpen
            .subscribe(so => {
                this.sidebarOpen = so
                this.drawer.close()
                setTimeout(() => {
                    this.drawer.open()
                }, 300)
            })
    }
    
    ngOnDestroy() {}
}