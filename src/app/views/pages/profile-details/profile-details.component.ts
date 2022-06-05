import {Component, ChangeDetectorRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {EnvironmentImgConfigService} from '../shared/environment-img-config.service';
import {FormGroup, NgForm} from '@angular/forms';
import {AuthService} from '../../../../app/core/auth';
import {ProfileDetails} from './model/profile-details.model';
import {BackbuttonService} from '../shared/backbutton.service';
import {config} from '../../../../app/app.config';
import {SubheaderService} from '../../../../app/core/_base/layout';
import {ProfileService} from "./service/profile.service";
import {LayoutUtilsService, MessageType} from "../../../core/_base/crud";
import {SharedComponentService} from "../shared/shared-component.service";
import {Router} from "@angular/router";
import {objectKeys} from "codelyzer/util/objectKeys";

@Component({
	selector: 'kt-profile-details',
	templateUrl: './profile-details.component.html',
	styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit,AfterViewInit {
	@ViewChild('validationForm', {static: false,}) validationForm: NgForm;
	@ViewChild('validationFormGeneral', {static: false,}) validationFormGeneral: NgForm;
	@ViewChild('validationFormAccount', {static: false,}) validationFormAccount: NgForm;
	@ViewChild('validationFormBank', {static: false,}) validationFormBank: NgForm;
	@ViewChild('validationFormAddress', {static: false,}) validationFormAddress: NgForm;
	profileDetails = new ProfileDetails();
	indexSelected = 0;
	loading = false;
	formData: FormData = new FormData();
	countryDropdownList = [];
	industryDropdownList = [];
	fetchProfileDetails;
	update = false;
	remarks;

	flagInd = true;
	flagCon = true;

	flaggedObj = {
		contactNumber: {flagged: false},
		displayName: {flagged: false},
		industry: {flagged: false},
		webAddress: {flagged: false},
		countryId: {flagged: false},
		address1: {flagged: false},
		address2: {flagged: false},
		accountNumber: {flagged: false},
		nib: {flagged: false},
	}


	constructor(
		private environmentImgConfigService: EnvironmentImgConfigService,
		private dropdownService: SharedComponentService,
		private auth: AuthService,
		private router: Router,
		private cdr: ChangeDetectorRef,
		private service: ProfileService,
		private  layoutUtilsService: LayoutUtilsService,
		private backbuttonService: BackbuttonService,
		private subheaderService: SubheaderService,
	) {
		this.setSubHeaderTitle();
	}

	ngOnInit() {
		this.getCountryDropdown();
		this.getIndustryDropdown();
		this.getProfileDetails();

	}

	getCountryDropdown() {
		this.dropdownService.getCounryDropdown().subscribe(data => {
			this.countryDropdownList = data.body.data;
			console.log("country dropdown", data);
		})
	}

	getIndustryDropdown() {
		this.dropdownService.getIndustryDropdown().subscribe(data => {
			this.industryDropdownList = data.body.data;
		})
	}

	getProfileDetails() {
		this.service.getProfileDetails().subscribe(data => {
			console.log("profile details", data);
			this.profileDetails = data.body.data;
			this.fetchProfileDetails = data.body.data;
			if (data.body.data.remarks){
				this.remarks = JSON.parse(data.body.data.remarks)
				for (const [key, value] of Object.entries(this.flaggedObj)) {
					for (let i of this.remarks.attributes){
						if (key == i){
							this.flaggedObj[key].flagged = true;
						}
					}
				}
			}
		})
	}

	goBack() {
		this.backbuttonService.navigateToLastVisitedPage();
	}

	setSubHeaderTitle() {
		this.subheaderService.setTitle('Merchant Profile');
	}

	selectHeader(event) {
		this.indexSelected = event.selectedIndex;
	}

	next() {
		switch (this.indexSelected) {
			case 0:
				if (!this.validationFormAccount.valid){
					console.log('in test marking')
					Object.keys(this.validationFormAccount.controls).forEach(key => {
						console.log(key)
						this.validationFormAccount.controls[key].markAsDirty();
						this.validationFormAccount.controls[key].markAsTouched();
						this.validationFormAccount.controls[key].updateValueAndValidity();
					})
					return
				}
				this.indexSelected++;
				break;
			case 1:
				if (!this.validationFormGeneral.valid){
					Object.keys(this.validationFormGeneral.controls).forEach(key => {
						this.validationFormGeneral.controls[key].markAsDirty();
						this.validationFormGeneral.controls[key].updateValueAndValidity();
						this.validationFormGeneral.controls[key].markAsTouched();
					})
					return
				}
				this.indexSelected++;
				break;
			case 2:
				if (!this.validationFormAddress.valid){
					Object.keys(this.validationFormAddress.controls).forEach(key => {
						this.validationFormAddress.controls[key].markAsDirty();
						this.validationFormAddress.controls[key].updateValueAndValidity();
						this.validationFormAddress.controls[key].markAsTouched();
					})
					return
				}
				this.indexSelected++;
				break;
			case 3:
				if (!this.validationFormBank.valid){
					Object.keys(this.validationFormBank.controls).forEach(key => {
						this.validationFormBank.controls[key].markAsDirty();
						this.validationFormBank.controls[key].updateValueAndValidity();
						this.validationFormBank.controls[key].markAsTouched();
					})
					return
				}
				this.indexSelected++;
				break;
		}


	}

	prev() {
		this.indexSelected--;
	}

	onSubmit() {
		this.validationTest()
		this.loading = true;
		this.formData.append('businessName', this.profileDetails.businessName);
		this.formData.append('countryId', this.profileDetails.countryId);
		this.formData.append('email', this.profileDetails.email);
		this.formData.append('contactNumber', this.profileDetails.contactNumber);
		this.formData.append('displayName', this.profileDetails.displayName);
		this.formData.append('industry', this.profileDetails.industry);
		this.formData.append('webAddress', this.profileDetails.webAddress);
		this.formData.append('ivaNumber', this.profileDetails.ivaNumber);
		this.formData.append('usesQuestion1', this.profileDetails.usesQuestion1);
		this.formData.append('usesQuestion2', this.profileDetails.usesQuestion2);
		this.formData.append('address1', this.profileDetails.address1);
		this.formData.append('address2', this.profileDetails.address2);
		this.formData.append('accountNumber', this.profileDetails.accountNumber);
		this.formData.append('nib', this.profileDetails.nib);
		this.formData.append('termsAndCondition', 'true');
		this.service.addProfile(this.formData).subscribe(data => {
			this.loading = false;
			console.log(data)
			localStorage.setItem('enrollmentStatus',data.body.data.enrollmentStatus)
			this.layoutUtilsService.showActionNotification('Successfully Updated', MessageType.Delete, 5000, true, false);
			this.router.navigate(['/dashboard']);
		}, error => {
			this.loading = false;
			this.formData = new FormData();
			this.cdr.detectChanges();
			const errorData = error.error.message;
			console.log(error)
			this.layoutUtilsService.showActionNotification(errorData, MessageType.Delete, 5000, true, false);
		})
	}

	ngAfterViewInit(): void {
		console.log('view init')
		Object.keys(this.validationFormAccount.controls).forEach( k => {
			console.log(k)
		})
	}

	validationTest(){
		switch (this.indexSelected) {
			case 0:
				if (!this.validationFormAccount.valid){
					Object.keys(this.validationFormAccount.controls).forEach(key => {
						console.log(key)
						this.validationFormAccount.controls[key].markAsDirty();
						this.validationFormAccount.controls[key].markAsTouched();
						this.validationFormAccount.controls[key].updateValueAndValidity();
					})
					return
				}
				break;
			case 1:
				if (!this.validationFormGeneral.valid){
					Object.keys(this.validationFormGeneral.controls).forEach(key => {
						this.validationFormGeneral.controls[key].markAsDirty();
						this.validationFormGeneral.controls[key].updateValueAndValidity();
						this.validationFormGeneral.controls[key].markAsTouched();
					})
					return
				}
				break;
			case 2:
				if (!this.validationFormAddress.valid){
					Object.keys(this.validationFormAddress.controls).forEach(key => {
						this.validationFormAddress.controls[key].markAsDirty();
						this.validationFormAddress.controls[key].updateValueAndValidity();
						this.validationFormAddress.controls[key].markAsTouched();
					})
					return
				}
				break;
			case 3:
				if (!this.validationFormBank.valid){
					Object.keys(this.validationFormBank.controls).forEach(key => {
						this.validationFormBank.controls[key].markAsDirty();
						this.validationFormBank.controls[key].updateValueAndValidity();
						this.validationFormBank.controls[key].markAsTouched();
					})
					return
				}
				break;
		}
	}




}
