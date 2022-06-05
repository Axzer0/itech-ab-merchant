import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SubheaderService} from "../../../../core/_base/layout";
import {MerchantPaymentModel, SearchModel} from "../../dashboard/model/dashboard.model";
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "../service/payment.service";
import {QueryFilter} from "../../../../core/auth/_models/queryFilter.model";
import {PaymentPagination, SettlementModel} from "../model/payment.model";
import {SelectionModel} from "@angular/cdk/collections";
import {SharedDataService} from "../../shared/shared-data.service";
import {PeriodicElement} from "../../shared/components/generic-table/generic-table.component";
import {LoadingService} from "../../shared/loading.service";



@Component({
	selector: 'kt-refund-list',
	templateUrl: './refund-list.component.html',
	styleUrls: ['./refund-list.component.scss']
})
export class RefundListComponent implements OnInit {
	displayedColumns = ['id','merchantId','transactionId', 'createdTs', 'refundStatus', 'action'];
	public dataSource = new MatTableDataSource<any>();
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	selection = new SelectionModel(true, []);
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	previewModal = false;
	queryFilter = new QueryFilter();
	paymentPagination = new PaymentPagination();
	filterName;
	pageSize = 5;
	agentPreviewData;
	waiting = false;
	noData = false;
	errormsg;
	pageNumber = 1;
	previousPageIndex;
	sortParameter = '';
	sortType = '';
	searchPaymentModel = new SearchModel();
	searchParameter = '';
	terminalIds = [];
	reportBoolean;
	minDate: Date;
	maxDate: Date;
	minEndDate: Date;
	maxEndDate: Date;
	loading = false;
	totalData;

	selectedTab = 0;


	constructor(private router: Router,
				private shareDataService: SharedDataService,
				private service: PaymentService,
				private route: ActivatedRoute,
				private layoutUtilsService: LayoutUtilsService,
				private load: LoadingService,
				private modalService: NgbModal, private  subheaderService: SubheaderService) {
	}


	ngOnInit() {
		this.route.params.subscribe(params => {
			if (params['report'] === 'report') {
				this.reportBoolean = true;
				this.subheaderService.setTitle('Report');
			} else {
				this.reportBoolean = false;
				this.subheaderService.setTitle('Payment');
			}

		});
		this.onTabChange(this.selectedTab)
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public doFilter = (value: string) => {
		this.paymentPagination.searchParameter = value.trim().toLocaleLowerCase();
		this.paymentList();
		this.filterName = '';

	}

	searchPayment() {
		this.loading = true;
		this.paymentList();
	}

	paymentList(val?) {
		if (val){
			this.paymentPagination.searchParameter = val
		}
		this.waiting = true;
		this.noData = false;
		this.service.getRefundList(this.paymentPagination).subscribe((data: any) => {
				this.dataSource.data = data.data.data as MerchantPaymentModel[];
				this.totalData = data.data.totalData
				console.log(this.test)
				this.loading = false;
				if (this.dataSource.data.length == 0) {
					this.waiting = false;
					this.noData = true;
				} else {
					this.waiting = false;
				}
			},
			error => {
				this.loading = false;
				this.waiting = false;
				this.errormsg = error.error.message;
				this.layoutUtilsService.showActionNotification(this.errormsg, MessageType.Create, 5000, true, false);

			}
		);
	}

	onPaginationChange(event: PageEvent) {
		this.paymentPagination.pageNumber = event.pageIndex + 1;
		this.paymentPagination.pageSize = event.pageSize;
		this.previousPageIndex = event.previousPageIndex + 1;
		this.paymentList();
	}

	view(id,remark) {
		this.router.navigate(['/payment/view/' + id],{queryParams: {remark :remark} });
	}

	reloadList() {
		this.paymentPagination.filter.fromDate = '';
		this.paymentPagination.filter.toDate = '';
		this.paymentPagination.searchParameter = '';
		this.paymentList();
	}

	tst(id) {
		this.terminalIds.push(id);
		this.shareDataService.setShareData(this.terminalIds);
	}

	ngModelChangeStartDate(result): void {
		this.paymentPagination.filter.fromDate = this.formatDate(result);
	}

	ngModelChangeEndDate(result): void {
		this.paymentPagination.filter.toDate = this.formatDate(result);
	}

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

		return [year, month, day].join('-');
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}

		this.selection.select(...this.dataSource.data);
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: any): string {
		if (!row) {
			return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.sn + 1}`;
	}

	test(val){
		console.log('test',val)
	}

	onTabChange(val){
		this.selectedTab = val
		this.paymentPagination.filter.fromDate = ''
		this.paymentPagination.filter.toDate = ''
		if (this.selectedTab == 0){
			delete this.paymentPagination.filter.refundStatus
		}
		if (this.selectedTab == 1){
			this.paymentPagination.filter.refundStatus = 'REFUND_REQUEST'
		}
		if (this.selectedTab == 2){
			this.paymentPagination.filter.refundStatus = 'REFUND_PROCEED'
		}
		if (this.selectedTab == 3){
			this.paymentPagination.filter.refundStatus = 'REFUNDED'
		}
		this.paymentList()
	}


}
