import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {SubheaderService} from '../../../../core/_base/layout';
import { BackbuttonService } from '../../shared/backbutton.service';
import { AccountsService } from '../service/accounts.service';
import { LoanRequest } from '../model/loan-request';
import { MatSnackBar } from '@angular/material';

interface LoanTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'kt-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.scss']
})
export class LoanRequestComponent implements OnInit {
  loanForm: FormGroup;

  loanTypes: LoanTypes[] = [
    { value: 'AUTO_LOAN', viewValue: 'Auto Loans' },
    { value: 'DEBT_CONSOLIDATION_LOANS', viewValue: 'Debt Consolidation Loans' },
    { value: 'LOAN_FOR_VETERANS', viewValue: 'Loans for Veterans' },
    { value: 'MORTGAGES', viewValue: 'Mortgages' },
    { value: 'PAYDAY_LOANS', viewValue: 'Payday Loans' },
    { value: 'PERSONAL_LOAN', viewValue: 'Personal Loans' },
    { value: 'STUDENT_LOAN', viewValue: 'Student Loans' },
    { value: 'SMALL_BUSINESS_LOANS', viewValue: 'Small Business Loans' },
    { value: 'OTHERS', viewValue: 'Others' },
  ];
  loanRequest: LoanRequest;

  // @ViewChild("fileInput", {static: false}) fileInput: ElementRef;
  fileName: string;
  formData: FormData = new FormData();
  constructor(
    private  subheaderService: SubheaderService,
    private backbuttonService: BackbuttonService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private accountsService: AccountsService,
    private _snackBar: MatSnackBar,
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.setSubHeaderTitle();
  }

  initializeForm() {
    this.loanForm = this._formBuilder.group({
      amount: ['', Validators.required],
      loanType: ['', Validators.required],
      remarks: ['', Validators.required],
      timePeriod: ['', Validators.required],
      document: ['', Validators.required],
    });
  }

  setSubHeaderTitle() {
    this.subheaderService.setTitle('Loan Request');
  };

  onClick(event) {
    // this.formData = new FormData();
    let fileList: FileList = event.target.files;
    console.log('fileList: ', fileList);
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.formData.set('document', file == undefined || null ? '' :  file);
      console.log('file: ', file);
      var reader = new FileReader();
      this.fileName = file.name;
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  requestLoan() {
    console.log('Loan request form data: ', this.loanForm);
    const controls = this.loanForm.controls;
    if (this.loanForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this._snackBar.open('Error!', 'Something went wrong. Please fill all the filled properly.', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      return;
    };
    // console.log('Loan request form data: ', this.loanForm);
    // this.formData = new FormData();
    console.log('Loan request form data after new FormData: ', this.loanForm);
    this.formData.set('amount', this.loanForm.value.amount == undefined || null ? '' : this.loanForm.value.amount);
    this.formData.set('loanType', this.loanForm.value.loanType == undefined || null ? '' :  this.loanForm.value.loanType);
    this.formData.set('remarks', this.loanForm.value.remarks == undefined || null ? '' :  this.loanForm.value.remarks);
    this.formData.set('timePeriod', this.loanForm.value.timePeriod == undefined || null ? '' :  this.loanForm.value.timePeriod);
    this.accountsService.loanRequest(this.formData).subscribe(res => {
      console.log('loan requested successfully: ', res);
      this._snackBar.open('congratulation!', res.body.message, {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log('Error while submitting the loan request: ', error);
      if(error.error.message) {
        this._snackBar.open('Error Occurs', error.error.message, {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    }
    );
  };


  goBack() {
    this.backbuttonService.navigateToLastVisitedPage();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loanForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

}
