import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { authRoutes } from "../routes/auth.routes";
import { LoginComponent } from "../pages/login/login.component";

@NgModule({
    declarations: [LoginComponent],
    imports: [
        RouterModule.forChild(authRoutes)
    ]
})
export class AuthModule { }