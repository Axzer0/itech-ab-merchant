import { HttpClientModule } from '@angular/common/http';
// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from "../shared/shared.module";
import {MatPaginatorModule, MatTableModule} from "@angular/material";
import {ChartistModule} from "ng-chartist";
import {ChartsModule} from "ng2-charts";

@NgModule({
	imports: [
		MatTableModule,
		CommonModule,
		HttpClientModule,
		MatPaginatorModule,
		PartialsModule,
		ChartsModule,
		MatCardModule,
		MatButtonModule,
		ChartistModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]),
	],
	providers: [],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
