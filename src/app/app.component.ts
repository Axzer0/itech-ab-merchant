import { Subscription } from 'rxjs';
// Angular
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// Layout
import { LayoutConfigService, SplashScreenService, TranslationService } from './core/_base/layout';
// language list

import * as $ from 'jquery';
import {LoadingService} from "./views/pages/shared/loading.service";

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	// Public properties
	title = 'Mozambique';
	loader: boolean;
	showLoader = false;
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/


	constructor(private translationService: TranslationService,
				         private router: Router,
				         private loading: LoadingService,
				         private cdr: ChangeDetectorRef,
				         private layoutConfigService: LayoutConfigService,
				         private splashScreenService: SplashScreenService) {


	}


	ngOnInit(): void {
		// enable/disable loader
		this.loader = this.layoutConfigService.getConfig('loader.enabled');
		LoadingService.status.subscribe((val: boolean) => {
			setTimeout(() => {
				console.log('reached the app')
				this.showLoader = val;
				this.cdr.detectChanges()
			}, 10);
		});

		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// hide splash screen
				this.splashScreenService.hide();

				// scroll to top on every route change
				window.scrollTo(0, 0);

				// to display back the body content
				setTimeout(() => {
					document.body.classList.add('kt-page--loaded');
				}, 500);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
