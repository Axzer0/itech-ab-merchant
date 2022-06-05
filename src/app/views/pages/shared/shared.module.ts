import {FormValueChangeDirective} from './form-value-change.directive';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {PartialsModule} from '../../partials/partials.module';
import {TranslateModule} from '@ngx-translate/core';
import {
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule, MatDividerModule,
	MatExpansionModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSelectModule,
	MatSnackBarModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatTooltipModule
} from '@angular/material';
import {HttpUtilsService, InterceptService, LayoutUtilsService} from '../../../core/_base/crud';
import {ActionNotificationComponent} from '../../partials/content/crud';
import {GenericApproveRejectComponent} from "./components/generic-approve-reject-modal/generic-approve-reject.component";
import {GenericTableComponent} from './components/generic-table/generic-table.component';
import {PrettyPrintPipe} from "./pretty.print";
import {NumberOnlyDirective} from "./directives/number-only.directive";



@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		PartialsModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatCheckboxModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,

	],

	exports: [CommonModule,
		PrettyPrintPipe,
		HttpClientModule,
		RouterModule,
		PartialsModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatStepperModule,
		MatInputModule,
		MatTableModule,
		MatDividerModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatCheckboxModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		GenericTableComponent,
		NumberOnlyDirective,
		MatDialogModule],
	providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'kt-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		},
		HttpUtilsService,
		LayoutUtilsService
	],
	entryComponents: [
		ActionNotificationComponent,
		GenericApproveRejectComponent

	],
	declarations: [
		FormValueChangeDirective,
		GenericApproveRejectComponent,
		GenericTableComponent,
		PrettyPrintPipe,
		NumberOnlyDirective
	]
})

export class SharedModule { }
