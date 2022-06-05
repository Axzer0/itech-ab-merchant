// Angular
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule,
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
	MatTableModule,
	MatTabsModule,
	MatTooltipModule,
} from '@angular/material';
// NgBootstrap
import {NgbDropdownModule, NgbTabsetModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
// Perfect Scrollbar
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// Core module
import {CoreModule} from '../../core/core.module';
// CRUD Partials
import {
	ActionNotificationComponent,
	AlertComponent,
	DeleteEntityDialogComponent,
	FetchEntityDialogComponent,
	UpdateStatusDialogComponent,
} from './content/crud';
// Layout partials
import {
	NotificationComponent,
	QuickPanelComponent,
	ScrollTopComponent,
	SearchResultComponent,
	SplashScreenComponent,
	Subheader1Component,
	Subheader2Component,
	Subheader3Component,
	SubheaderSearchComponent,
	UserProfileComponent,
} from './layout';
// General
import {PortletModule} from './content/general/portlet/portlet.module';
// Errpr
import {ErrorComponent} from './content/general/error/error.component';
// Extra module
// SVG inline
import {InlineSVGModule} from 'ng-inline-svg';

@NgModule({
	declarations: [
		ScrollTopComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		AlertComponent,

		// topbar components
		QuickPanelComponent,
		ScrollTopComponent,
		SearchResultComponent,
		SplashScreenComponent,
		Subheader1Component,
		Subheader2Component,
		Subheader3Component,
		SubheaderSearchComponent,
		NotificationComponent,

		UserProfileComponent,
		ErrorComponent,
	],
	exports: [
		PortletModule,
		ScrollTopComponent,
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
		AlertComponent,

		// topbar components
		QuickPanelComponent,
		ScrollTopComponent,
		SearchResultComponent,
		SplashScreenComponent,
		Subheader1Component,
		Subheader2Component,
		Subheader3Component,
		SubheaderSearchComponent,
		NotificationComponent,
		UserProfileComponent,
		ErrorComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		PerfectScrollbarModule,
		InlineSVGModule,
		CoreModule,
		PortletModule,

		// angular material modules
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
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,

		// ng-bootstrap modules
		NgbDropdownModule,
		NgbTabsetModule,
		NgbTooltipModule,
	],
})
export class PartialsModule {
}
