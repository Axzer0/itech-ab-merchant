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

export class PageSetupService extends GenericApiService<any> {
	arrayData;

	constructor(
		http: HttpClient,
		protected router: Router,
		protected authNoticeService: AuthNoticeService) {
		super(http, '', router, authNoticeService);
	}

	public getHttpParms(pagination): HttpParams{
		let params = new HttpParams();
		params = params.append('pageSize', pagination.pageSize);
		params = params.append('pageNumber', pagination.pageNumber);
		params.keys().forEach((key) => {
			const value = params.get(key);
			if (value === null || value === undefined || value === '') {
				params['map'].delete(key);
			}
		});
		return  params;
	}

	addPageSetup(data): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat(config.API_PAGE_SETUP_ADD), data, {observe: 'response'})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	updatePageSetup(data, id): Observable<any> {
		return this.http.put<any>(config.serverMainApiUrl.concat(config.API_PAGE_SETUP_UPDATE + id), data, {observe: 'response'})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	updatePageSetupDisplay(id,data): Observable<any> {
		return this.http.put<any>(config.serverMainApiUrl.concat(config.API_PAGE_SETUP_DISPLAY_UPDATE + '/' + id), data,{
			headers: new HttpHeaders(),
			observe: 'response',
			withCredentials: false
		})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}


	getPreviewSetupById(data): Observable<any> {
		return this.http.get<any>(config.serverMainApiUrl.concat(config.API_PAGE_SETUP_PREVIEW + '/' + data), {observe: 'response'})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	paymentGatewayList(filter): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat(config.API_PAYMENT_GATEWAY_LIST), filter,{observe: 'response'})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	appCredentialList(filter): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat(config.API_APP_CREDENTIAL_LIST), filter)
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	updateCredential(data): Observable<any> {
		return this.http.put<any>(config.serverMainApiUrl.concat(config.API_PAYMENT_GATEWAY_UPDATE_CREDENTIAL), data,{
			headers: new HttpHeaders(),
			observe: 'response',
			withCredentials: false
		})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	getHttpHeaders(): HttpHeaders {
		let headers = new HttpHeaders();
		headers = headers.set('Content-Type', 'application/json');
		headers = headers.set('Accept', 'application/json');
		return headers;
	}


}
