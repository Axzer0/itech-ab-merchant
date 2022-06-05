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
	selector: 'kt-payment-list',
	templateUrl: './payment-list.component.html',
	styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
	displayedColumns = ['createdTs', 'orderId', 'orderReference', 'totalAmount', 'orderStatus','transactionStatus', 'action'];
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


	//for checked status
	checkArr = []
	checkAll = false;
	settlementArr = [];

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

	paymentList() {
		this.waiting = true;
		this.noData = false;

		this.service.getPaymentList(this.paymentPagination).subscribe((data: any) => {
				this.checkArr = [];
				this.settlementArr = [];
				this.totalData = data.data.totalData
				this.dataSource.data = data.data.data as MerchantPaymentModel[];
				for (let i = 0 ;i < this.dataSource.data.length; i++){
					this.checkArr.push({selected: false})
				}
				console.log(this.checkArr)
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

	view(id) {
		this.router.navigate(['/payment/view/' + id]);
	}

	reloadList() {
		this.paymentPagination.filter.fromDate = '';
		this.paymentPagination.filter.toDate = '';
		this.paymentPagination.searchParameter = '';
		this.onTabChange(this.selectedTab)
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


	checkOne(val,index){
		this.checkArr[index].selected = !this.checkArr[index].selected
		let i = this.settlementArr.find( da => da.id == val.id)
		if (i){
			console.log('in splice')
			this.settlementArr.splice(this.settlementArr.indexOf(i),1)
		} else {
			this.settlementArr.push(val);
		}
		this.checkAll = this.settlementArr.length == this.checkArr.length;
		console.log(this.settlementArr,this.checkArr)
	}

	checkTotal(val){
		console.log(val)
		this.checkAll = !this.checkAll
		this.settlementArr = this.checkAll ? this.dataSource.data : [];
		for (let i = 0; i < this.checkArr.length; i++){
			this.checkArr[i].selected = this.checkAll
		}
		console.log(this.settlementArr,this.checkArr,this.checkAll)
	}

	createSettlement(){
		if (this.settlementArr.length == 0){
			this.layoutUtilsService.showActionNotification('Select a transaction to create settlement', MessageType.Create, 5000, true, false);
			return
		}
		let arr = []
		let total = 0
		for (let i = 0; i< this.settlementArr.length;i++){
			arr.push(this.settlementArr[i].id)
			total += this.settlementArr[i].totalAmount
			console.log(this.settlementArr[i].totalAmount,total)
		}
		let t = total.toFixed(2)
		this.router.navigate(['/settlement/create'],{ queryParams: {id: arr,total: t}}).then()
	}

	onTabChange(val){
		if (this.displayedColumns.indexOf('select') == 0)
		{
			this.displayedColumns.splice(0,1)
		}
		this.selectedTab = val
		this.paymentPagination.filter.fromDate = ''
		this.paymentPagination.filter.toDate = ''
		switch (this.selectedTab){
			case 0: delete  this.paymentPagination.filter.transactionStatus;break;
			case 1: this.paymentPagination.filter.transactionStatus = 'CREATED';break;
			case 2:
				this.paymentPagination.filter.transactionStatus = 'SUCCESSFUL';
				this.displayedColumns.unshift('select')
				break;
			case 3: this.paymentPagination.filter.transactionStatus= 'CANCELLED';break;
			case 4: this.paymentPagination.filter.transactionStatus = 'REJECTED';break;
			case 5: this.paymentPagination.filter.transactionStatus = 'FAILED';break;
		}
		this.paymentList()
	}
}
