
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

export class SettlementService extends GenericApiService<any> {
	arrayData;

	constructor(
		http: HttpClient,
		protected router: Router,
		protected authNoticeService: AuthNoticeService) {
		super(http, '', router, authNoticeService);
	}

	status(): Observable<any> {
		return this.http.get<any>(config.serverMainApiUrl.concat(config.API_DROPDOWN_SETTLEMENT_STATUS))
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	settlementList(data): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat(config.API_MERCHANT_SETTLEMENT_LIST), data, {headers: this.getHttpHeaders()})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	approveReject(data): Observable<any> {
		return this.http.get<any>(config.serverMainApiUrl.concat(config.API_MERCHANT_PAYMENT_LIST), {params: data})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	settlementCreate(data): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat(config.API_SETTLEMENT_CREATE), data,{headers: this.getHttpHeaders()})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	previewSettlement(data): Observable<any> {
		return this.http.get<any>(config.serverMainApiUrl.concat(config.API_SETTLEMENT_CREATE + '/' + data), {observe: 'response'})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	updateSettlement(id,val): Observable<any> {
		return this.http.put<any>(config.serverMainApiUrl.concat(config.API_SETTLEMENT_CREATE + '/' + id),val, {observe: 'response'})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

}
