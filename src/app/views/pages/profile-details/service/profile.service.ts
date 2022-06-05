import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {GenericApiService} from "../../../../core/auth/_services/generic.service";
import {AuthNoticeService} from "../../../../core/auth";
import {config} from "../../../../app.config";

@Injectable({
	providedIn: 'root'
})

export class ProfileService extends GenericApiService<any> {
	arrayData;

	constructor(
		http: HttpClient,
		protected router: Router,
		protected authNoticeService: AuthNoticeService) {
		super(http, '', router, authNoticeService);
	}



	addProfile(data): Observable<any> {
		return this.http.put<any>(config.serverMainApiUrl.concat(config.API_PROFILE_ADD), data, {observe: 'response'})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	getProfileDetails(): Observable<any> {
		return this.http.get<any>(config.serverMainApiUrl.concat(config.API_PROFILE_DETAILS), {observe: 'response'})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

}
