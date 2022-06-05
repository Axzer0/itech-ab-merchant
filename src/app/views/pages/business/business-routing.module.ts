
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MastercardsessionComponent} from "./mastercardsession/mastercardsession.component";
import {ProcessComponent} from "./process/process.component";


const routes: Routes = [
	{
		path: '', component: MastercardsessionComponent
	},
	{
		path: 'payment/checkout', component: MastercardsessionComponent
	},
	{
		path: 'payment/process', component: ProcessComponent
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BusinessRoutingModule { }
