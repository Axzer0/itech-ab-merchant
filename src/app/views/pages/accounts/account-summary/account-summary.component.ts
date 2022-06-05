import { Component, OnInit } from '@angular/core';
import {SubheaderService} from '../../../../core/_base/layout';

@Component({
  selector: 'kt-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss']
})
export class AccountSummaryComponent implements OnInit {

  constructor(
    private  subheaderService: SubheaderService
  ) { }
  
  ngOnInit() {
    this.setSubHeaderTitle();
  }
  
  setSubHeaderTitle() {
    this.subheaderService.setTitle('Account Summary');
  }

}
