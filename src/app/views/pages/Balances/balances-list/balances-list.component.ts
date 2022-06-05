import {ChangeDetectorRef, Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogRef,
	MatPaginator,
	MatSort,
	MatTableDataSource,
	PageEvent
} from "@angular/material";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SubheaderService} from "../../../../core/_base/layout";
import {GenericDialogInterface} from "../../shared/components/generic-approve-reject-modal/interface/generic-dialog.interface";
import {LoadingService} from "../../../../core/auth/_services/loading.service";
import {SettlementService} from "../service/settlement.service";
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";
import {GenericApproveRejectComponent} from "../../shared/components/generic-approve-reject-modal/generic-approve-reject.component";
import {SettlementPagination} from "../model/settlement.model";
import {Router} from "@angular/router";

@Component({
	selector: 'kt-balances-list',
	templateUrl: './balances-list.component.html',
	styleUrls: ['./balances-list.component.scss']
})
export class BalancesListComponent implements OnInit {
	displayedColumns = ['referenceId', 'settlementDate', 'batchNumber', 'remarks', 'status', 'action'];
	public dataSource = new MatTableDataSource();
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	previewModal = false;
	agentPreviewData;
	settlementPagination = new SettlementPagination();
	errormsg;
	totalData;
	waiting = false;
	noData = false;
	filterName: any;
	selectedTab = 0

	constructor(@Optional() public dialogRef: MatDialogRef<BalancesListComponent>,
				@Optional() @Inject(MAT_DIALOG_DATA) public data,
				public dialog: MatDialog,
				private service: SettlementService,
				private modalService: NgbModal,
				private  subheaderService: SubheaderService,
				private cdr: ChangeDetectorRef,
				private router: Router,
				private layoutUtilsService: LayoutUtilsService,
				private loadingService: LoadingService) {
		this.subheaderService.setTitle('Settlement');
	}


	ngOnInit() {
		this.onTabChange(this.selectedTab);
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();

	}

	getSettlementList(): void {
		this.waiting = true;
		this.noData = false;
		this.dataSource = new MatTableDataSource<any>();
		this.service.settlementList(this.settlementPagination).subscribe((data: any) => {
				this.dataSource.data = data.data.data;
				this.totalData = data.data.totalData;
				if (data.data.data.length === 0) {
					this.waiting = false;
					this.noData = true;
				} else {
					this.waiting = false;
				}
			},
			error => {
				this.waiting = false;
				this.errormsg = error.error.message;
				this.layoutUtilsService.showActionNotification(this.errormsg, MessageType.Create, 5000, true, false);


			}
		)
	}

	preview(data) {
		this.router.navigate(['/settlement/view/' + data]);
	}

	approve(val) {
		const dialogInterface: GenericDialogInterface = {
			dialogHeader: 'Approve Transaction',
			dialogContent: 'Are you sure you want to approve this transaction?',
			id: val,
			type: 'approve',
			callbackMethod: (dat) => {
				this.loadingService.display(true);
				this.service.approveReject(val)
					.subscribe(res => {
						this.loadingService.display(false);
						this.layoutUtilsService.showActionNotification('Approved Successfully', MessageType.Create, 5000, true, false);
						this.cdr.detectChanges();
					}, error => {
						this.loadingService.display(false);
						this.layoutUtilsService.showActionNotification(this.errormsg, MessageType.Create, 5000, true, false);
					});
			}
		};
		const dialogRef = this.dialog.open(GenericApproveRejectComponent, {
			disableClose: true,
			data: dialogInterface,
			width: '32%',
			position: {top: '20px'}
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	reject(val) {
		const dialogInterface: GenericDialogInterface = {
			dialogHeader: 'Are you sure you want to reject?',
			dialogContent: '',
			id: val,
			type: 'reject',
			callbackMethod: (dat) => {
				this.loadingService.display(true);
				this.service.approveReject({remarks: dat.remarks})
					.subscribe(res => {
						this.loadingService.display(false);
						this.layoutUtilsService.showActionNotification('Rejected Successfully', MessageType.Create, 5000, true, false);
						this.cdr.detectChanges();
					}, error => {
						this.loadingService.display(false);
						this.layoutUtilsService.showActionNotification(this.errormsg, MessageType.Create, 5000, true, false);
					});
			}
		};
		const dialogRef = this.dialog.open(GenericApproveRejectComponent, {
			disableClose: true,
			data: dialogInterface,
			width: '50%',
			position: {top: '20px'}
		});
		dialogRef.afterClosed().subscribe(result => {
		});

	}

	onPaginationChange(event: PageEvent) {
		this.settlementPagination.pageNumber = event.pageIndex + 1;
		this.settlementPagination.pageSize = event.pageSize;
		this.getSettlementList();
	}

	reloadList(){
		this.getSettlementList()
	}


	onTabChange(val){
		this.selectedTab = val
		this.settlementPagination.filter.fromDate = ''
		this.settlementPagination.filter.toDate = ''
		this.settlementPagination.filter.merchantId = ''
		this.settlementPagination.filter.batchNumber = ''
		if (this.selectedTab == 0){
			this.settlementPagination.searchParameter = 'DUE'
		}
		if (this.selectedTab == 1){
			this.settlementPagination.searchParameter = 'IN_PROGRESS'
		}
		if (this.selectedTab == 2){
			this.settlementPagination.searchParameter = 'RECONCILED'
		}
		this.getSettlementList()
	}

}
