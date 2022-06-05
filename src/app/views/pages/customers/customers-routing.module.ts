import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomersListComponent} from "./customers-list/customers-list.component";

const routes: Routes = [
	{path: 'list', component: CustomersListComponent},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CustomersRoutingModule { }
