// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX

// State

import {  User } from '../../../../../core/auth';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user$: Observable<User>;
	user: string;

	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;
	verify: string;
	enrollmentStatus: string;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor() {
		this.user = localStorage.getItem('user');
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user = localStorage.getItem('fullName');
		this.verify = localStorage.getItem('verified');

		// this.user$ = this.store.pipe(select(currentUser));
	}

	getUser() {
		return this.user = localStorage.getItem('fullName');
	}
	getState() {
		return this.enrollmentStatus = localStorage.getItem('enrollmentStatus');
	}
	/**
	 * Log out
	 */

}
