// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject, of } from 'rxjs';
// Auth
import { AuthNoticeService } from '../../../../core/auth';
import { EnvironmentImgConfigService } from '../../shared/environment-img-config.service';
import { config } from '../../../../../app/app.config';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material';
import { CountryDropdown } from '../../shared-model/country-dropdown.model';
import { SharedComponentService } from '../../shared/shared-component.service';
@Component({
  selector: 'kt-opt-validation',
  templateUrl: './opt-validation.component.html',
  styleUrls: ['./opt-validation.component.scss']
})
export class OptValidationComponent implements OnInit, OnDestroy {
  OTPValidationForm: FormGroup;
  errors: any = [];
  // private unsubscribe: Subject<any>;
  loading = false;
  sendingOTP = false;
  gettingOTPResponse;
  countries: CountryDropdown;
  countryCode: string;
  constructor(
    private fb: FormBuilder,
    private environmentImgConfigService: EnvironmentImgConfigService,
    private authNoticeService: AuthNoticeService,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private sharedComponentService: SharedComponentService
  ) { }

  ngOnInit() {
    this.initLoginForm();
    this.getCountryList();
  }

  initLoginForm() {
		this.OTPValidationForm = this.fb.group({
      // country: ['', Validators.compose([Validators.required])],
			// phoneNumber: ['', Validators.compose([Validators.required])],
			otpCode: ['', Validators.compose([Validators.required])]
		});
	}

	getLogo() {
		return this.environmentImgConfigService.getLogoImage();
  }

  onChangeCountry(event: any) {
    // console.info('on change country method::: ', event);
    this.countryCode = event.phoneCode;
  };

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

  // sendOTP() {
  //   console.log('calling the send OTP password API');
  //   if(!this.OTPValidationForm.get('phoneNumber').valid && !this.OTPValidationForm.get('country').valid) {
  //     this.OTPValidationForm.get('phoneNumber').markAsTouched();
  //     this.OTPValidationForm.get('country').markAsTouched();
  //     return;
  //   }
  //   const sendOTP = {
	// 		phoneNumber: this.countryCode.concat(this.OTPValidationForm.get('phoneNumber').value)
  //   };
  //   // this.sendingOTP = true;
  //   console.log('submmitting the phone number to get OTP: ', sendOTP);
  //   this.auth.getOTPVerificationCode(sendOTP).subscribe(
  //     res => {
  //       this.gettingOTPResponse = res;
  //       this.sendingOTP = true;
  //       console.log('getting OTP: ', res);
  //       this.authNoticeService.setNotice(res.message + '. Please check your mobile device.', 'success');
  //     }, error => {
  //       this.sendingOTP = false;
  //       this.authNoticeService.setNotice(error.error.message, 'danger');
  //       if(error.error.message === "User is already verified") {
  //         this._snackBar.open('Error', error.error.message + '. Please fill your information.', {
  //           duration: 5000,
  //           horizontalPosition: 'right',
  //           verticalPosition: 'bottom',
  //         });
  //         this.router.navigate(['starter-up/customer/enroll']);
  //       }
  //       console.log('error while getting the OTP: ', error);
  //     }
  //   );
  // }

  validateOTP() {
    const validOTP = {
      // phoneNumber: this.countryCode.concat(this.OTPValidationForm.get('phoneNumber').value),
      otpCode: this.OTPValidationForm.get('otpCode').value
		};
    // console.log('submmitting the phone number to get OTP');
    this.auth.verificationDevice(validOTP).subscribe(
      res => {
        console.log('OTP validation success: ', res);
        this.authNoticeService.setNotice(res.data.message, 'success');
        this.router.navigate(['/starter-up/customer/enroll']);
      }, error => {
        this.authNoticeService.setNotice(error.error.message, 'danger');
        console.log('error while validating OTP: ', error);
      }
    );
    console.log('validating the OTP after OTP received:');
  }


  isControlHasError(controlName: string, validationType: string): boolean {
		const otpValidationControl = this.OTPValidationForm.controls[controlName];
		if (!otpValidationControl) {
			return false;
		}
		const result = otpValidationControl.hasError(validationType) && (otpValidationControl.dirty || otpValidationControl.touched);
		return result;
	}


  ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		// this.unsubscribe.next();
		// this.unsubscribe.complete();
		this.loading = false;
	}

}
