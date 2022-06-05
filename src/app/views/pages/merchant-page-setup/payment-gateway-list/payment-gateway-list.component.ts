import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {PageSetupService} from "../service/page-setup.service";
import {SubheaderService} from "../../../../core/_base/layout";
import {PaymentGatewayModel} from "../model/page-setup.model";
import {Router} from "@angular/router";
import {SharedDataService} from "../../shared/shared-data.service";
import {QueryFilter} from "../../../../core/auth/_models/queryFilter.model";

@Component({
  selector: 'kt-payment-gateway-list',
  templateUrl: './payment-gateway-list.component.html',
  styleUrls: ['./payment-gateway-list.component.scss']
})
export class PaymentGatewayListComponent implements OnInit {
	displayedColumns = [ 'merchantId', 'companyName', 'createdTs', 'action'];
	public dataSource = new MatTableDataSource<PaymentGatewayModel>();
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	previewModal = false;
	filterName;
	waiting = false;
	noData = false;
	agentPreviewData;
	queryFilter = new QueryFilter();
	totalData;


	constructor(private service: PageSetupService,
				private router: Router,
				private sharedDataService: SharedDataService,
				private  subheaderService: SubheaderService) {
		this.subheaderService.setTitle('Payment Gateway');
	}


	ngOnInit() {
		this.getPaymentGatewayList();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public doFilter = (value: string) => {
		this.queryFilter.searchParameter = value.trim().toLocaleLowerCase();
		this.filterName = '';
		this.getPaymentGatewayList();

	}

	getPaymentGatewayList(): void {
		this.waiting = true;
		this.noData = false;
		this.service.paymentGatewayList(this.queryFilter).subscribe((data: any) => {
				this.dataSource.data = data.body.data.data as PaymentGatewayModel[];
				this.totalData = data.body.data.totalData
				if (this.dataSource.data.length == 0) {
					this.waiting = false;
					this.noData = true;
				} else {
					this.waiting = false;
				}
			},
			error => {
				console.log("Error", error);
			}
		)
	}

	preview(data) {
	console.log("preview data", data);
	this.sharedDataService.setPreviewData(data);
	this.router.navigate(['/payment/form/preview']);
	}

	edit(data) {
		this.sharedDataService.setPreviewData(data);
		this.router.navigate(['/payment/form/setup/' + data.id]);
	}

	onPaginationChange(event: PageEvent) {
		console.log('valll', event);
		this.queryFilter.pageNumber = event.pageIndex + 1;
		this.queryFilter.pageSize = event.pageSize;
		this.getPaymentGatewayList();
	}

	reloadList(){
		this.queryFilter.searchParameter = '';
		this.getPaymentGatewayList();
	}

}
