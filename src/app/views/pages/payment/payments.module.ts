import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import {PaymentListComponent} from "./payment-list/payment-list.component";
import {PaymentsRoutingModule} from "./payments-routing.module";
import { PaymentPreviewComponent } from './payment-preview/payment-preview.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {DialogPreviewComponent} from "./dialog-preview/dialog-preview.component";
import {RefundListComponent} from "./refund-list/refund-list.component";


@NgModule({
	declarations: [PaymentListComponent, PaymentPreviewComponent,DialogPreviewComponent,RefundListComponent],
	imports: [
		CommonModule,
		SharedModule,
		MatInputModule,
		PaymentsRoutingModule,
		FlexLayoutModule
	],
	entryComponents: [DialogPreviewComponent],

})
export class PaymentsModule { }
