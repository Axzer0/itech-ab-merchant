import { StartFreeProceedComponent } from './start-free-proceed.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: StartFreeProceedComponent
  },
  {
    path: 'start-proceed', component: StartFreeProceedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartFreeProceedRoutingModule { }
