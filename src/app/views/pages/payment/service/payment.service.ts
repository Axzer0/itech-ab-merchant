
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

export class PaymentService extends GenericApiService<any> {
	arrayData;

	constructor(
		http: HttpClient,
		protected router: Router,
		protected authNoticeService: AuthNoticeService) {
		super(http, '', router, authNoticeService);
	}



	getPaymentList(data): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat(config.API_MERCHANT_PAYMENT_LIST), data, {headers: this.getHttpHeaders()})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	getPaymentPreview(data): Observable<any> {
		return this.http.get<any>(config.serverMainApiUrl.concat(config.API_MERCHANT_PAYMENT_PREVIEW + data))
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	refundRequest(data): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat(config.API_MERCHANT_PAYMENT_REFUND), data, {headers: this.getuploadFileHeaders()})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

	getRefundList(data): Observable<any> {
		return this.http.post<any>(config.serverMainApiUrl.concat(`${config.API_MERCHANT_REFUND_LIST}`), data, {headers: this.getHttpHeaders()})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}


}
