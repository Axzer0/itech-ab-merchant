import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileDetailsRoutingModule} from './profile-details-routing.module';
import {ProfileDetailsComponent} from './profile-details.component';
import {MatInputModule, MatButtonModule, MatCheckboxModule, MatStepperModule} from '@angular/material';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SharedModule} from "../shared/shared.module";


@NgModule({
	declarations: [
		ProfileDetailsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		ReactiveFormsModule,
		MatCheckboxModule,
		MatInputModule,
		MatButtonModule,
		ProfileDetailsRoutingModule
	]
})
export class ProfileDetailsModule {
}
