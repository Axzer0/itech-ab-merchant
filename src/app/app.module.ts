// Angular
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	GestureConfig,
	MatProgressSpinnerModule,
	MAT_DATE_LOCALE,
	MAT_DATE_FORMATS,
	DateAdapter,
	MatStepperModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
// Angular in memory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// Perfect Scroll bar
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
// Env
import { environment } from '../environments/environment';
// Hammer JS
import 'hammerjs';
// NGX Permissions
import { NgxPermissionsModule } from 'ngx-permissions';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// State
import { metaReducers, reducers } from './core/reducers';
// Copmponents
import { AppComponent } from './app.component';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './views/theme/theme.module';
// Partials
import { PartialsModule } from './views/partials/partials.module';
// Layout Services
import {
	DataTableService,
	KtDialogService,
	LayoutConfigService,
	LayoutRefService,
	MenuAsideService,
	MenuConfigService,
	MenuHorizontalService,
	PageConfigService,
	SplashScreenService,
	SubheaderService
} from './core/_base/layout';
// Auth
import { AuthModule } from './views/pages/auth/auth.module';
import { AuthService } from './core/auth';
// CRUD
import { HttpUtilsService, LayoutUtilsService } from './core/_base/crud';
// Config
import { LayoutConfig } from './core/_config/layout.config';
// Highlight JS
import { HIGHLIGHT_OPTIONS, HighlightLanguage } from 'ngx-highlightjs';
import * as typescript from 'highlight.js/lib/languages/typescript';
import * as scss from 'highlight.js/lib/languages/scss';
import * as xml from 'highlight.js/lib/languages/xml';
import * as json from 'highlight.js/lib/languages/json';
import {SharedModule} from './views/pages/shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonDateFormats, COMMON_DATE_FORMATS } from './views/pages/shared/common-date-format';

import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { CookieService } from 'ngx-cookie-service';

// tslint:disable-next-line:class-name
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 0.5,
	swipeEasing: true,
	minScrollbarLength: 40,
	maxScrollbarLength: 300,
};


/**
 * currently not in used.
 * to initiate the indexDB
 */
export function migrationFactory() {
	// to be modified so a migrator for that version is not included.
	return {
	  1: (db, transaction) => {
		const store = transaction.objectStore('banking');
		store.transaction(["banking"], 'readwrite');
	  },
	};
  }

  const dbConfig: DBConfig  = {
	name: 'mode',
	version: 1,
	objectStoresMeta: [{
	  store: 'banking',
	  storeConfig: { keyPath: 'id', autoIncrement: true },
	  storeSchema: [
		{ name: 'name', keypath: 'name', options: { unique: false } }
	  ]
	}],
	// provide the migration factory to the DBConfig
	migrationFactory
  };

// const dbConfig: DBConfig  = {
// 	name: 'agency',
// 	version: 2,
// 	objectStoresMeta: [{
// 	  store: 'banking',
// 	  storeConfig: { keyPath: 'id', autoIncrement: true },
// 	  storeSchema: [
// 		{ name: 'name', keypath: 'name', options: { unique: false } }
// 	  ]
// 	}]
//   };

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
	// initialize app by loading default demo layout config
	return () => {
		if (appConfig.getConfig() === null) {
			appConfig.loadConfigs(new LayoutConfig().configs);
		}
	};
}

export function hljsLanguages(): HighlightLanguage[] {
	return [
		{name: 'typescript', func: typescript},
		{name: 'scss', func: scss},
		{name: 'xml', func: xml},
		{name: 'json', func: json}
	];
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		HttpClientXsrfModule.withOptions({
			// cookieName: 'access_token',
			// headerName: 'Authorization'
			cookieName: 'XSRF-TOKEN',
			headerName: 'X-XSRF-TOKEN'
		  }),
		// environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forRoot(FakeApiService, {
		// 	passThruUnknownUrl: true,
		// 	dataEncapsulation: false
		// }) : [],
		NgxPermissionsModule.forRoot(),
		PartialsModule,
		CoreModule,
		SharedModule,
		OverlayModule,
		StoreModule.forRoot(reducers, {metaReducers}),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
		StoreDevtoolsModule.instrument(),
		AuthModule.forRoot(),
		TranslateModule.forRoot(),
		MatProgressSpinnerModule,
		InlineSVGModule.forRoot(),
		ThemeModule,
		NgxIndexedDBModule.forRoot(dbConfig),
		FlexLayoutModule,
		MatStepperModule

	],
	exports: [],
	providers: [
		CookieService,
		AuthService,
		LayoutConfigService,
		LayoutRefService,
		MenuConfigService,
		PageConfigService,
		KtDialogService,
		DataTableService,
		SplashScreenService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: GestureConfig
		},
		{
			// layout config initializer
			provide: APP_INITIALIZER,
			useFactory: initializeLayoutConfig,
			deps: [LayoutConfigService], multi: true
		},
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: {languages: hljsLanguages}
		},
		{
			provide: DateAdapter,
			useClass: CommonDateFormats
		},
    	{
			provide: MAT_DATE_FORMATS,
			useValue: COMMON_DATE_FORMATS
		},
		// template services
		SubheaderService,
		MenuHorizontalService,
		MenuAsideService,
		HttpUtilsService,
		LayoutUtilsService,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
