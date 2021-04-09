import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private app_service: AppService) {
		if(window.innerWidth < 990 || this.app_service.isMobile()) {
			this.app_service.sidebarOpen.next(false)
		}
	}
}
