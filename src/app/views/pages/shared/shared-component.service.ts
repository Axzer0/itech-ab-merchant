import { GenericApiService } from './../../../core/auth/_services/generic.service';
import { config } from './../../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AuthNoticeService } from "../../../core/auth";
import { Router } from '@angular/router';
import { DistrictDropdown } from '../shared-model/district-dropdown.model';
import { StateDropdown } from '../shared-model/state-dropdown.model';
import { CityDropdown } from '../shared-model/city-dropdown.model';
import { EducationDropdown } from '../shared-model/education-dropdown.model';
import { CountryDropdown } from '../shared-model/country-dropdown.model';
import { Transactions } from '../accounts/model/transactions.model';
import { TransactionList } from '../accounts/model/transaction-list.model';
import {IndustryDropdown} from "../shared-model/industry-dropdown.model";

@Injectable({
  providedIn: 'root'
})
export class SharedComponentService extends GenericApiService<any> {

  constructor(
    protected httpClient: HttpClient,
    protected router: Router,
    protected authNoticeService: AuthNoticeService,
    ) {
    super(httpClient, '', router, authNoticeService);
    }

    getCounryDropdown() {
      return this.httpClient.get<CountryDropdown>(config.serverMainApiUrl.concat(config.country_dropdown_list), {observe: 'response'})
			.pipe(
			catchError((error) => this.handleError(error))
    );
    }

	getIndustryDropdown() {
		return this.httpClient.get<IndustryDropdown>(config.serverMainApiUrl.concat(config.industry_dropdown_list), {observe: 'response'})
			.pipe(
				catchError((error) => this.handleError(error))
			);
	}

  getStateDropdown(id) {
    return this.httpClient.get<StateDropdown>(config.serverMainApiUrl.concat(config.state_dropdown_list + '/', id), {observe: 'response'})
			.pipe(
			catchError((error) => this.handleError(error))
    );
  }

  getDistrictDropdown(data) {
    return this.httpClient.post<DistrictDropdown>(config.serverMainApiUrl.concat(config.district_dropdown_list), data, {observe: 'response'})
			.pipe(
			catchError((error) => this.handleError(error))
    );
  }

  getCityDropdown(data) {
    return this.httpClient.post<CityDropdown>(config.serverMainApiUrl.concat(config.city_dropdown_list), data, {observe: 'response'})
			.pipe(
			catchError((error) => this.handleError(error))
    );
  }

  getEducationDropdown() {
    return this.httpClient.get<EducationDropdown>(config.serverMainApiUrl.concat(config.education_dropdown_list), {headers: this.getHttpHeaders(), observe: 'response'})
			.pipe(
			catchError((error) => this.handleError(error))
    );
  }

  getHttpHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return headers;
  }

  getTransactionList(data) {
    return this.httpClient.post<TransactionList>(config.serverMainApiUrl.concat(config.transaction_list), data, {headers: this.getHttpHeaders(), observe: 'response'})
			.pipe(
			catchError((error) => this.handleError(error))
    );
  }

}
