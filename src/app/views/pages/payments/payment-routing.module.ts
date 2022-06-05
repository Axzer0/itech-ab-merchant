import { PaymentsComponent } from './payments/payments.component';
import { PaymentManagementComponent } from './payment-management/payment-management.component';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: PaymentsComponent
  },
  {
    path: 'payment-management', component: PaymentManagementComponent
  },
  {
    path: 'payment-summary', component: PaymentSummaryComponent
  },
  {
    path: 'payment', component: PaymentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
