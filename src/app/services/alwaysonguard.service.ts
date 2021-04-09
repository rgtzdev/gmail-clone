import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { GmailService } from "./gmail.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AlwaysOnGuardService implements CanActivate {

    constructor(
        private router: Router,
        private auth_service: AuthService,
        private gmail_service: GmailService,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const id: number = +route.paramMap.get('id')
        if (id < this.auth_service.getAccounts().length) {
            const account = this.auth_service
                .getAccounts()[id]
            this.auth_service
                .setCurrentAccount(account)
            this.gmail_service.setCurrentEmails(account.emails)
            this.gmail_service.setFilteredEmails(account.emails)
            this.gmail_service.currentFilter.next(null)
            return true
        } else {
            this.router.navigate([
                'auth', 
                'login'
            ])
            return false
        }
    }
}