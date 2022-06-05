// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Register, User } from '../../../../core/auth/';
import { Subject } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { EnvironmentImgConfigService } from '../../shared/environment-img-config.service';
import { CountryDropdown } from '../../shared-model/country-dropdown.model';
import { SharedComponentService } from '../../shared/shared-component.service';
import { DistrictDropdown } from '../../shared-model/district-dropdown.model';
import { StateDropdown } from '../../shared-model/state-dropdown.model';
import { CityDropdown } from '../../shared-model/city-dropdown.model';
import { DistricDropdownRequest } from '../../shared-model/district-dropdown-request.model';
import { CityDropdownRequest } from '../../shared-model/city-dropdown-request.model';

@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
	registerForm: FormGroup;
	loading = false;
	errors: any = [];

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	applicationPath: string = "";
  	url: string = "";
	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	states: StateDropdown;
	districts: DistrictDropdown;
	cities: CityDropdown;

	countries: CountryDropdown;
	private districtDropdownReq = new DistricDropdownRequest();
	private cityDropdownReq = new CityDropdownRequest();

	countryCode: string;
	agreed: boolean = false;
	constructor(
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private environmentImgConfigService: EnvironmentImgConfigService,
		private sharedComponentService: SharedComponentService,
	) {
		this.unsubscribe = new Subject();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {
		this.initRegisterForm();
		this.applicationPath = this.router.url;
		console.log(this.router.url);
		this.getCountryList();
	}

	// onChangeCountry(event: any) {
	// 	// console.info('on change country method::: ', event);
	// 	this.countryCode = event.phoneCode;
	//   };

	  getCountryList() {
		this.sharedComponentService.getCounryDropdown().subscribe(
		  res => {
			this.countries = res.body;
			// console.log('country dropdown list:: ', res);
		  }, error => {
			// console.log('country dropdown list error::: ', error);
		  }
		);
	  };

	getLogo() {
		return this.environmentImgConfigService.getLogoImage();
	  }


	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		this.registerForm = this.fb.group({
			firstName: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			lastName: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
				Validators.maxLength(320)
			]),
			],
			username: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			]),
			],
			mobileNumber: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			// confirmPassword: ['', Validators.compose([
			// 	Validators.required,
			// 	Validators.minLength(3),
			// 	Validators.maxLength(100)
			// ])
			// ],
			agree: [false, Validators.compose([Validators.required])]
		},
		// {
		// 	validator: ConfirmPasswordValidator.MatchPassword
		// }
		);
	}

	getAllCity(cityDropdownReq) {
		this.sharedComponentService.getCityDropdown(cityDropdownReq).subscribe(
		  res => {
			this.cities = res.body;
		  }, error => {
			console.log('city error: ', error);
		  }
		);
	  }

	  getAllDistrictList(districtDropdownReq) {
		this.sharedComponentService.getDistrictDropdown(districtDropdownReq).subscribe(
		  res => {
			this.districts = res.body;
		  }, error => {
			console.log('district error: ', error);
		  }
		);;
	  }

	  onChangeCountry(event: any) {
		this.districtDropdownReq.countryId = event;
		this.registerForm.patchValue({
		  district: '',
		  province: '',
		  city: '',
		});
		if(this.districtDropdownReq.countryId === undefined || this.districtDropdownReq.countryId === null || !this.districtDropdownReq.countryId) {
		  return;
		}
		this.getAllStateList(this.districtDropdownReq.countryId);
	  }

	  onChangeProvince(event: any) {
		this.districtDropdownReq.stateId = event;
		this.registerForm.patchValue({
		  district: '',
		  city: '',
		});
		this.getAllDistrictList(this.districtDropdownReq);
	  }

	  onChangeDistrict(event) {
		this.cityDropdownReq.countryId = this.districtDropdownReq.countryId;
		this.cityDropdownReq.districtId = event;
		this.cityDropdownReq.stateId = this.districtDropdownReq.stateId;
		this.registerForm.patchValue({
		  city: '',
		});
		this.getAllCity(this.cityDropdownReq);
	  }


	  getAllStateList(countryId) {
		this.sharedComponentService.getStateDropdown(countryId).subscribe(
		  res => {
			this.states = res.body;
		  }, error => {
			console.log('state error: ', error);
		  }
		);;
	  }

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.registerForm.controls;
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		if (!controls.agree.value) {
			this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
			return;
		}

		const user = {
		email: controls.email.value,
		username: controls.username.value,
		firstName: controls.firstName.value,
		lastName: controls.lastName.value,
		password: controls.password.value,
		mobileNumber: controls.mobileNumber.value,
		};
		console.log('user request:: ', user);
		this.auth.register(user)
			.pipe(
			tap(user => {
				console.log('register success response::: ', user);
				if (user) {
					this.store.dispatch(new Register({authToken: user.access_token}));
					// pass notice message to the login page
					// this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
					this.authNoticeService.setNotice(this.translate.instant('Your account has been successfully register' + '. Please check your email and verify before login.'), 'success');
					this.router.navigateByUrl('/auth/login');
					this.loading = false;
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
					this.loading = false;
				}
			}),
			takeUntil(this.unsubscribe),
			finalize(() => {
				this.loading = false;
				this.cdr.markForCheck();
			})
		).subscribe(
			res => {
				this.loading = false;
				console.log('login success: ', res);
			}, error => {
				this.loading = false;
				if(error.error.code === 500) {
					this.authNoticeService.setNotice(this.translate.instant('Something went wrong please try again later.'), 'danger');
				}
				this.throwUsernameExistError(error.error.message);
				console.log('register error::: ', error.error.message);
			}
		);

		// _user.roles = [];
		// this.auth.register(_user).pipe(
		// 	tap(user => {
		// 		console.log('register success response::: ', user);
		// 		if (user) {
		// 			this.store.dispatch(new Register({authToken: user.accessToken}));
		// 			// pass notice message to the login page
		// 			this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
		// 			this.router.navigateByUrl('/auth/login');
		// 		} else {
		// 			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		// 		}
		// 	}),
		// 	takeUntil(this.unsubscribe),
		// 	finalize(() => {
		// 		this.loading = false;
		// 		this.cdr.markForCheck();
		// 	})
		// ).subscribe();
	}


	throwUsernameExistError(errorMesssage) {
		this.authNoticeService.setNotice(errorMesssage, 'danger');
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}


	getCheckBoxAgreement(event) {
		console.log('checkbox value for the agreeement: ', event.checked);
		this.agreed = event.checked;
	}
}
