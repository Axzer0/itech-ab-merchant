import { Component, OnInit } from '@angular/core';
import {SubheaderService} from '../../../../core/_base/layout';
import { EnvironmentImgConfigService } from '../../shared/environment-img-config.service';

// export interface Section {
//   name: string;
//   updated: Date;
//   mnt: string;
// }

@Component({
  selector: 'kt-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  
  // lists: Section[] = [
  //   {
  //     name: 'To Recipeint name here',
  //     updated: new Date('05/16/20'),
  //     mnt: 'MTn 19,000.00'
  //   },
  //   {
  //     name: 'To Recipeint name here',
  //     updated: new Date('05/16/20'),
  //     mnt: 'MTn 19,000.00'
  //   },
  //   {
  //     name: 'To Recipeint name here',
  //     updated: new Date('05/16/20'),
  //     mnt: 'MTn 19,000.00'
  //   },
  //   {
  //     name: 'To Recipeint name here',
  //     updated: new Date('05/16/20'),
  //     mnt: 'MTn 19,000.00'
  //   },{
  //     name: 'To Recipeint name here',
  //     updated: new Date('05/16/20'),
  //     mnt: 'MTn 19,000.00'
  //   },
  //   {
  //     name: 'To Recipeint name here',
  //     updated: new Date('05/16/20'),
  //     mnt: 'MTn 19,000.00'
  //   },
  // ];

  // value: string;

  constructor(
    private  subheaderService: SubheaderService,
    private environmentImgConfigService: EnvironmentImgConfigService,
  ) { }
  
  ngOnInit() {
    this.setSubHeaderTitle();
  }
  
  getDefaultUserImage() {
		return this.environmentImgConfigService.getUserDefaultAvatar();
  }
  
  setSubHeaderTitle() {
    this.subheaderService.setTitle('Payment');
  }


}









/**
 * @ By paribartan kalathoki
 * 
 * 
 * @Backup for payment
 * 
 * 
 * <mat-tab-group>
    <mat-tab label="Upcoming">
      <ng-template matTabContent>
        <div class="row">
          <div class="col-sm-12">
            <div mat-subheader>Payments Approval</div>
            <div mat-line style="margin: 0 15px; font-size: 14px; font-family: sans-serif;opacity: 0.8;">
              Action required
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <mat-list>              
              <mat-list-item style="background: #f2f0f0; border-radius: 5px;">
                <img height="65" width="65" [src]="getDefaultUserImage()" class="img-fluid" alt="img">
                <span style="margin-left: 18px;"> 
                  <div mat-line>{{lists[0].name}}</div>
                  <div mat-line> <span style="    color: rgb(248, 153, 10); font-size: 15px; font-family: sans-serif;">
                    Awaiting Approval</span> &nbsp; From Account Name
                  </div>
                  <div mat-line> {{lists[0].updated | date}}</div>
                </span>
                <p class="sent-right-info">{{lists[0].mnt}}</p>
              </mat-list-item>
            </mat-list>
            <div style="color: #3b65f6; margin: 10px 15px; font-size: 14px; font-family: sans-serif;opacity: 0.8;" 
              class="view-all-payments"><a href="javascript:;">View all 12 payments</a></div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12">
            <div mat-subheader>Scheduled</div>
            <div mat-subheader class="pull-right"><a href="javascript:;">Schedule a payment</a></div>
            <div mat-line style="margin: 0 15px; font-size: 14px; font-family: sans-serif;opacity: 0.8;">
              This month
            </div>
            <mat-list>
              <mat-list-item style="background: #f2f0f0; border-radius: 5px;">
                <img height="65" width="65" [src]="getDefaultUserImage()" class="img-fluid" alt="img">
                <span style="margin-left: 18px;"> 
                  <div mat-line>{{lists[0].name}}</div>
                  <div mat-line>{{lists[0].updated | date}} &nbsp; From Account Name</div>
                </span>
                <p class="sent-right-info">{{lists[0].mnt}}</p>
              </mat-list-item>
            </mat-list>
            <div style="color: #3b65f6; margin: 10px 15px; font-size: 14px; font-family: sans-serif;opacity: 0.8;" 
              class="view-all-payments"><a href="javascript:;">View all 3 payments</a></div>
          </div>
        </div>

      </ng-template>
    </mat-tab>
    <mat-tab label="Sent">
      <ng-template matTabContent>
        <!-- Content 2 - Loaded -->
        <!-- <div class="row">
          <div class="col-sm-6 col-md-6">
              <p style="font-size: 14px;color: #747477">Payments Done <a style="color: #3b65f6;" href="javascript:;">All</a></p>
          </div>
          <div class="col-sm-6 col-md-6">
            <p style="color: #3030f2; font-size: 14px;" class="float-right"><a href="javascript:;">Make New Payment</a></p>
          </div>
        </div> -->
        <div class="row">
          <div class="col-sm-12">
            <div mat-subheader>Payments Done <a style="color: #3b65f6;" href="javascript:;"> &nbsp;All</a></div>
              <div mat-subheader class="pull-right"><a href="javascript:;">Make New Payment</a></div>
            <mat-list>
              <!-- <div mat-subheader>Payments Done <a style="color: #3b65f6;" href="javascript:;"> &nbsp;All</a></div>
              <div mat-subheader class="pull-right"><a href="javascript:;">Make New Payment</a></div> -->
              <mat-list-item *ngFor="let list of lists">
                <img height="65" width="65" [src]="getDefaultUserImage()" class="img-fluid" alt="img">
                <span style="margin-left: 18px;"> 
                  <div mat-line>{{list.name}}</div>
                  <div mat-line> {{list.updated | date}} From Account Name </div>
                </span>
                <p class="sent-right-info">{{list.mnt}}</p>
                <!-- <div mat-line>{{list.name}}</div> -->
                <!-- <div mat-line> {{list.updated | date}} </div> -->
                <mat-divider style="margin: 0 100px;"></mat-divider>
              </mat-list-item>
            </mat-list>
          </div>
        </div>
      </ng-template>
    </mat-tab>
    <mat-tab label="Fast Pay">
      <ng-template matTabContent>
        <div class="row">
          <div class="col-sm-12">
            <div id="fast-pay-header" mat-subheader>Payments Instantly</div>
            <div mat-subheader class="pull-right">
              <mat-form-field class="example-form-field">
                <mat-label style="color: #1f1df4;">Search Here</mat-label>
                <input matInput type="text" placeholder="enter search value" [(ngModel)]="value" autocomplete="off">
                <button mat-button *ngIf="value" matSuffix mat-icon-button aria-label="Clear" (click)="value=''">
                  <mat-icon matTooltip="Clear input">close</mat-icon>
                </button>
              </mat-form-field>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <!-- <mat-grid-list cols="3" rowHeight="90px">
              <mat-grid-tile *ngFor="let list of lists">
                <img height="65" width="65" [src]="getDefaultUserImage()" class="img-fluid" alt="img">
                <span style="margin-left: 18px;"> 
                  <div mat-line>Municipality Maputo</div>
                </span>
              </mat-grid-tile>
            </mat-grid-list> -->
            <mat-list>
              <mat-list-item id="a" *ngFor="let list of lists">
                <img height="65" width="65" [src]="getDefaultUserImage()" class="img-fluid" alt="img">
                <span style="margin-left: 18px;"> 
                  <div class="fast-pay-info" mat-line>Municipality Maputo</div>
                </span>
                <!-- <mat-divider style="margin: 0 100px;"></mat-divider> -->
              </mat-list-item>
            </mat-list>
          </div>
        </div>
      </ng-template>
    </mat-tab>
  </mat-tab-group>


 * 
 * 
 */