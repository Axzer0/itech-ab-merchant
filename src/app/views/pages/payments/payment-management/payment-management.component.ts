import { Component, OnInit } from '@angular/core';
import {SubheaderService} from '../../../../core/_base/layout';

@Component({
  selector: 'kt-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss']
})
export class PaymentManagementComponent implements OnInit {

  constructor(
    private  subheaderService: SubheaderService
  ) { }
  
  ngOnInit() {
    this.setSubHeaderTitle();
  }
  
  setSubHeaderTitle() {
    this.subheaderService.setTitle('Payment Management');
  }

}
