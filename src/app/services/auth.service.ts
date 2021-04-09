import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Account } from "../models/account.model";
import * as accountData from '../../assets/mocks/accounts.json'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    private accounts: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(
        JSON.parse(
            JSON.stringify(
                accountData.accounts
            )
        ) as Account[]
    )
    public currentAccounts = this.accounts.asObservable()
    
    private account: BehaviorSubject<Account> = new BehaviorSubject<Account>(
        this.getAccountByIndex(0)
    )
    public currentAccount = this.account.asObservable()
    
    getCurrentAccount() {
        return this.account.value
    }

    setCurrentAccount(account: Account) {
        this.account.next(account)
    }

    getAccounts() {
        return this.accounts.value
    }

    setAccounts(accounts: Account[]) {
        this.accounts.next(accounts)
    }

    getAccountByIndex(index: number) {
        if(index < this.accounts.value.length) {
            this.accounts.value[index]
        } else {
            return null
        }
    }
}