import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
import { PaymentManagementComponent } from './payment-management/payment-management.component';

import {MatTabsModule} from '@angular/material/tabs';
import { MatListModule, MatGridListModule } from '@angular/material';

@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentSummaryComponent,
    PaymentManagementComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatListModule,
    SharedModule,
    MatGridListModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
