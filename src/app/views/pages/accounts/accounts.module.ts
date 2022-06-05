import { HttpClientModule } from '@angular/common/http';
import { TransactionSummaryComponent } from './transaction-summary/transaction-summary.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatProgressBarModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTooltipModule} from '@angular/material/tooltip';
import { LoanRequestComponent } from './loan-request/loan-request.component';

@NgModule({
  declarations: [
    AccountsComponent,
    AccountSummaryComponent,
    TransactionSummaryComponent,
    LoanRequestComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTooltipModule,
    HttpClientModule,
    AccountsRoutingModule,
    MatProgressBarModule,
    MatCardModule,
  ],
  providers: [
    DatePipe,
  ],
})
export class AccountsModule { }
