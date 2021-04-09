import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AlwaysOnGuardService implements CanActivate {

    constructor(
        private router: Router,
        private auth_service: AuthService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const id: number = +route.paramMap.get('id')
        if (id < this.auth_service.getAccounts().length) {
            this.auth_service
                .setCurrentAccount(
                    this.auth_service
                        .getAccounts()[id]
                )
            return true
        } else {
            this.router.navigate(['login'])
            return false
        }
    }
}