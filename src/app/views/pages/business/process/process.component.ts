import { Component, OnInit } from '@angular/core';
import {BusinessService} from "../service/business.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'kt-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

	merchantId;
	orderId;
	txnId;
	sessionId;
	err;
	suc;

  constructor(private service: BusinessService,private route: ActivatedRoute) { }

  ngOnInit() {
	  this.route.queryParams
		  .subscribe(params => {
				  console.log(params); // { order: "popular" }
				  this.merchantId = params.merchant;
				  this.sessionId = params.session;
				  this.txnId = params.txn;
				  this.orderId = params.order;
			  }
		  );
  	// this.merchantId = localStorage.getItem('merchantId');
  	// this.orderId = localStorage.getItem('orderId');
  	// this.txnId = localStorage.getItem('transactionId');
  	// this.sessionId = localStorage.getItem('sessionId');
  	this.processing();
  }


  processing(){
  	let data = { sessionId: this.sessionId };
  	this.service.processing(this.merchantId,this.orderId,this.txnId,data).subscribe( dat => {
  		console.log(dat);
		this.suc = dat;
		window.open(dat.data.approveUrl, "_self");

	}, error => {
  		console.log(error);
		this.err = error
	})
  }

}
