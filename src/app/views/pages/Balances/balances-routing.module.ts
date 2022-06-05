import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BalancesListComponent} from "./balances-list/balances-list.component";
import {CreateSettlementComponent} from "./create-settlement/create-settlement.component";
import { SettlementPreviewComponent } from './settlement-preview/settlement-preview.component';
import {SettlementUpdateComponent} from "./settlement-update/settlement-update.component";
const routes: Routes = [
	{path: 'list', component: BalancesListComponent},
	{path: ':report/all', component: BalancesListComponent},
	{path: 'create', component: CreateSettlementComponent},
	{path: 'view/:id', component: SettlementPreviewComponent},
	{path: 'edit/:id', component: SettlementUpdateComponent},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class BalancesRoutingModule { }
