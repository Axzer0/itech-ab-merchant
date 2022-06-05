import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PageSetupModule} from "../page-setup.module";
import {PageDisplayControl, PageSetupModel} from "../model/page-setup.model";
import {PageSetupService} from "../service/page-setup.service";
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../shared/shared-data.service";
import {DomSanitizer} from "@angular/platform-browser";
import { Location } from '@angular/common'
import {LoadingService} from "../../shared/loading.service";

@Component({
	selector: 'kt-page-setup-add',
	templateUrl: './page-setup-add.component.html',
	styleUrls: ['./page-setup-add.component.scss']
})
export class PageSetupAddComponent implements OnInit {
	previewData = false;
	formData: FormData = new FormData();
	message;
	applicationId;
	loading = false;
	loadingDisplayControl = false;
	companyLogo: string;
	selectedCompanyLogo: File;
	companyLogoImg:any  = 'assets/images/logo/b4.png';
	pageSetupModel = new PageSetupModel();
	pageDisplayControl = new PageDisplayControl();
	visiblePayerInfo = true
	alert = false;

	dummyData = {
		companyName: 'Dummy company',
		companyLogo: 'assets/images/logo/EHC.png',
		orderRef: '45Psd2PoSds',
		subTotal: '0',
		discount: '1200',
		discountName: 'jargon',
		shipping: '500',
		saleTax: '154',
		serviceCharge: '250',
		processFee: '250',
		total: '0'
	}

	item = {
		name: 'product one',
		rate: '1500',
		quantity: '2',
		total: '3000'
	}

	items = []
	tabIndex = 0
	routeId;
	editState = false;

	constructor(private pageSetupService: PageSetupService,
				private route: ActivatedRoute,
				private router: Router,
				private cdr: ChangeDetectorRef,
				private sanitizer: DomSanitizer,
				private location: Location,
				private loadingService: LoadingService,
				private  layoutUtilsService: LayoutUtilsService,) {
	}

	ngOnInit() {

		for (let i =0 ; i < 4; i++){
			this.items.push(this.item);
			this.dummyData.subTotal = (Number(this.dummyData.subTotal) + Number(this.items[i].total)).toString()
		}
		this.dummyData.saleTax = ((Number(this.dummyData.subTotal)*17)/100).toString()
		this.dummyData.total = ( (
				Number(this.dummyData.subTotal) +
				Number(this.dummyData.processFee) +
				Number(this.dummyData.saleTax) +
				Number(this.dummyData.processFee) +
				Number(this.dummyData.shipping) +
				Number(this.dummyData.subTotal)
			) - Number(this.dummyData.discount)
			).toString()

		this.route.params.subscribe(params => {
			this.routeId = params['id'];
		});

		if(this.routeId){
			this.previewData = true;
			this.pageSetupService.getPreviewSetupById(this.routeId).subscribe( da => {
				console.log('Success',da)
			}, error => {
				console.log('error',error)
			})
			SharedDataService.previewData.subscribe(
				res => {
					this.pageSetupModel.companyName = res.companyName;
					this.applicationId = res.id;
					this.companyLogoImg =  this.sanitizer.bypassSecurityTrustResourceUrl('data:Image/*;base64,' + res.companyLogo);
				})
		}
	}

	back() {
		this.location.back()
	}

	reset() {

	}

	onSumbit() {
		this.loading = true;
		this.loadingService.display(true);
		this.formData.append('companyName', this.pageSetupModel.companyName);
		this.formData.append('companyLogo', this.selectedCompanyLogo == undefined || null ? '' : this.selectedCompanyLogo);
		this.pageSetupService.addPageSetup(this.formData).subscribe(data => {
			this.loading = false;
			this.loadingService.display(false);
			this.message = data.body.message;
			console.log(data.body.message)
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Delete, 5000, true, false);
			this.router.navigate(['/payment/form/list']);
			this.cdr.detectChanges()
		}, error => {
			console.log(error)
			this.loading = false;
			this.loadingService.display(false);
			this.message = error.body.error.errorMessage;
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Create, 5000, true, false);

		})
	}

	uploadCompanyLogo(event) {
		// this.formData = new FormData();
		let fileList: FileList = event.target.files;
		console.log('fileList: ', fileList);
		if (fileList.length > 0) {
			let file: File = fileList[0];
			this.selectedCompanyLogo = file;
			console.log('file: ', file);
			var reader = new FileReader();
			this.companyLogo = file.name;
			reader.onload = (event: any) => {
				this.companyLogoImg = event.target.result;
				this.cdr.detectChanges();
				console.log("companyLogoImg", this.companyLogoImg);
			}
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	update(){
		this.loading = true;
		this.formData = new FormData();
		this.loadingService.display(true);
		this.formData.append('companyName', this.pageSetupModel.companyName);
		this.formData.append('companyLogo', this.selectedCompanyLogo == undefined || null ? '' : this.selectedCompanyLogo);
		this.pageSetupService.updatePageSetup(this.formData, this.applicationId).subscribe(data => {
			this.loading = false;
			this.loadingService.display(false);
			this.message = data.body.data.message;
			this.router.navigate(['/payment/form/list']);
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Delete, 5000, true, false);
		}, error => {
			this.loading = false;
			this.loadingService.display(false);
			this.message = error.body.error.errorMessage;
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Create, 5000, true, false);

		})
	}

	submitDisplayControl(){
		this.loadingDisplayControl = true;
		let formData = new FormData();
		this.loadingService.display(true);
		formData.append('companyInformation',String(this.pageDisplayControl.companyInformation));
		formData.append('purchaseDetails',String(this.pageDisplayControl.purchaseDetails));
		formData.append('customerInformation',String(this.pageDisplayControl.customerInformation));
		this.pageSetupService.updatePageSetupDisplay(this.routeId,formData).subscribe(data =>{
			this.loadingDisplayControl = false;
			this.loadingService.display(false);
			this.message = data.body.data.message;
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Delete, 5000, true, false);
			if (!this.previewData){
				this.router.navigate(['/payment/form/list']);
			}
		}, error => {
			this.loadingDisplayControl = false;
			this.loadingService.display(false);
			this.message = error.body.error.errorMessage;
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Create, 5000, true, false);

		})
	}

	showPayerInfo() {
		this.visiblePayerInfo = true;
	}

	minimizePayerInfo() {
		this.visiblePayerInfo = false;
	}

	onAlertClose(val){
		this.alert = false
	}

}
