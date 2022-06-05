import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {PageSetupAddComponent} from './page-setup-add/page-setup-add.component';
import {PageSetupRoutingModule} from "./page-setup-routing.module";
import { PaymentGatewayListComponent } from './payment-gateway-list/payment-gateway-list.component';
import { PaymentGatewayPreviewComponent } from './payment-gateway-preview/payment-gateway-preview.component';
import {ExtendedModule, FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
	declarations: [PageSetupAddComponent, PaymentGatewayListComponent, PaymentGatewayPreviewComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatInputModule,
        PageSetupRoutingModule,
        ExtendedModule,
        FlexLayoutModule
    ]
})
export class PageSetupModule {
}
