
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

export class DashboardService extends GenericApiService<any> {
	arrayData;

	constructor(
		http: HttpClient,
		protected router: Router,
		protected authNoticeService: AuthNoticeService) {
		super(http, '', router, authNoticeService);
	}

	getPaymentList(data): Observable<any> {
		return this.http.get<any>(config.serverMainApiUrl.concat(config.API_MERCHANT_PAYMENT_LIST), {params: data})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	dashboardData(val?): Observable<any> {
		let v = ''
		if (val){
			v = '?period='+val;
		}
		return this.http.get<any>(config.serverMainApiUrl.concat(config.API_MERCHANT_DASHBOARD + v), {headers: this.getHttpHeaders()})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}



}
