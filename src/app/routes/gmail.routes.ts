import { Routes } from "@angular/router";
import { GmailComponent } from "../pages/gmail/gmail.component";
import { AlwaysOnGuardService } from "../services/alwaysonguard.service";

export const GmailRoutes: Routes = [
    { 
        path: 'u/:id',
        canActivate: [AlwaysOnGuardService],
        component: GmailComponent
    }
]