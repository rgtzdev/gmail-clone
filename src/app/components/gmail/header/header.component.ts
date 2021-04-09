import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Account } from "src/app/models/account.model";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";

@AutoUnsubscribe()
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public account: Account
    public accounts: Account[]
    public accountsDisplay: Account[]

    private subCurrentAccounts: Subscription

    constructor(
        private router: Router,
        private app_service: AppService,
        private auth_service: AuthService
    ) { }

    ngOnInit() {
        this.account = this.auth_service.getCurrentAccount()
        this.subCurrentAccounts = this.auth_service
            .currentAccounts
            .subscribe(ca => {
                this.accounts = ca 
                this.accountsDisplay = ca.filter(a => 
                    a.id != this.account.id
                )
            })
    }

    toggleMenu() {
        this.app_service
            .sidebarOpen
            .next(
                !this.app_service
                    .sidebarOpen
                    .value
            )
    }

    changeAccount(e, account: Account) {
        e.preventDefault()
        this.account = account
        this.auth_service.setCurrentAccount(account)
        this.accountsDisplay = this.accounts.filter(a => 
            a.id != this.account.id
        )
        this.router
            .navigate([
                'email',
                'u',
                this.accounts.findIndex(a => a.id == account.id)
            ])
    }

    ngOnDestroy() { }
}