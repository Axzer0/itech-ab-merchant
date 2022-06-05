import { Component, OnInit } from '@angular/core';
import {SubheaderService} from '../../../../core/_base/layout';

@Component({
  selector: 'kt-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit {

  constructor(
    private  subheaderService: SubheaderService
  ) { }
  
  ngOnInit() {
    this.setSubHeaderTitle();
  }
  
  setSubHeaderTitle() {
    this.subheaderService.setTitle('Payment Summary');
  }

}
