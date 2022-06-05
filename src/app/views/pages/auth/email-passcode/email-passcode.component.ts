import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EnvironmentImgConfigService } from '../../shared/environment-img-config.service';

@Component({
  selector: 'kt-email-passcode',
  templateUrl: './email-passcode.component.html',
  styleUrls: ['./email-passcode.component.scss']
})
export class EmailPasscodeComponent implements OnInit {
  emailPasscode: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private environmentImgConfigService: EnvironmentImgConfigService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
		this.emailPasscode = this.fb.group({
			emailPasscode: ['', Validators.compose([Validators.required])]
		});
	}

	getLogo() {
		return this.environmentImgConfigService.getLogoImage();
  }

  submitEmailPasscode() {
    const controls = this.emailPasscode.controls;
		// check form is valid or not
		if (this.emailPasscode.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    // this.loading = true;
    this.router.navigate(['/starter-up/customer/enroll']);
    
  }

  isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.emailPasscode.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
  
}
