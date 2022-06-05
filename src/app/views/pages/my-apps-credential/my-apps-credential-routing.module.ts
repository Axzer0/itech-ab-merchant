import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GenerateAppCredentialComponent} from "./generate-app-credential/generate-app-credential.component";
import {AppCredentialListComponent} from "./app-credential-list/app-credential-list.component";

;

const routes: Routes = [
	{path: 'credential', component: GenerateAppCredentialComponent},
	{path: 'credential/list', component: AppCredentialListComponent},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MyAppsCredentialRoutingModule { }
