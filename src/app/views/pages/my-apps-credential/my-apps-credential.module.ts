import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import {GenerateAppCredentialComponent} from "./generate-app-credential/generate-app-credential.component";
import {MyAppsCredentialRoutingModule} from "./my-apps-credential-routing.module";
import { AppCredentialListComponent } from './app-credential-list/app-credential-list.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
	declarations: [GenerateAppCredentialComponent, AppCredentialListComponent, DialogComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatInputModule,
        MyAppsCredentialRoutingModule,
        FlexLayoutModule
    ],
	entryComponents: [DialogComponent],
})
export class MyAppsCredentialModule { }
