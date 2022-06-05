import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LOGIN_API} from '../../../../api-config';
import {catchError} from 'rxjs/operators';
import {GenericApiService} from '../../../../core/auth/_services/generic.service';
import { AuthNoticeService } from "../../../../core/auth";
import { config } from '../../../../../app/app.config';

@Injectable({
	providedIn: 'root'
})
export class AuthService extends GenericApiService<any> {
	arrayData;

	constructor(
		_http: HttpClient,
		protected router: Router,
		protected authNoticeService: AuthNoticeService) {
		super(_http, '', router, authNoticeService);
	}

	// lOGIN
	login(data): Observable<any> {
		return this.http.post<any>(LOGIN_API, data)
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	getOTPVerificationCode(data) {
		return this.http.post<any>(config.serverMainApiUrl + config.get_verification_code, data)
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	verificationDevice(data) {
		return this.http.post<any>(config.serverMainApiUrl + config.verify_mobile, data)
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}
}
