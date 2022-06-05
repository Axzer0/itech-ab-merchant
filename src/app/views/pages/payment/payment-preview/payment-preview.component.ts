import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubheaderService} from "../../../../core/_base/layout";
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";
import {PaymentService} from "../service/payment.service";
import {Location} from "@angular/common";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {DialogPreviewComponent} from "../dialog-preview/dialog-preview.component";

@Component({
	selector: 'kt-payment-preview',
	templateUrl: './payment-preview.component.html',
	styleUrls: ['./payment-preview.component.scss']
})
export class PaymentPreviewComponent implements OnInit {
	displayedColumns = ['createdTs', 'name', 'description', 'quantity', 'unitAmount'];
	public dataSource = new MatTableDataSource();
	routeId;
	loading = false;
	data;
	errormsg;
	remark;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private location: Location,
				private subheaderService: SubheaderService,
				private service: PaymentService,
				public dialog: MatDialog,
				private layoutUtilsService: LayoutUtilsService,
				private  changedetect: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.subheaderService.setTitle('My Payments');
		this.route.params.subscribe(params => {
			this.routeId = (params['id']) //log the value of id
		});
		this.route.queryParams.subscribe(params => {
			this.remark = (params['remark'])
		})

		if (this.routeId) {
			console.log("routeId", this.routeId);
			this.reload()
		}
	}

	edit() {

	}

	cancel() {
		this.location.back();
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogPreviewComponent, {
			width: '350px',
			data: {remark: '', imageData: '',id: this.data.id}
		});

		dialogRef.afterClosed().subscribe(result => {
			this.reload()
		});
	}

	reload(){
		this.service.getPaymentPreview(this.routeId).subscribe(data => {
			this.data = data.data;
			this.dataSource = data.data.purchaseUnit.item;
			this.changedetect.detectChanges();
		}, error => {
			this.errormsg = error.error.message;
			this.layoutUtilsService.showActionNotification(this.errormsg, MessageType.Create, 5000, true, false);
			this.changedetect.detectChanges();
		})
	}



}
