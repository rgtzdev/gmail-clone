import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth/auth.layout.component';
import { GmailLayoutComponent } from './layouts/gmail/gmail.layout.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'email/u/0',
		pathMatch: 'full',
	},
	{
		path: 'email',
		component: GmailLayoutComponent,
		children: [{
			path: '',
			loadChildren: () =>
				import('./modules/gmail.module').then(m => m.GmailModule)
		}],
	},
	{
		path: 'auth',
		component: AuthLayoutComponent,
		children: [{
			path: '',
			loadChildren: () =>
				import('./modules/auth.module').then(m => m.AuthModule)
		}],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
