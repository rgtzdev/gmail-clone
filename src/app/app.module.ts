import { NgModule } from '@angular/core';
import { SafePipe } from './pipes/safe.pipe';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/gmail/header/header.component';
import { GmailLayoutComponent } from './layouts/gmail/gmail.layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/gmail/sidebar/sidebar.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SidebarComponent,
		GmailLayoutComponent
	],
	imports: [
		FormsModule,
		BrowserModule,
		CommonModule,
		MaterialModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule
	],
	providers: [],
	entryComponents: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
