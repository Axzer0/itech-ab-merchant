import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SubheaderService} from "../../../../core/_base/layout";
import {CustomersService} from "../service/customers.service";
import {QueryFilter} from "../../../../core/auth/_models/queryFilter.model";

//moved from removed folder agent
export class AgentListModel {
	fullName;
	username;
}


@Component({
	selector: 'kt-customers-list',
	templateUrl: './customers-list.component.html',
	styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
	displayedColumns = ['sn', 'fullName', 'email', 'phone', 'shippingAddress1', 'shippingAddress2'];
	public dataSource = new MatTableDataSource<AgentListModel>();
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	queryFilter = new QueryFilter();
	filterName;
	waiting = false;
	noData = false;
	totalData;

	constructor(private service: CustomersService, private modalService: NgbModal, private  subheaderService: SubheaderService) {
		this.subheaderService.setTitle('Customers');
	}


	ngOnInit() {
		this.getCustomersList();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public doFilter = (value: string) => {
		this.queryFilter.searchParameter = value.trim().toLocaleLowerCase();
		this.getCustomersList();
		this.filterName = '';

	}

	getCustomersList(): void {
		this.service.customersList(this.queryFilter).subscribe((data: any) => {
				this.dataSource.data = data.data.data;
				this.totalData = data.data.totalData
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

	onPaginationChange(event: PageEvent) {
		console.log('valll', event);
		this.queryFilter.pageNumber = event.pageIndex + 1;
		this.queryFilter.pageSize = event.pageSize;
		this.getCustomersList();
	}

	reloadList(){
		this.queryFilter.searchParameter = '';
		this.getCustomersList();
	}


}
