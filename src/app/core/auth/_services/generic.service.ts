import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { AuthNoticeService } from '../auth-notice/auth-notice.service';
import { SharedDataService } from '../../../../app/views/pages/shared/shared-data.service';
// import { NgxIndexedDBService } from 'ngx-indexed-db';
// import { Compiler } from '@angular/core';

export class GenericApiService<T> {
	url: string;
	loading = false;
	constructor(
		protected http: HttpClient,
		protected config: string,
		protected router: Router,
		protected authNoticeService: AuthNoticeService,
		// private dbService: NgxIndexedDBService,
		// private _compiler: Compiler
		) {
	}

	/**
	 * Get the common HttpHeaders
	 */
	public getHttpHeaders(): HttpHeaders {
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json;');

		return headers;
	}

	public handleError(error: any) {
		this.loading = false;
		console.log('error:::: ', error);
		if (error.error.code == 701) {
			// localStorage.clear();
			localStorage.removeItem('exist');
			localStorage.removeItem('token');
			localStorage.setItem('loggedIn', 'false');
			localStorage.removeItem('refresh-token');
			localStorage.removeItem('user');
			localStorage.removeItem('customerId');
			localStorage.removeItem('status');
			localStorage.removeItem('profile');
			localStorage.removeItem('fullName');
			localStorage.removeItem('cardNo');
			localStorage.removeItem('uid');

			indexedDB.deleteDatabase('mode');
			// window.location.reload(true);
			// this._compiler.clearCache();
			// this.dbService.deleteDatabase().then(
			// 	() => {

			// 		console.log('Database deleted successfully');
			// 	},
			// 	error => {
			// 		console.log('error while deleting the database', error);
			// 	}
			// );
			this.router.navigate(['auth/login']);
			return EMPTY;
		}

		if (error.status === 401) {
			SharedDataService.setLoginData(false);
			this.loading = false;
			if (error.error.error === 'invalid_grant')
			this.router.navigate(['/auth/login']);
			localStorage.removeItem('exist');
			localStorage.removeItem('token');
			localStorage.setItem('loggedIn', 'false');
			localStorage.removeItem('refresh-token');
			localStorage.removeItem('user');
			localStorage.removeItem('customerId');
			localStorage.removeItem('status');
			localStorage.removeItem('profile');
			localStorage.removeItem('fullName');
			localStorage.removeItem('cardNo');
			localStorage.removeItem('uid');
			// console.log(error.error.error_description);
			this.authNoticeService.setNotice(error.error.error_description, 'danger');
			this.loading = false;
			console.log('unauthorized', error.error.error);
		} else if (error.status == 403) {

			// GenericApiService.notificationService.smartMessageBox(
			//   {
			//     title:
			//       ` <span class="" style=" font-size: 26px;"><i class="fa fa-times-circle text-danger "></i> Permission Denied</span>`,
			//     content:
			//       `<span >You don't have sufficient permission.</span>`,
			//     buttons: "[Close]"
			//   },
			//   ButtonPressed => {
			//     if (ButtonPressed == "Close") {
			//
			//       GenericApiService.loadingService.display(false);
			//     }
			//   }
			// );

			return EMPTY;


		} else {
			return throwError(error);
		}

	}

	public getuploadFileHeaders(): HttpHeaders {
		let headers = new HttpHeaders();
		// headers = headers.set('enctype', 'multipart/form-data');
		// headers = headers.append('Content-Type', 'multipart/form-data');
		// headers = headers.set('Accept', 'application/json');
		return headers;
	}


}
