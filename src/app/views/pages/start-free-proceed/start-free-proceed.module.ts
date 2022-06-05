import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartFreeProceedRoutingModule } from './start-free-proceed-routing.module';
import { MatIconModule, MatListModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatCardModule } from '@angular/material';
import { StartFreeProceedComponent } from './start-free-proceed.component';


@NgModule({
  declarations: [StartFreeProceedComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    StartFreeProceedRoutingModule
  ]
})
export class StartFreeProceedModule { }
