import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Account } from "../models/account.model";
import * as emailData from '../../assets/mocks/emails.json';
import * as accountData from '../../assets/mocks/accounts.json'
import { Email } from "../models/email.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    private accounts: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>(
        JSON.parse(
            JSON.stringify(
                accountData.accounts.map(account => ({
                    ... account,
                    emails: JSON.parse(
                        JSON.stringify(
                            emailData.messages
                        )
                    ) as Email[]
                }))
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
            return this.accounts.value[index]
        } else {
            return null
        }
    }
}