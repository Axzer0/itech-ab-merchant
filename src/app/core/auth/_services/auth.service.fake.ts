import { Router } from '@angular/router';
import { GenericApiService } from './generic.service';
import { environment } from '../../../../environments/environment';
// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
// Lodash

// Environment




import { config } from '../../../app.config';
import { AuthNoticeService } from '../auth-notice/auth-notice.service';



@Injectable()
export class AuthService extends GenericApiService<any>{
    constructor(protected http: HttpClient,
                protected authNoticeService: AuthNoticeService,
                protected router: Router) {
                super(http, '', router, authNoticeService);
    }

    // Authentication/Authorization
    // username: string, password: string
    login(data): Observable<any> {
        // if (!username || !password) {
		// 	return of(null);
        // }

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/x-www-form-urlencoded'
			})};
		const body = new URLSearchParams();
        body.set('username', data.username);
		body.set('password', data.password);
		body.set('client_secret', environment.clientSecret);
		body.set('grant_type', 'password');
		body.set('client_id', environment.resource);
		return this.http.post<any>(config.serveMainAuthApiUrl.concat(config.login_api), body.toString(), httpOptions)
			.pipe(
			catchError((error) => this.handleError(error))
        );
    }

    getProfileData(): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        return this.http.get<any>(config.serverMainApiUrl.concat(config.profile), { headers: httpHeaders, observe: 'response'})
			.pipe(
			catchError((error) => this.handleError(error))
        );
    }

    // login(username: string, password: string): Observable<User> {
    //     if (!username || !password) {
    //         return of(null);
    //     }
	// 	return this.http.post<any>(LOGIN_API, {username , password})
	// 		.pipe(
	// 			catchError((error) => this.handleError(error))
	// 		);

    //     return  this.getAllUsers().pipe(
    //         map((result: User[]) => {
    //             if (result.length <= 0) {
    //                 return null;
    //             }

    //             const user = find(result, (item: User) => {
    //                 return (item.username.toLowerCase() === username.toLowerCase() && item.password === password);
    //             });

    //             if (!user) {
    //                 return null;
    //             }

    //             user.password = undefined;
    //             return user;
    //         })
    //     );

    // }

    register(user): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
        httpHeaders.set('Access-Control-Allow-Origin', '*');

        return this.http.post<any>(config.serverMainApiUrl.concat(config.sign_up_api), user, { headers: httpHeaders })
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    requestPassword(email): Observable<any> {
        return this.http.post<any>(config.serverMainApiUrl.concat(config.forgot_password), email, {observe: 'response'});
        // .pipe(
        //     map((users: User[]) => {
        //         if (users.length <= 0) {
        //             return null;
        //         }
        //         return user;
        //     }),
        //     catchError(this.handleError('forgot-password', []))
        // );
    }

    // getUserByToken(): Observable<User> {
    //     const userToken = localStorage.getItem(environment.authTokenKey);
    //     if (!userToken) {
    //         return of(null);
    //     }

    //     return this.getAllUsers().pipe(
    //         map((result: User[]) => {
    //             if (result.length <= 0) {
    //                 return null;
    //             }

    //             const user = find(result, (item: User) => {
    //                 return (item.accessToken === userToken.toString());
    //             });

    //             if (!user) {
    //                 return null;
    //             }

    //             user.password = undefined;
    //             return user;
    //         })
    //     );
    // }


    // private handleError<T>(operation = 'operation', result?: any) {
    //     return (error: any): Observable<any> => {
    //         // TODO: send the error to remote logging infrastructure
    //         console.error(error); // log to console instead

    //         // Let the app keep running by returning an empty result.
    //         return of(result);
    //     };
    // }
}
