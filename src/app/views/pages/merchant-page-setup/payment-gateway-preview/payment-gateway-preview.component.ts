import { Component, OnInit } from '@angular/core';
import {SharedDataService} from "../../shared/shared-data.service";
import {DomSanitizer} from "@angular/platform-browser";
import { Location } from '@angular/common'

@Component({
  selector: 'kt-payment-gateway-preview',
  templateUrl: './payment-gateway-preview.component.html',
  styleUrls: ['./payment-gateway-preview.component.scss']
})
export class PaymentGatewayPreviewComponent implements OnInit {
previewData;
companyLogo:any  = 'assets/images/logo/inf.jpg';
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
  constructor(private sanitizer: DomSanitizer,private location: Location) { }

  ngOnInit() {
	  SharedDataService.previewData.subscribe(
		  res => {
			 this.previewData = res;
			 this.companyLogo = this.sanitizer.bypassSecurityTrustResourceUrl('data:Image/*;base64,' + res.companyLogo);
		  })
  }

	back(): void {
		this.location.back()
	}

}
