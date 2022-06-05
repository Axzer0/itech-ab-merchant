import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";
import { SubheaderService } from '../../../../core/_base/layout';
import { SettlementService } from '../service/settlement.service';
import {Location} from "@angular/common";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'kt-settlement-preview',
  templateUrl: './settlement-preview.component.html',
  styleUrls: ['./settlement-preview.component.scss']
})
export class SettlementPreviewComponent implements OnInit {

	id;
	loading = false;
	data;
	errormsg;
	dataSource = new MatTableDataSource<any>();
	displayedColumns = ['id','createdTs', 'orderId', 'orderReference', 'paymentMethod', 'goalAmount', 'orderStatus', 'transactionStatus'];
	noData = false;
	state = '';

	constructor(private route: ActivatedRoute,
				private router: Router,
				private location: Location,
				private subheaderService: SubheaderService,
				private service: SettlementService,
				private layoutUtilsService: LayoutUtilsService,
				private  changedetect: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.subheaderService.setTitle('Settlement');
		this.route.params.subscribe(params => {
			this.id = (params['id']) ;
      console.log('iddd----', this.id);

		});
		this.service.previewSettlement(this.id).subscribe(data => {
			this.data = data.body.data.settlementData;
			this.state = data.body.data.settlementData.status
			this.dataSource = data.body.data.transactionData
			if (data.body.data.transactionData.length == 0){
				this.noData = true;
			}

			this.changedetect.detectChanges();
		}, error => {
			this.errormsg = error.error.message;
			this.layoutUtilsService.showActionNotification(this.errormsg, MessageType.Create, 5000, true, false);
			this.changedetect.detectChanges();
		})

	}

	edit() {
		this.router.navigate(['/settlement/edit/' + this.id]);
	}


  cancel() {
		this.location.back();
	}


}
