import {StartFreeProceedModule} from './views/pages/start-free-proceed/start-free-proceed.module';

import {AccountsModule} from './views/pages/accounts/accounts.module';
import {HomeModule} from './views/pages/home/home.module'
// Angular
import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
// Components
import {BaseComponent} from './views/theme/base/base.component';
import {ErrorPageComponent} from './views/theme/content/error-page/error-page.component';
// Auth
import {AuthGuard} from './core/auth';

const routes: Routes = [
		{
		path: 'business',
		loadChildren: () => import('app/views/pages/business/business.module').then(m => m.BusinessModule),
	},
	{
		path: 'application',
		loadChildren: () => import('app/views/pages/start-free-proceed/start-free-proceed.module').then(m => m.StartFreeProceedModule),
	},
	{path: 'home', loadChildren: () => import('app/views/pages/home/home.module').then(m => m.HomeModule)},
	{path: 'auth', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule)},
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
			},


			{
				path: 'payment',
				loadChildren: () => import('app/views/pages/payment/payments.module').then(m => m.PaymentsModule),
			},

			{
				path: 'payment/form',
				loadChildren: () => import('app/views/pages/merchant-page-setup/page-setup.module').then(m => m.PageSetupModule),
			},

			{
				path: 'myapp',
				loadChildren: () => import('app/views/pages/my-apps-credential/my-apps-credential.module').then(m => m.MyAppsCredentialModule),
			},

			{
				path: 'settlement',
				loadChildren: () => import('app/views/pages/Balances/balances.module').then(m => m.BalancesModule),
			},
			{
				path: 'customers',
				loadChildren: () => import('app/views/pages/customers/customers.module').then(m => m.CustomersModule),
			},
			{
				path: 'accounts',
				loadChildren: () => import('app/views/pages/accounts/accounts.module').then(m => m.AccountsModule),
			},

			{
				path: 'payments',
				loadChildren: () => import('app/views/pages/payments/payment.module').then(m => m.PaymentModule),
			},
			{
				path: 'merchant',
				canActivate: [AuthGuard],
				loadChildren: () => import('app/views/pages/profile-details/profile-details.module').then(m => m.ProfileDetailsModule),
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator',
				},
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
		],
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
