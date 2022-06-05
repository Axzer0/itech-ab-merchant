import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaymentListComponent} from "./payment-list/payment-list.component";
import {PaymentPreviewComponent} from "./payment-preview/payment-preview.component";
import {RefundListComponent} from "./refund-list/refund-list.component";

const routes: Routes = [
	{path: 'list', component: PaymentListComponent},
	{path: 'refund', component: RefundListComponent},
	{path: ':report', component: PaymentListComponent},
	{path: 'view/:id', component: PaymentPreviewComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PaymentsRoutingModule { }
