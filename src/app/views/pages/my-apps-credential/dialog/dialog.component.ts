import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PageSetupService} from "../../merchant-page-setup/service/page-setup.service";
import {LoadingBarComponent} from "@ngx-loading-bar/core";
import {LoadingService} from "../../shared/loading.service";
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";

@Component({
  selector: 'kt-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

	javaJson = {currency: "MZM",orderReference:"56748765443",  orderAmount:"100",description: "Shopping Cart Items Pay",approveUrl:
			"http://103.198.9.159:8080/shopping/#/bill-payment",
		declineUrl: "http://103.198.9.159:8080/shopping/#/bill-payment",
		cancelUrl: "http://103.198.9.159:8080/shopping/#/bill-payment",purchaseUnitRequest:    {          tax: "470",serviceCharge: "20",discountAmount: "10",shippingAmount: "125",
			itemRequest: [{name: "july27430test",
				description: "Refrigerator Buy",quantity: "2",
				unitAmount: "10000"                },                {
				name: "TV",                    description: "TV Buy",
				quantity: "1",                    unitAmount: "30000"
			}            ]        }}

	curlJson = {
		currency: "MZM",
		orderReference: "56748765443",
		orderAmount:"100",
		description: "Shopping Cart Items Pay",
		approveUrl: "http://103.198.9.159:8080/shopping/#/bill-payment",
		declineUrl: "http://103.198.9.159:8080/shopping/#/bill-payment",
		cancelUrl: "http://103.198.9.159:8080/shopping/#/bill-payment",
		purchaseUnitRequest:
			{
				tax: "470",
				serviceCharge: "20",
				discountAmount: "10",
				shippingAmount: "125",
				itemRequest: [
					{
						name: "july27430test",
						description: "Refrigerator Buy",
						quantity: "2",
						unitAmount: "10000"
					}
				]
			}
	}



	label = ['Java','cURL']


  constructor( public dialogRef: MatDialogRef<DialogComponent>,
			   @Inject(MAT_DIALOG_DATA) public data: any,
			   private loadingService: LoadingService,
			   private layoutUtilsService: LayoutUtilsService,
			   public service: PageSetupService) { }

  ngOnInit() {
  }

  updateCredential(){
	  this.loadingService.display(false)
	  this.service.updateCredential({id: this.data.obj.id}).subscribe( da => {
	  	this.loadingService.display(false);
	  	this.data.obj.applicationName = da.body.data.applicationName;
	  	this.data.obj.applicationType = da.body.data.applicationType;
	  	this.data.obj.applicationId = da.body.data.applicationId;
	  	this.data.obj.applicationSecret = da.body.data.applicationSecret;
	  	this.layoutUtilsService.showActionNotification(da.body.message, MessageType.Create, 5000, true, false);
		}, error => {
	  	this.loadingService.display(false);
	  	console.log('Error',error);
	  	this.layoutUtilsService.showActionNotification('Error', MessageType.Create, 5000, true, false);

	  })
  }
}
