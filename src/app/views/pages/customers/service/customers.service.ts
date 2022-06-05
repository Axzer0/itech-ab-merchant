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

export class CustomersService extends GenericApiService<any> {
	arrayData;

	constructor(
		http: HttpClient,
		protected router: Router,
		protected authNoticeService: AuthNoticeService) {
		super(http, '', router, authNoticeService);
	}



	customersList(filter): Observable<any> {
		return this.http.get<any>(config.serverMainApiUrl.concat(config.API_CUSTOMERS_LIST), {params: filter })
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}
}
