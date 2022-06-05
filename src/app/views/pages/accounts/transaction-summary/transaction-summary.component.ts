import { Component, OnInit, ViewChild } from '@angular/core';
import {SubheaderService} from '../../../../core/_base/layout';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TransactionStatement } from './../model/transaction-statement.model';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountsService } from '../service/accounts.service';

import {LayoutUtilsService, MessageType} from '../../../../core/_base/crud';

@Component({
  selector: 'kt-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss']
})
export class TransactionSummaryComponent implements OnInit {

  @ViewChild(DaterangepickerDirective, {static: true})
	pickerDirective: DaterangepickerDirective;
	displayedColumns = ['transactionId', 'agentFullName', 'accountNo', 'cardNo', 'amount', 'customer', 'transactionType',];
	public dataSource = new MatTableDataSource<TransactionStatement>();
	waiting = false;
	noData = false;
	message;
	clientDropdownList = [];
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
  minDate: Date;
  maxDate: Date;

  minEndDate: Date;
  maxEndDate: Date;

  transactionForm: FormGroup;
  date;
  constructor(
    private  subheaderService: SubheaderService,
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private service: AccountsService,
    private layoutUtilsService: LayoutUtilsService,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 130, 0, 1);
    this.maxDate = new Date(currentYear, 11, 31);
    
    this.minEndDate = new Date(currentYear - 130, 0, 1);
    this.maxEndDate = new Date(currentYear, 11, 31);

   }
  
  ngOnInit() {
    this.setSubHeaderTitle();
    this.transactionForm= this._formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
    this.date = {
      fromDate: this.formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      toDate: this.formatDate(new Date(Date.now()))
    }
    this.agentStatement(this.date);
  }
  
  setSubHeaderTitle() {
    this.subheaderService.setTitle('Transaction Summary');
  }

  // ngModelChange(result): void {
	// 	console.log('sss', result);
	// 	this.searchModel.fromDate = this.formatDate(result.startDate._d);
	// 	this.searchModel.toDate = this.formatDate(result.endDate._d);

	// }

  public doFilter = (value: string) => {

  };
  
	formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) {
			month = '0' + month;
		}
		if (day.length < 2) {
			day = '0' + day;
		}

		return [month, day, year].join('-');
	}


	change(e): void {

	}

	open(): void {
		this.pickerDirective.open();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

  searchStatement() {
    if(!this.transactionForm.valid) {
      return;
    }
    this.date = {
      fromDate: this.formatDate(this.transactionForm.value.fromDate),
      toDate: this.formatDate(this.transactionForm.value.toDate)
    }

    this.agentStatement(this.date);
  }
  
  agentStatement(date): void {
    this.waiting = true;
    // const date = {
    //   fromDate: this.datePipe.transform(this.transactionForm.value.fromDate, 'dd-MM-yyyy'),
    //   toDate: this.datePipe.transform(this.transactionForm.value.toDate, 'dd-MM-yyyy')
    // }
    console.log('date::: ', date);
		this.service.getTransactionSummaryStatement(date).subscribe((data: any) => {
      console.log('res::: ', data);
        this.dataSource.data = data.body.data as TransactionStatement[];
        console.log('this.dataSource.data::: ', this.dataSource.data);
				if (this.dataSource.data.length == 0) {
					this.waiting = false;
          this.noData = true;
          return;
				} else {
					this.waiting = false;
				}

			},
			error => {
				this.waiting = false;
				console.log('Error', error);
				this.message = error.error.message;
				this.layoutUtilsService.showActionNotification(this.message, MessageType.Create, 5000, true, false);
			}
		);
  }
  

  isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.transactionForm.controls[controlName];
		if (!control) {
			return false;
    }
  }
    
}
