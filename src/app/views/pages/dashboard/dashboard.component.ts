import {Transactions} from '../accounts/model/transactions.model';
// Angular
import {Component, OnInit, ViewChild} from '@angular/core';
import * as chartData from '../shared/data/chart';
import {doughnutData, pieData} from '../shared/data/chart';
// Lodash
import {shuffle} from 'lodash';
// Services
// Widgets model
import {LayoutConfigService, SparklineChartOptions} from '../../../core/_base/layout';
import {EnvironmentImgConfigService} from '../shared/environment-img-config.service';
import {AccountsService} from '../accounts/service/accounts.service';
import {AuthService} from '../../../core/auth';
import {ProfileDetails} from '../profile-details/model/profile-details.model';
import {config} from '../../../app.config';
import {TransactionSummary} from '../accounts/model/transaction-summary.model';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {SharedComponentService} from '../shared/shared-component.service';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {DashboardService} from "./service/dashboard.service";
import {MerchantPaymentModel, SearchModel} from "./model/dashboard.model";
import {LayoutUtilsService, MessageType} from "../../../core/_base/crud";
import {QueryFilter} from "../../../core/auth/_models/queryFilter.model";
import {PaymentService} from "../payment/service/payment.service";
import {Router} from "@angular/router";
import {LoadingService} from "../shared/loading.service";


@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	graphDataAmount: any = [{data: []},];
	graphLabel: any = [];
	waiting = false;
	noData = false;
	queryFilter = new QueryFilter();
	grossVolumeAmt;
	netVolumeAmt;
	loadSettlementAmt;
	nextSettlementAmt;
	errormsg;
	pageNumber = 1;
	previousPageIndex;
	sortParameter = '';
	sortType = '';
	searchPaymentModel = new SearchModel();
	searchParameter = '';
	payments = [];
	public doughnutData = doughnutData;
	public pieData = pieData;
	displayedColumns = ['createdTs', 'orderId', 'orderReference', 'orderAmount', 'description'];
	public dataSource = new MatTableDataSource<MerchantPaymentModel>();
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	chartOptions1: SparklineChartOptions;
	chartOptions2: SparklineChartOptions;
	chartOptions3: SparklineChartOptions;
	chartOptions4: SparklineChartOptions;

	totalData;
	userImage: string;
	fullName: string;
	status: string;
	customerId;
	cardNumber: string;
	// transactionSummary;
	transactionSummary: TransactionSummary;
	summary;
	// : Transactions[];
	customerDetails: ProfileDetails;
	accountHolder: string;
	profileImage = false;
	customerImage: string;
	today;
	yesterday;
	previousday;
	todayTransaction: Transactions[] = [];
	yesterdayTransaction: Transactions[] = [];
	previousdayTransaction: Transactions[] = [];

	pageSize = 5;
	pageIndex = 1;

	constructor(
		private paymentService: PaymentService,
		private router: Router,
		private layoutConfigService: LayoutConfigService,
		private environmentImgConfigService: EnvironmentImgConfigService,
		private accountsService: AccountsService,
		private auth: AuthService,
		private dashboardService: DashboardService,
		private layoutUtilsService: LayoutUtilsService,
		private dbService: NgxIndexedDBService,
		private loadingService: LoadingService,
		private sharedComponentService: SharedComponentService
	) {
		this.userImage = localStorage.getItem('profile');
		// this.fullName = localStorage.getItem('fullName');
		this.status = localStorage.getItem('status');
	}

	// lineChart
	public lineChartData = chartData.lineChartData;
	public lineChartLabels = chartData.lineChartLabels;
	public lineChartOptions = chartData.lineChartOptions;
	public lineChartColors = chartData.lineChartColors;
	public lineChartLegend = chartData.lineChartLegend;
	public lineChartType = chartData.lineChartType;

	// lineChart
	public smallLine2ChartData = chartData.smallLine2ChartData;
	public smallLine2ChartLabels = chartData.smallLine2ChartLabels;
	public smallLine2ChartOptions = chartData.smallLine2ChartOptions;
	public smallLine2ChartColors = chartData.smallLine2ChartColors;
	public smallLine2ChartLegend = chartData.smallLine2ChartLegend;
	public smallLine2ChartType = chartData.smallLine2ChartType;

	// lineChart
	public smallLine3ChartData = chartData.smallLine3ChartData;
	public smallLine3ChartLabels = chartData.smallLine3ChartLabels;
	public smallLine3ChartOptions = chartData.smallLine3ChartOptions;
	public smallLine3ChartColors = chartData.smallLine3ChartColors;
	public smallLine3ChartLegend = chartData.smallLine3ChartLegend;
	public smallLine3ChartType = chartData.smallLine3ChartType;
	dashboardServiceChargeBreakdown: any;


	ngOnInit(): void {
		this.dashboardData();
		this.userImage = localStorage.getItem('profile');
		this.chartOptions1 = {
			data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
			color: this.layoutConfigService.getConfig('colors.state.brand'),
			border: 3
		};
		this.chartOptions2 = {
			data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
			color: this.layoutConfigService.getConfig('colors.state.danger'),
			border: 3
		};
		this.chartOptions3 = {
			data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
			color: this.layoutConfigService.getConfig('colors.state.success'),
			border: 3
		};
		this.chartOptions4 = {
			data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
			color: this.layoutConfigService.getConfig('colors.state.primary'),
			border: 3
		};



		// this.getTransactionList();
	}

	dashboardData(val?) {
		console.log(val)
		this.loadingService.display(true)
		this.dashboardService.dashboardData(val).subscribe(data => {
			this.loadingService.display(false)
			this.dashboardServiceChargeBreakdown = data.data.dashboardServiceChargeBreakdown[0]
			this.grossVolumeAmt = data.data.dashboardData[0].amount;
			this.netVolumeAmt = data.data.dashboardData[1].amount;
			this.loadSettlementAmt = data.data.dashboardData[2].amount;
			this.nextSettlementAmt = data.data.dashboardData[3].amount;

			this.dataSource.data = data.data.transactionList;
			this.totalData = data.data.totalTransactionList;
			console.log('transactionDatasource', data.data.transactionList);


			var i;
			this.graphDataAmount = [{data: []},];
			this.graphLabel = []
			for (i = 0; i < data.data.graphData.data.length; i++) {
				console.log(data.data.graphData)
				this.graphDataAmount[0].data.push(data.data.graphData.data[i].value);
				this.graphLabel.push(data.data.graphData.data[i].label);
			}

			// this.forGraph(data.data.graphData)
			//for graph

			//for table data


		},error => {
			this.loadingService.display(false)
		})
	}

	getUsername() {
		return this.fullName = localStorage.getItem('fullName');
	}

	getStatus() {
		return localStorage.getItem('status');
	}

	getDefaultUserImage() {
		if (!localStorage.getItem('profile') || localStorage.getItem('profile') === 'http://103.198.9.159:8090/customerapi/api/v1/file/') {
			return this.environmentImgConfigService.getUserDefaultAvatar();
		} else {
			return this.userImage = localStorage.getItem('profile');
		}
	}

	getCustomerId() {
		var secrectKey = (Math.floor(Math.random() * (999999999 - 100000000)) + 100000000).toString();
		if (localStorage.getItem('customerId')) {
			var key = secrectKey + (localStorage.getItem('customerId')).toString();
		}
		var string = btoa(key);
		this.customerId = encodeURIComponent(string);
		localStorage.setItem('uid', this.customerId);
	}

	getDefaultCardImage() {
		return this.environmentImgConfigService.getDefaultCardImage();
	}

	getCardNumber() {
		if (localStorage.getItem('cardNo') === '' || localStorage.getItem('cardNo') == null) {
			return this.cardNumber = 'Not Assign Yet.';
		}
		return this.cardNumber = localStorage.getItem('cardNo');
	}

	getTransactionSummary() {
		this.accountsService.getTransactionSummaryReport().subscribe(
			(res: any) => {
				// this.summary = res.body.data.transactions;
				this.transactionSummary = res.body.data;
				// this.calculateTransactionSummaryHistory();
				// console.log('transaction summary:: ', this.summary);
				// console.log('this.transactionSummary :: ', this.transactionSummary);
			}, error => {
				console.log('transaction summmary error: ', error);
			}
		);
	}

	getTransactionList() {
		this.sharedComponentService.getTransactionList({
			pageSize: this.pageSize,
			pageNumber: this.pageIndex,
			sortParamater: "",
			sortType: "",
			searchParamater: "",
			filter: {
				statDateTime: this.formatStartDateAndTime(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
				endDateTime: this.formatStartDateAndTime(new Date(Date.now())),
				transactionType: ""
			}
		}).subscribe(
			data => {
				this.summary = data.body.data.data as Transactions[];
				// this.calculateTransactionSummaryHistory();
				console.log('transaction list data data data: ', data);
				console.log('transaction list data: ', this.transactionSummary);
			}, error => {
				console.log('transaction list error: ', error);
			}
		);
	}


	calculateTransactionSummaryHistory() {
		var todayDate = new Date();
		todayDate;
		this.today = todayDate;
		this.todayTransaction = this.summary.filter(tr => tr.createdAt.slice(0, 10) === this.formatStartDateAndTime(this.today));
		console.log('todayTransaction: ', this.todayTransaction);
		// console.log('today Date: ', this.formatStartDateAndTime(todayDate));
		todayDate.setDate(todayDate.getDate() - 1);
		this.yesterday = todayDate;
		this.yesterdayTransaction = this.summary.filter(tr => tr.createdAt.slice(0, 10) === this.formatStartDateAndTime(this.yesterday));
		console.log('yesterdayTransaction: ', this.yesterdayTransaction);
		// console.log('yesterday Date: ', this.formatStartDateAndTime(this.yesterday));
		todayDate.setDate(todayDate.getDate() - 1);
		this.previousday = todayDate;
		this.previousdayTransaction = this.summary.filter(tr => tr.createdAt.slice(0, 10) <= this.formatStartDateAndTime(this.previousday));
		console.log('previousdayTransaction: ', this.previousdayTransaction);
		// console.log('day Before Yesterday Date: ', this.formatStartDateAndTime(this.previousday));
	}

	formatStartDateAndTime(date) {
		var d = date,
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
		// var time = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours())
		// 	+ ":" + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes())
		// 	+ ":" + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());

		if (month.length < 2)
			month = '0' + month;
		if (day.length < 2)
			day = '0' + day;
		return [year, month, day].join('-');
		// return [year, month, day].join('-') + ' ' + time;
	}

	getUserDetails() {
		this.auth.getProfileData().subscribe(
			res => {
				localStorage.setItem('customerId', res.body.data.customerId);
				localStorage.setItem('status', res.body.data.customerStatus);
				localStorage.setItem('profile', config.serverFileApiUrl.concat(res.body.data.profilePhoto));
				localStorage.setItem('fullName', res.body.data.firstName.concat(' ' + res.body.data.middleName + ' ' + res.body.data.lastName));
				localStorage.setItem('cardNo', res.body.data.cardNo);
				this.customerDetails = res.body.data;
				if (res.body.data.profilePhoto != '' || res.body.data.profilePhoto != null || res.body.data.profilePhoto != undefined) {
					this.profileImage = true;

					this.customerImage = config.serverFileApiUrl.concat(res.body.data.profilePhoto);
				} else {
					this.profileImage = false;
				}
				console.info('customer details::: ', this.customerDetails);
			}, error => {
				console.log('Error while fetching customer details: ', error);
			}
		);
	}

	navigateToPayment(){
		this.router.navigate(['/payment/list']);
	}
}
