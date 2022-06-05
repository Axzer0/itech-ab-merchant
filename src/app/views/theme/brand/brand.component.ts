// Angular
import { AfterViewInit, Component, OnInit } from '@angular/core';
// Layout
import { LayoutConfigService, ToggleOptions } from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { EnvironmentImgConfigService } from '../../pages/shared/environment-img-config.service';
import { MatSelectChange } from '@angular/material/select';

interface AccountDetails {
	value: string;
	viewValue: string;
	icons;
  }

@Component({
	selector: 'kt-brand',
	templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit, AfterViewInit {
	displayIcon = 'show_chart';
	selectedValue = 'Accounts';
	sideDropdown: AccountDetails[] = [
		{value: 'Accounts', viewValue: 'Accounts', icons: 'show_chart'},
		{value: 'MBC Saving', viewValue: 'MBC Saving', icons: 'event_note'},
		{value: 'MBC Cheque', viewValue: 'MBC Cheque', icons: 'card_giftcard'},
		{value: 'MBC Loan 1', viewValue: 'MBC Loan 1', icons: 'account_balance'},
		{value: 'MBC Loan 2', viewValue: 'MBC Loan 2', icons: 'account_balance'},
	  ];

	
	// Public properties
	headerLogo: string;
	headerStickyLogo: string;

	toggleOptions: ToggleOptions = {
		target: 'body',
		targetState: 'kt-aside--minimize',
		togglerState: 'kt-aside__brand-aside-toggler--active'
	};

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param htmlClassService: HtmlClassService
	 */
	userName: string;
	userProfile: string;
	constructor(
		private layoutConfigService: LayoutConfigService,
		public htmlClassService: HtmlClassService,
		private environmentImgConfigService: EnvironmentImgConfigService,
		) {
			this.userName = localStorage.getItem('fullName');
			this.headerLogo = this.layoutConfigService.getLogo();
		}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.userName = localStorage.getItem('fullName');
		this.headerLogo = this.layoutConfigService.getLogo();
		this.headerStickyLogo = this.layoutConfigService.getStickyLogo();
	}

	getUserName() {
		return this.userName = localStorage.getItem('fullName');
	}
	getDefaultUserImage() {
		if(!localStorage.getItem('profile') || localStorage.getItem('profile') === 'http://103.198.9.159:8090/customerapi/api/v1/file/') {
			return this.environmentImgConfigService.getUserDefaultAvatar();
		} else {
			return this.userProfile = localStorage.getItem('profile');
		}
	}
	
	getRespectiveIcons(event: MatSelectChange) {
		if(event.value === 'Accounts') {
			this.displayIcon = 'show_chart';
			this.selectedValue = 'Accounts';
		} else if(event.value === 'MBC Saving') {
			this.displayIcon = 'event_note';
			this.selectedValue = 'MBC Saving';
		} else if(event.value === 'MBC Cheque') {
			this.displayIcon = 'card_giftcard';
			this.selectedValue = 'MBC Cheque';
		}else if(event.value === 'MBC Loan 1') {
			this.displayIcon = 'account_balance';
			this.selectedValue = 'MBC Loan 1';
		}else if(event.value === 'MBC Loan 2') {
			this.displayIcon = 'account_balance';
			this.selectedValue = 'MBC Loan 2';
		} else {
			this.displayIcon = 'show_chart';
			this.selectedValue = 'Accounts';
		}
	}
	
	/**
	 * On after view init
	 */
	ngAfterViewInit(): void {
	}
}
