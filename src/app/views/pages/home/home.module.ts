import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatIconModule, MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCardModule } from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatCardModule,
        HomeRoutingModule,
        FlexLayoutModule
    ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
