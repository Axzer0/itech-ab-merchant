import { SharedComponentService } from './../../../../views/pages/shared/shared-component.service';
import { Router } from '@angular/router';
// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpXsrfTokenExtractor, HttpHeaders, HttpClient } from '@angular/common/http';
// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { SharedDataService } from '../../../../../app/views/pages/shared/shared-data.service';
import { config } from '../../../../../app/app.config';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	public data;
	private isRefreshing = false;
  	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	constructor(
		private tokenExtractor: HttpXsrfTokenExtractor,
		private cookieService: CookieService,
		private dbService: NgxIndexedDBService,
		private sharedDataService: SharedDataService,
		// private sharedComponentService: SharedComponentService,
		private httpClient: HttpClient,
		private router: Router
	) {}

	parseJwt(token) {
		// console.log("token", token)
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
		  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	};

	// setValue(data) {
	// 	this.data = data;
	// 	console.log('setting value: ', data);
	// }

	// getValue() {
	// 	// console.log('getting value: ', this.data);
	// 	return this.data;
	// }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const url = req.url;
		// const Login_Url = 'auth/realms/agency-banking-customer-test/protocol/openid-connect/token';
		// const Register_Url = 'users/add/customer';
		// console.log('this.getJwtToken(): ', this.getJwtToken());
		const jwtToken= localStorage.getItem('token');

		// console.log('check either expired or not: ', this.sharedDataService.isExpired(jwtToken));
		// if (this.sharedDataService.isExpired(jwtToken)) {
		// 	this.logoutUser(jwtToken);
		// 	return;
		// }

		if(localStorage.getItem('token') != null || localStorage.getItem('token') != undefined) {
			// this.sharedDataService.isExpired(jwtToken);
			var parsedToken = this.parseJwt(localStorage.getItem('token'));
			// this.time = parsedToken.iat;
			var currentDate = Date.now()
			var current = (currentDate) / 1000;
			var date = JSON.stringify(current).slice(0, 10);
			// var date=new Date().toJSON().slice(0,10).replace(/-/g,'/');
			// var current =(Date.parse(currentDate)) /1000;
			var timeDiff = Number(parsedToken.exp) - Number(date);
			// console.log("parse: ",parsedToken.exp,"current: ",date, "timediff: ",timeDiff)

			// let exp = parsedToken.exp;
			// console.log('expppppppp time::: ', exp);
			let timeDifference = (parsedToken.exp - parsedToken.iat);
			// let currentTime = Math.floor(+new Date()/1000);
			// let refreshToken = currentTime + timeDifference/2
			// console.log('refreshToken time:: ', refreshToken);

			let halfTime = timeDifference / 2;
			if (!this.isRefreshing && (timeDiff < halfTime && timeDiff > 0)) {
			console.log('is refreshing');
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);
				// this.refreshToken(localStorage.getItem('refresh_token')).subscribe(
				// 	res => {
				// 	console.log('calling jwt refresh token', res);
				// 	this.isRefreshing = false;
				// 	this.refreshTokenSubject.next(res.data.token);
				// 	localStorage.setItem('auth', res.data.token);
				// 	}
				// );
			}

			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${jwtToken}`
				}
			});
		}

		if(this.sharedDataService.isExpired(jwtToken)) {
			this.router.navigate(['/home']);
		}

			/**
			 * @deprecated
			 * can use and implemented in the future.
			 */
		// if(localStorage.getItem('exist') === 'true') {
			// this.dbService.getByKey('banking', 1).then(
			// 	(banking: any) => {
			// 		this.data = banking.name;
			// 		this.sharedDataService.setLoginstatus(banking.name);
			// 	}, error => {
			// 		console.log('error whiel getting the banking database token:: ', error);
			// 	}
			// );

			// this.sharedDataService.status.subscribe(data => {
			// 	this.data = data;
			// });
			// this.sharedDataService.loginstatus.subscribe(data => {
			// 	this.data = data;
			// });

			// req = req.clone({
			// 	setHeaders: {
			// 		Authorization: `Bearer ${this.data}`
			// 	}
			// });
		// }

		return next.handle(req);
	}


	/**
	 * @deprecated
	 * To test the HttpXsrfToken
	 */

	// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

	// 	let requestMethod: string = req.method;
	// 	requestMethod = requestMethod.toLowerCase();
	// 	const url = req.url;
	// 	if (requestMethod && (requestMethod === 'post' || requestMethod === 'delete' || requestMethod === 'put' || requestMethod === 'get')) {
	// 		const headerName = 'X-XSRF-TOKEN';
	// 		// const cookie = this.cookieService.get('access_token');
	// 		const cookie = this.cookieService.get('XSRF-TOKEN');
	// 		console.log('getting cookie and token using the HtttpXsTokenExtractor::::::: ', cookie);
	// 	  let token = this.tokenExtractor.getToken() as string;
	// 	  console.log('getting token using the token extractor::: ', token);
	// 	  if(!url.includes('auth/realms' || 'users/add')) {
	// 		req = req.clone({
	// 			headers: new HttpHeaders({
	// 				// 				Authorization: `Bearer ${localStorage.getItem('token')}`
	// 			//   'XSRF-TOKEN': cookie,
	// 			'Authorization': `Bearer ${cookie}`

	// 			}),
	// 			  withCredentials: true
	// 		  });
	// 	  }
	// 	//   if (token !== null && !req.headers.has(headerName)) {
	// 	// 	req = req.clone({headers: req.headers.set(headerName, `Bearer ${cookie}`)});
	// 	//   }
	// 	}

	// 	return next.handle(req);
	//   }



// 	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// 		const cookie = this.cookieService.get('XSRF-TOKEN');
// 		console.log('getting cookie and token using the HtttpXsTokenExtractor::::::: ', cookie);
// 		console.log('token extractor::: ', this.tokenExtractor.getToken());
// 		const url = request.url;
// 		if(!url.includes('auth/realms')) {
// 			request = request.clone({
// 				headers: new HttpHeaders({
// 					// 				Authorization: `Bearer ${localStorage.getItem('token')}`
// 				//   'XSRF-TOKEN': cookie,
// 				'Authorization': `Bearer ${cookie}`

// 				}),
// 				  withCredentials: true
// 			  });
// 		}
// 	   return next.handle(request);
//    }


	// intercept request and add token
	// intercept(
	// 	request: HttpRequest<any>,
	// 	next: HttpHandler
	// ): Observable<HttpEvent<any>> {
	// 	// tslint:disable-next-line:no-debugger
	// 	// modify request
	// 	if(localStorage.getItem('token')) {
	// 		request = request.clone({
	// 			setHeaders: {
	// 				Authorization: `Bearer ${localStorage.getItem('token')}`
	// 			}
	// 		});
	// 	}
	// 	// console.log('----request----');
	// 	// console.log(request);
	// 	// console.log('--- end of request---');

	// 	return next.handle(request).pipe(
	// 		tap(
	// 			event => {
	// 				 if (event instanceof HttpResponse) {
	// 					// console.log('all looks good');
	// 					// http response status code
	// 					// console.log(event.status);
	// 				}
	// 			},
	// 			error => {
	// 				// http response status code
	// 				// console.log('----response----');
	// 				// console.error('status code:');
	// 				// tslint:disable-next-line:no-debugger
	// 				console.log('error:: ', error);
	// 				console.error(error.status);
	// 				console.error(error.message);
	// 				// console.log('--- end of response---');
	// 			}
	// 		)
	// 	);
	// }

	// refreshToken(refresh_token: string): Observable<any> {
	// 	const httpOptions = {
	// 	  headers: new HttpHeaders({
	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	  })
	// 	};
	// 	const body = new URLSearchParams();
	// 	body.set('grant_type', 'refresh_token');
	// 	body.set('refresh_token', refresh_token);
	// 	return this.httpClient.post<any>(config.serveMainAuthApiUrl.concat(config.login_api), body.toString(), httpOptions)
	//   }
}
