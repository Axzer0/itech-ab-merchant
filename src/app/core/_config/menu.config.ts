// import { Store } from '@ngrx/store';
// import { AppState } from '../reducers';
// import { Logout } from '../auth';
// import { Router } from '@angular/router';

// import { NgxIndexedDBService } from 'ngx-indexed-db';
// import { Compiler } from '@angular/core';

// import { NgxIndexedDBService } from 'ngx-indexed-db';

export class MenuConfig {
	// constructor (
	// 	private dbService: NgxIndexedDBService,
	// 	private _compiler: Compiler
	// ) {}
	public defaults: any = {
		header: {
			self: {},
			items: []
		},
		aside: {
			self: {},
			items: [
				// {section: 'Menus'},
				{
					title: 'Home',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/home',
					bullet: 'dot',
					method: () => {
					},
				},
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-dashboard',
					page: '/dashboard',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
					method: () => {
					},
				},
				// {
				// 	title: 'My Payments',
				// 	root: true,
				// 	icon: 'flaticon-coins',
				// 	page: '/payment/list',
				// 	// page: '/info/kyc-fillup',
				// 	// page: '/dashboard',
				// 	translate: 'MENU.DASHBOARD',
				// 	bullet: 'dot',
				// 	method: this.updateKyc,
				// },

				{
					title: 'Payments',
					root: true,
					icon: 'flaticon-file',
					page: '/payment/list',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
					method: this.updateKyc,
				},
				{
					title: 'Refund',
					root: true,
					icon: 'flaticon-file',
					page: '/payment/refund',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
					method: this.updateKyc,
				},
				{
					title: 'Settlement',
					root: true,
					icon: 'flaticon2-layers',
					page: '/settlement/list',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
					method: this.updateKyc,
				},
				// {
				// 	title: 'Customers',
				// 	root: true,
				// 	icon: 'flaticon2-user',
				// 	page: '/customers/list',
				// 	// translate: 'MENU.DASHBOARD',
				// 	bullet: 'dot',
				// 	method: this.updateKyc,
				// },
				{
					title: 'Payment Gateway Form',
					root: true,
					icon: 'flaticon2-arrow-1',
					page: '/payment/form/list',
				},

				{
					title: 'My Apps & Credential',
					root: true,
					icon: 'flaticon2-layers',
					page: '/myapp/credential/list',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
					method: this.updateKyc,
				},

				{
					title: 'Reports',
					bullet: 'dot',
					icon: 'flaticon-file',
					submenu: [
						{
							title: 'Payments',
							bullet: 'dot',
							page: '/payment/report',
						},

						{
							title: 'Settlement',
							bullet: 'dot',
							page: '/settlement/report/all',
						},
					]
				},

				// {
				// 	title: 'Reports',
				// 	root: true,
				// 	icon: 'flaticon2-layers',
				// 	page: '/customers/list',
				// 	translate: 'MENU.DASHBOARD',
				// 	bullet: 'dot',
				// 	method: this.updateKyc,
				// },
				// {
				// 	title: 'Refunds',
				// 	root: true,
				// 	icon: 'flaticon2-layers',
				// 	page: '/customers/list',
				// 	translate: 'MENU.DASHBOARD',
				// 	bullet: 'dot',
				// 	method: this.updateKyc,
				// },
				{
					title: 'My Profile',
					root: true,
					icon: 'flaticon2-layers',
					page: '/merchant/profile',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
					method: this.updateKyc,
				},


				/**
				 * below unused side menu are commented and may be uncomment if needed
				 */


				{
					title: 'Logout',
					root: true,
					icon: 'flaticon-logout',
					page: '/home',
					// translate: 'MENU.DASHBOARD',
					bullet: 'dot',
					method: this.logout
				},

			]
		},
	};

	/**
	 * Log out
	 */
	logout() {
		console.log('clicked logout');
		// this.sharedDataService.setLoginstatus('logout');
		// localStorage.setItem('logout', 'true');
		 localStorage.clear();
		// localStorage.removeItem('exist');
		// localStorage.removeItem('token');
		// localStorage.removeItem('refresh-token');
		// localStorage.removeItem('user');
		// localStorage.removeItem('customerId');
		// localStorage.removeItem('status');
		// localStorage.removeItem('profile');
		// localStorage.removeItem('fullName');
		// localStorage.removeItem('cardNo');
		// localStorage.removeItem('uid');

		indexedDB.deleteDatabase('mode');
	}

	/**
	 * @UpdateKyc
	 */

	updateKyc() {
		localStorage.setItem('updateKyc', 'true');
	}

	public get configs(): any {
		return this.defaults;
	}
}
