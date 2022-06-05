import {Router} from '@angular/router';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EnvironmentImgConfigService} from '../shared/environment-img-config.service';

@Component({
	selector: 'kt-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	logo: string;
	auth = false;
	customerStatus;
	path;
	route = '/starter-up/customer/unfillup-document-message';


	constructor(
		private environmentImgConfigService: EnvironmentImgConfigService,
		private router: Router,
		private cdr: ChangeDetectorRef
	) {
	}

	ngOnInit() {
		const loggedIn: any = localStorage.getItem('loggedIn');
		this.path = this.router.url;
		console.log('outside log in ---->', loggedIn);
		if (loggedIn == 'true') {
			console.log('auth log in true---->');
			this.auth = true;
			this.cdr.detectChanges();
		} else if (loggedIn == 'false') {
			console.log('auth log in false---->');
			this.auth = false;
			this.cdr.detectChanges();
		}
		this.cdr.detectChanges();
		console.log('auth---->',this.auth);

	}

	getLogo() {
		return this.environmentImgConfigService.getLogoImage();
	}

	getCustomerStatus() {
		return this.customerStatus = localStorage.getItem('status');
	}

	logout() {
		// localStorage.clear();
		localStorage.removeItem('exist');
		localStorage.removeItem('token');
		localStorage.removeItem('refresh-token');
		localStorage.removeItem('user');
		localStorage.removeItem('customerId');
		localStorage.removeItem('status');
		localStorage.removeItem('profile');
		localStorage.removeItem('fullName');
		localStorage.removeItem('cardNo');
		localStorage.removeItem('uid');
		localStorage.removeItem('loggedIn');
		this.router.navigate(['/auth/login']);
	}


}
