import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubheaderService} from "../../../../core/_base/layout";
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";
import {PaymentService} from "../service/payment.service";
import {Location} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from "@angular/material";
import {LoadingService} from "../../shared/loading.service";

@Component({
	selector: 'kt-dialog-preview',
	templateUrl: './dialog-preview.component.html',
	styleUrls: ['./dialog-preview.component.scss']
})
export class DialogPreviewComponent implements OnInit {


	voucher = "assets/images/logo/b4.png";
	imgData: any;
	remarks: any;
	selectedVoucher: File;
	imageChangedEvent: any = '';
	showCropper = false;
	constructor( public dialogRef: MatDialogRef<DialogPreviewComponent>,
				 private loadingService: LoadingService,
				 @Inject(MAT_DIALOG_DATA) public data: any,
				 private cdr: ChangeDetectorRef,
				 private layoutUtilsService: LayoutUtilsService,
				 private service: PaymentService,) {
	}

	ngOnInit() {
		console.log(this.data)

	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	uploadCompanyLogo(event) {
		// this.formData = new FormData();
		let fileList: FileList = event.target.files;
		console.log('fileList: ', fileList);
		if (fileList.length > 0) {
			let file: File = fileList[0];
			this.selectedVoucher = file;
			console.log('file: ', file);
			var reader = new FileReader();
			this.imgData = file;
			console.log(this.imgData)
			reader.onload = (event: any) => {
				console.log('error here')
				this.voucher = event.target.result;
				this.cdr.detectChanges();
			}
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	onSubmit(){
		this.loadingService.display(true)
		let form = new FormData()
		form.append('transactionId',this.data.id)
		form.append('remark',this.remarks)
		form.append('documentFile',this.imgData)
		this.service.refundRequest(form)
			.subscribe( ()=> {
				this.loadingService.display(false)
				this.onNoClick();
				this.layoutUtilsService.showActionNotification('Refund Requested Successfully', MessageType.Create, 5000, true, false);
			}, error => {
				console.log(error)
				let er = error ? error.statusText: "Something went wrong! Please recheck and try again"
				this.loadingService.display(false)
				this.layoutUtilsService.showActionNotification(er, MessageType.Create, 5000, true, false);
			})
	}




}
