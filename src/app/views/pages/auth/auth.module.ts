import {MatSelectModule} from '@angular/material';
// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Material
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
// Translate
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// CRUD
import { InterceptService } from '../../../core/_base/crud/';
// Module components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
// Auth
import { AuthEffects, AuthGuard, authReducer, AuthService } from '../../../core/auth';
import { OptValidationComponent } from './opt-validation/opt-validation.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EmailPasscodeComponent } from './email-passcode/email-passcode.component';
import {SharedModule} from "../shared/shared.module";
import {MatStepperModule} from '@angular/material/stepper';


const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent,
				data: {returnUrl: window.location.pathname}
			},
			{
				path: 'register',
				component: RegisterComponent
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordComponent,
			},
			{
				path: 'otp-verification',
				canActivate: [AuthGuard],
				component: OptValidationComponent,
			},
			// {
			// 	path: 'email/otp/passcode',
			// 	component: EmailPasscodeComponent,
			// }
		]
	}
];


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterModule.forChild(routes),
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatTooltipModule,
		MatCheckboxModule,
		MatSelectModule,
		MatStepperModule,
		TranslateModule.forChild(),
		StoreModule.forFeature('auth', authReducer),
		EffectsModule.forFeature([AuthEffects])
	],
	providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
	],
	exports: [AuthComponent],
	declarations: [
		AuthComponent,
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		AuthNoticeComponent,
		OptValidationComponent,
		EmailPasscodeComponent
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				AuthGuard
			]
		};
	}
}
