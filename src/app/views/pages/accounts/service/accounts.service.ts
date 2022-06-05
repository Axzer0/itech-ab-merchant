import { Transactions } from './../model/transactions.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../../app.config';
import { LoanRequest } from '../model/loan-request';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTransactionSummaryReport() {
    return this.httpClient.get<Transactions>(config.serverMainApiUrl.concat(config.transaction_summary_dashboard), {observe: 'response'});
  }

  getTransactionSummaryStatement(date) {
    return this.httpClient.post<any>(config.serverMainApiUrl.concat(config.transaction_summary_statement), date, {observe: 'response'});
  }

  loanRequest(data) {
    return this.httpClient.post<any>(config.serverMainApiUrl.concat(config.loan_request), data, {observe: 'response'});
  }
}
