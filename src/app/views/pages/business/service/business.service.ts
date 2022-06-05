
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {GenericApiService} from '../../../../core/auth/_services/generic.service';
import { AuthNoticeService } from "../../../../core/auth";
import { config } from '../../../../../app/app.config';

@Injectable({
	providedIn: 'root'
})

export class BusinessService extends GenericApiService<any> {
	arrayData;

	constructor(
		_http: HttpClient,
		protected router: Router,
		protected authNoticeService: AuthNoticeService) {
		super(_http, '', router, authNoticeService);
	}


	businessAuthenticate(data, orderId, transactionId): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
			})};
		return this.http.post<any>(config.serverMainApiUrl.concat('merchant/123213/initiateAuthentication/order/' + orderId + '/transaction/' + transactionId), data, {observe: 'response'})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	getDetails(merchantId, orderId, sessionId): Observable<any> {
		console.log('path',config.serverMainApiUrl.concat('merchant/page/' + merchantId + '/order/' + orderId), sessionId);
		return this.http.post<any>(config.serverMainApiUrl.concat('merchant/page/' + merchantId + '/order/' + orderId), sessionId, {headers: this.getHttpHeaders()})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	payerInfo(data): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat('merchant/paymentGateway/customer'), data,{headers: this.getHttpHeaders()})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	redirectUrl(): Observable<any> {
		return this.http.get<any>('http://d228b9465dff.ngrok.io/innovative/api/v1/merchant/redirect-test')
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	processing(merchant,order,txn,data): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat(`merchant/${merchant}/initiateAuthentication/order/${order}/transaction/${txn}`), data,{headers: this.getHttpHeaders()})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}


}
