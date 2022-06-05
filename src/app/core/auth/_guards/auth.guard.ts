import { KeycloakService } from './../../../keycloack-service/keycloak.service';
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { SharedDataService } from '../../../../app/views/pages/shared/shared-data.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
	data: string;
	token;
	constructor(
		private  router: Router,
		private keycloakService: KeycloakService,
		private dbService: NgxIndexedDBService,
		private sharedDataService: SharedDataService,
		) {
			// this.sharedDataService.loginstatus.subscribe(data => {
			// 	console.log('dataa::::: ', data);
			// 	this.token = data;
			// });
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		console.log('this.auth.loggedIn()', this.loggedIn());
		 if (this.loggedIn()) {
		   return true;
		 } else {
		   this.router.navigateByUrl('/home');
		   return false;
		 }
	   }
	 
	   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		 return this.canActivate(route, state);
	   }


	// canActivate(next: ActivatedRouteSnapshot,
	// 			state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
	// 	var auth = localStorage.getItem("token");

	// 	if (!auth) {
	// 		console.log("user has not been authenticated");
	// 		// console.log("auth status data: ",auth);
	// 		// this.router.navigate(['auth/login']);
	// 		this.router.navigate(['/home']);
	// 		return false;
	// 	} else {
	// 		// this.router.navigate(['/'])
	// 		console.log("user has been authenticated");
	// 		// KeycloakService.login();
    //         return true;
	// 	}

	// 	/**
	// 	 * @deprecated 
	// 	 * can be used in future.
	// 	 */
		
	// 	// this.sharedDataService.status.subscribe(data => {
	// 	// 	this.token = data;
	// 	// 	// console.log('subject data: ', this.data);
	// 	// });

	// 	// this.sharedDataService.loginstatus.subscribe(data => {
	// 	// 	// console.log('dataa::::: ', data);
	// 	// 	this.token = data;
	// 	// });

	// 	// // console.log('data::========= ', this.data);
	// 	// if (!this.token) {
	// 	// 	console.log("user has not been authenticated");
	// 	// 	// console.log("auth status data: ",auth);
	// 	// 	// this.router.navigate(['auth/login']);
	// 	// 	this.router.navigate(['home']);
	// 	// 	return false;
	// 	// } else {
	// 	// 	// this.router.navigate(['/'])
	// 	// 	console.log("user has been authenticated");
	// 	// 	// KeycloakService.login();
    //     //     return true;
	// 	// }
	// }

	loggedIn(): boolean {
		let token;
		if(localStorage.getItem("token")) {
			token = localStorage.getItem("token");
		}
		return token !== undefined;
	  }
}

