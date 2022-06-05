import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageSetupAddComponent} from "./page-setup-add/page-setup-add.component";
import {PaymentGatewayListComponent} from "./payment-gateway-list/payment-gateway-list.component";
import {PaymentGatewayPreviewComponent} from "./payment-gateway-preview/payment-gateway-preview.component";

const routes: Routes = [
	{path: 'setup', component: PageSetupAddComponent},
	{path: 'list', component: PaymentGatewayListComponent},
	{path: 'preview', component: PaymentGatewayPreviewComponent},
	{path: 'setup/:id', component: PageSetupAddComponent},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PageSetupRoutingModule {
}
