import { TransactionSummaryComponent } from './transaction-summary/transaction-summary.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanRequestComponent } from './loan-request/loan-request.component';


const routes: Routes = [
  {
    path: '', component: AccountsComponent
  },
  {
    path: 'account-summary', component: AccountSummaryComponent
  },
  {
    path: 'loan-request', component: LoanRequestComponent
  },
  {
    path: 'account', component: AccountsComponent
  },
  {
    path: 'transaction-summary', component: TransactionSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
