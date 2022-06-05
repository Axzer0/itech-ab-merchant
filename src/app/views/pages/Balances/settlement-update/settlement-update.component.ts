import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettlementService} from "../service/settlement.service";
import {Location} from "@angular/common";
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";
import {NgForm} from "@angular/forms";
import {PaymentPagination} from "../../payment/model/payment.model";
import {PaymentsService} from "../../payments/service/payments.service";
import {MatTableDataSource} from "@angular/material";
import {PaymentService} from "../../payment/service/payment.service";
import {UpdateSettlement} from "../model/settlement.model";

@Component({
	selector: 'kt-update-settlement',
	templateUrl: './settlement-update.component.html',
	styleUrls: ['./settlement-update.component.scss']
})
export class SettlementUpdateComponent implements OnInit {
	@ViewChild('validationForm', {static: false,}) validationForm: NgForm;
	displayedColumns = ['select','id','orderId', 'goalAmount', 'action'];
	dataSource = new MatTableDataSource<any>();
	updateSettlement = new UpdateSettlement();
	routeId;
	loading;
	message;
	validationError = false ;
	allPayments = [];
	paymentPagination = new PaymentPagination()

	noData;
	waiting = true;
	totalData;

	checkArr = [];
	txnId = []
	txnValue = ''
	test;



	constructor(private route: ActivatedRoute,
				private service: SettlementService,
				private router: Router,
				private location: Location,
				private paymentService: PaymentService,
				private  layoutUtilsService: LayoutUtilsService) {

	}

	ngOnInit() {
		this.paymentPagination.searchParameter = "SUCCESSFUL";
		this.paymentPagination.filter.fromDate = "";
		this.paymentPagination.filter.toDate = "";
		this.route.params.subscribe(params => {
			this.routeId = params['id'];

		});

		if (this.routeId) {
			this.service.previewSettlement(this.routeId).subscribe(
				data => {
					this.allPayments = data.body.data.transactionData;
					this.updateSettlement.settleEnable = data.body.data.settlementData.settleEnable;
					this.updateSettlement.remarks = data.body.data.settlementData.remarks;
					this.updateSettlement.amount = data.body.data.settlementData.totalAmount;
					this.updateSettlement.transactionIds = data.body.data.settlementData.transactionId;
					this.getPaymentTable()
				})
		}

	}

	back() {
		this.location.back();
	}

	reset() {
		this.validationForm.reset();
	}

	update(){
		this.loading = true;
		if (!this.validationForm.valid){
			Object.keys(this.validationForm.controls).forEach(key => {
				this.validationForm.controls[key].markAsDirty();
				this.validationForm.controls[key].updateValueAndValidity();
				this.validationForm.controls[key].markAsUntouched();
			})
			this.loading = false
			this.validationError = true
			return;
		}
		this.updateSettlement.transactionIds = this.txnId;
		this.service.updateSettlement(this.routeId, this.updateSettlement).subscribe(data => {
			this.loading = false;
			this.message = data.message;
			this.router.navigate(['/settlement/all']);
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Delete, 5000, true, false);
		}, error => {
			this.loading = false;
			this.message = error.error.errorMessage;
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Delete, 5000, true, false);
		})

	}
	onAlertClose(val){
		this.validationError = false
	}

	onPaginationChange(filter){
		this.paymentPagination.pageNumber = filter.pageIndex + 1;
		this.paymentPagination.pageSize = filter.pageSize;
		this.getPaymentTable()
	}


	checkOne(index){
		let v = this.txnId.find(da => da == this.checkArr[index].id)
		if (v){

			this.txnId.splice(this.txnId.indexOf(v),1)
		}
		if(!v){
			this.txnId.push(this.checkArr[index].id)
		}
	}

	view(id, merchantId) {
		this.router.navigate(['/payments/view/' + merchantId + '/' + id]);
	}

	getPaymentTable(){
		this.dataSource = new MatTableDataSource<any>();
		this.checkArr = []
		this.paymentService.getPaymentList(this.paymentPagination).subscribe( da => {
			this.dataSource = da.data.data;
			this.totalData = da.data.totalData;
			if (da.data.data.length === 0) {
				this.waiting = false;
				this.noData = true;
			} else {
				this.waiting = false;

				for (let i of da.data.data){
					this.checkArr.push({id: i.id,checked: false})
				}
				for (let i of this.checkArr){
					let val = this.allPayments.find(da => da.id == i.id)
					i.checked = !!val;
				}
				for (let i of this.allPayments){
					this.txnId.push(i.id)
				}

			}
		}, er => {
			this.noData = true;
			this.waiting = false;
		})
	}
}
