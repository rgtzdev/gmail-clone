import { Account } from "../models/account.model"
import { AuthService } from "./auth.service"
import * as accountsData from "../../assets/mocks/accounts.json"

describe('AuthService', () => {

    it("should change current account", () => { 
        let accountsMock: Account[]
        const service: AuthService = new AuthService()
        accountsMock = accountsData.accounts
        service.setAccounts(accountsMock)
        service.setCurrentAccount(accountsMock[2])
        expect(service.getCurrentAccount()).toEqual(accountsMock[2])
    })

    it("should get account by index", () => { 
        let accountsMock: Account[]
        const service: AuthService = new AuthService()
        accountsMock = accountsData.accounts
        service.setAccounts(accountsMock)
        const index = 2
        expect(
            service
                .getAccountByIndex(index)
        ).toEqual(accountsMock[index])
    })
})