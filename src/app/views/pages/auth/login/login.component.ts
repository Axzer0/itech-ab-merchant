// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject, of } from 'rxjs';
import { finalize, takeUntil, tap, catchError } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService } from '../../../../core/auth';
import { first } from 'rxjs/operators';
import { EnvironmentImgConfigService } from '../../shared/environment-img-config.service';
import { config } from '../../../../../app/app.config';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { SharedDataService } from '../../shared/shared-data.service';
import { MatSnackBar } from '@angular/material';

/**
 * ! Just example => Should be removed in development
 */

// const DEMO_PARAMS = {
// 	USERNAME: 'admin123',
// 	PASSWORD: 'admin123'
// };

// above demo_param are deprecated



@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */

	status;

	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private environmentImgConfigService: EnvironmentImgConfigService,
		private dbService: NgxIndexedDBService,
		private sharedDataService: SharedDataService,
		private _snackBar: MatSnackBar,
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
			console.log('returnUrl', this.returnUrl);
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		// demo message to show
		// if (!this.authNoticeService.onNoticeChanged$.getValue()) {
		// 	const initialNotice = `Use account
		// 	<strong>${DEMO_PARAMS.EMAIL}</strong> and password
		// 	<strong>${DEMO_PARAMS.PASSWORD}</strong> to continue.`;
		// 	this.authNoticeService.setNotice(initialNotice, 'info');
		// }

		this.loginForm = this.fb.group({
			// username: [DEMO_PARAMS.USERNAME, Validators.compose([
			// 	Validators.required,
			// 	Validators.minLength(3),
			// 	Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			// ])
			// ],
			username: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		});
		SharedDataService.loadingData.subscribe(
			res=> {
				console.log('+++++++++++++++++++++++++::::::::::::', res);
				this.loading = false;
			}
		);
	}

	getLogo() {
		return this.environmentImgConfigService.getLogoImage();
	}

	saveJwtTokenInIndexDB(jwtToken) {
		// console.log('requested jwt for index db:: ', jwtToken);
		this.dbService.add('banking', { name: jwtToken }).then(
			(data) => {
				// Do something after the value was added
				console.log('successfully saved the data into the indexDB: ', data);
			},
			error => {
				console.log('error while setting the indexDB: ', error);
			}
		);
	}

	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
		const authData = {
			username: controls.username.value,
			password: controls.password.value
		};
		this.auth
			.login(authData).pipe(tap(user => {
				console.log('user user: ', user);
			}))

			.subscribe(
				data => {
					this.saveJwtTokenInIndexDB(data.access_token);
					// this.sharedDataService.setStatus(data.access_token);
					// localStorage.setItem('user', authData.username);
					// localStorage.setItem('exist', 'true');
					// localStorage.setItem('token', data.access_token);
					// localStorage.setItem('refresh-token', data.refresh_token);
					localStorage.setItem('exist', 'true');
					localStorage.setItem('loggedIn', 'true');
					localStorage.setItem('token', data.access_token);
					localStorage.setItem('refresh-token', data.refresh_token);
					console.log('login success response: ', data);
					this.loading = false;
					this.router.navigate(['/dashboard']);
					const auth = data.access_token;
					// const auth = data.access_token;
					this.auth.getProfileData().subscribe(
						res => {
							this.loading = false;
							this._snackBar.open('Success', 'Login successfully.', {
								duration: 5000,
								horizontalPosition: 'right',
								verticalPosition: 'bottom',
							});

							localStorage.setItem('user', res.body.data.firstName);
							localStorage.setItem('fullName', res.body.data.businessName);

							// if (auth && res.body.data.mobileVerified === false && localStorage.getItem('status') === 'LEAD') {
							// 	this.router.navigate(['/auth/otp-verification']);
							// 	this.loading = false;
							// } else if (auth && localStorage.getItem('status') === 'LEAD') {
							// 	this.router.navigate(['/starter-up/customer/enroll']);
							// 	this.loading = false;
							// }
							localStorage.setItem('enrollmentStatus', res.body.data.enrollmentStatus);
							if(res.body.data.enrollmentStatus === 'UNVERIFIED'){
								console.log("hello verified")
								this.loading = false;
								localStorage.setItem('verified', res.body.data.verified);
								this.router.navigate(['/merchant/profile']);
							}
							else {
								console.log("hello dashboard")
								localStorage.setItem('verified', res.body.data.verified);
								this.loading = false;
								this.router.navigate(['/dashboard']);
							}

						}, error => {
							this.loading = false;
							console.log('error in profile view::: ', error);
						}
					);

					// /**
					//  * @deprecated
					//  */
					console.log('profile status:: ', this.status);
					// if (auth && localStorage.getItem('status') === 'INITIATED') {
					// 	console.log('auth:: ', auth);
					// 	// console.log('profile status:: ', this.status);
					// 	this.router.navigate(['/starter-up/customer/enroll']);
					// } else if(auth && localStorage.getItem('status') !== 'INITIATED') {
					// 	console.log('auth:: ', auth);
					// 	// console.log('profile status:: ', this.status);
					// 	this.router.navigate(['/dashboard']);
					// }

					// if(auth) {
					// 	console.log('auth:: ', auth);
					// 	this.router.navigate(['/dashboard']);
					// }

				}, error => {
					console.log('login error response: ', error);
					this.loading = false;
				});
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
