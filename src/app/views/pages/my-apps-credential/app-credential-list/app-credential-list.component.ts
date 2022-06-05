import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {PaymentGatewayModel} from "../../merchant-page-setup/model/page-setup.model";
import {PageSetupService} from "../../merchant-page-setup/service/page-setup.service";
import {Router} from "@angular/router";
import {SharedDataService} from "../../shared/shared-data.service";
import {SubheaderService} from "../../../../core/_base/layout";
import {QueryFilter} from "../../../../core/auth/_models/queryFilter.model";
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";

@Component({
	selector: 'kt-app-credential-list',
	templateUrl: './app-credential-list.component.html',
	styleUrls: ['./app-credential-list.component.scss'],
})
export class AppCredentialListComponent implements OnInit {
	displayedColumns = ['merchantId', 'applicationId', 'applicationName', 'applicationType', 'expiredTs','action'];
	public dataSource = new MatTableDataSource<PaymentGatewayModel>();
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort
	queryFilter = new QueryFilter();
	previewModal = false;
	agentPreviewData;
	filterName;
	waiting = false;
	noData = false;
	total;
	rand = 1

	pageSizeOptions = []


	constructor(private service: PageSetupService,
				private router: Router,
				private sharedDataService: SharedDataService,
				public dialog: MatDialog,
				private  subheaderService: SubheaderService) {
		this.subheaderService.setTitle('My Apps & Credential');
	}


	ngOnInit() {
		this.getAppCredentialList();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public doFilter = (value: string) => {
		this.queryFilter.searchParameter = value.trim().toLocaleLowerCase();
		this.filterName = '';
		this.getAppCredentialList();

	}

	getAppCredentialList(): void {
		this.waiting = true;
		this.dataSource = new MatTableDataSource<PaymentGatewayModel>();
		this.service.appCredentialList(this.queryFilter).subscribe((data: any) => {
				this.dataSource = data.data.data;
				this.total = data.data.totalData;
				this.calcForPage()
				this.waiting = false
				if (data.data.data.length == 0){
					this.noData = true
				}
			},
			error => {
				console.log("Error", error);
				this.waiting = false
				this.noData = true
			}
		)
	}

	reloadList() {
		this.queryFilter.searchParameter = '';
		this.getAppCredentialList();
	}

	view(val){
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '750px',
			data: {obj: val},
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	onPaginationChange(val){
		console.log(val);
		this.queryFilter.pageNumber = (val.pageIndex + 1)
		this.queryFilter.pageSize = val.pageSize
		this.getAppCredentialList();
	}

	calcForPage(){
		this.pageSizeOptions = []
		let t = Math.ceil(this.total/10);
		for (let i = 0 ; i < t ; i++ ){
			this.pageSizeOptions.push(10*(i+1))
		}
	}


}
