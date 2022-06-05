import { SharedDataService } from './shared-data.service';
import { Injectable, OnChanges } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Injectable({
  providedIn: 'root'
})
export class TemporaryStorageService {
  accountForm;
  generalForm;
  addressForm;
  otherInformation;
  constructor(
    private sharedDataService: SharedDataService
  ) {
    this.getttingFormChangesData();
  }
  
  getttingFormChangesData() {
    this.sharedDataService.generalForm.subscribe(data => {
      this.generalForm = data;
      // console.log('getting general form data', data)
      localStorage.setItem('generalForm', JSON.stringify(data));
    })
    this.sharedDataService.accountForm.subscribe(data => {
      this.accountForm = data;
      // console.log('getting general form data', data)
      localStorage.setItem('accountForm', JSON.stringify(data));
    })
    this.sharedDataService.addressForm.subscribe(data => {
      this.addressForm = data;
      // this.saveChangesDataFromKycEnroll();
      localStorage.setItem('addressForm', JSON.stringify(data));
      // console.log('getting general form data', data);
    })

    this.sharedDataService.otherInformationForm.subscribe(data => {
      this.otherInformation = data;
      // this.saveChangesDataFromKycEnroll();
      localStorage.setItem('otherInformation', JSON.stringify(data));
      // console.log('getting general form data', data);
    })
    // this.saveChangesDataFromKycEnroll();
  }

  // setAccountFormData(accountForm) {
  //   this.accountForm = accountForm;
  //   console.log('changes the accountform value: ', this.accountForm);
  //   this.saveChangesDataFromKycEnroll();
  // }
  
  // setGeneralFormData(generalForm) {
  //   console.log('general form::: ', generalForm);
  //   this.generalForm = generalForm;
  //   console.log('changes the generalForm value: ', this.generalForm);
  //   this.saveChangesDataFromKycEnroll();
  // }
  
  // setAddressFormData(addressForm) {
  //   this.addressForm = addressForm;
  //   this.saveChangesDataFromKycEnroll();
  // }

  // ngOnChanges()	{
  //   this.saveChangesDataFromKycEnroll();
  // }

  saveChangesDataFromKycEnroll() {
    const data = {
      account: this.accountForm,
      general: this.generalForm,
      address: this.addressForm
    };
    console.log('account data changed from kyc enroll: ', data);
    // console.log('account data changed from kyc enroll: ', JSON.stringify(data));
  }
}
