
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {GenericApiService} from "../../../../core/auth/_services/generic.service";
import {AuthNoticeService} from "../../../../core/auth";
import {config} from "../../../../app.config";

@Injectable({
	providedIn: 'root'
})

export class MyAppCredentialService extends GenericApiService<any> {
	arrayData;

	constructor(
		http: HttpClient,
		protected router: Router,
		protected authNoticeService: AuthNoticeService) {
		super(http, '', router, authNoticeService);
	}

	generateCredential(data): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat(config.API_GENERATE_CREDENTIAL), data, {headers: this.getHttpHeaders()})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}


}
