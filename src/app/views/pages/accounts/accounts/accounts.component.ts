import { Component, OnInit } from '@angular/core';
import {SubheaderService} from '../../../../core/_base/layout';

@Component({
  selector: 'kt-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(
    private  subheaderService: SubheaderService
  ) { }

  ngOnInit() {
    this.setSubHeaderTitle();
  }

  setSubHeaderTitle() {
    this.subheaderService.setTitle('Accounts');
  }

}
