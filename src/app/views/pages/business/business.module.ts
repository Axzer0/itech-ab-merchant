import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCardModule } from '@angular/material';
import {MastercardsessionComponent} from './mastercardsession/mastercardsession.component';
import {BusinessRoutingModule} from './business-routing.module';
import {FormsModule} from '@angular/forms';
import { ProcessComponent } from './process/process.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@NgModule({
	declarations: [MastercardsessionComponent, ProcessComponent],
	imports: [
		CommonModule,
		MatIconModule,
		MatListModule,
		MatToolbarModule,
		MatSidenavModule,
		MatButtonModule,
		MatCardModule,
		BusinessRoutingModule,
		FormsModule,
		MatProgressSpinnerModule
	]
})
export class BusinessModule { }
