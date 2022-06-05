import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import {BalancesListComponent} from "./balances-list/balances-list.component";
import {BalancesRoutingModule} from "./balances-routing.module";
import { CreateSettlementComponent } from './create-settlement/create-settlement.component';
import { SettlementPreviewComponent } from './settlement-preview/settlement-preview.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { SettlementUpdateComponent } from './settlement-update/settlement-update.component';

@NgModule({
	declarations: [BalancesListComponent, CreateSettlementComponent, SettlementPreviewComponent, SettlementUpdateComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatInputModule,
        BalancesRoutingModule,
        FlexLayoutModule
    ]
})
export class BalancesModule { }
