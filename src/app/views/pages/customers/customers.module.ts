import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import {CustomersRoutingModule} from "./customers-routing.module";
import {CustomersListComponent} from "./customers-list/customers-list.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
	declarations: [CustomersListComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatInputModule,
        CustomersRoutingModule,
        FlexLayoutModule
    ]
})
export class CustomersModule { }
