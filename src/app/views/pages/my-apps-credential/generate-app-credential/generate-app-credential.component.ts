import {Component, OnInit, ViewChild} from '@angular/core';
import {MyAppCredentialModel} from "../model/my-app-credential.model";
import {MyAppCredentialService} from "../service/my-app-credential.service";
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";
import {NgForm} from "@angular/forms";
import {Location} from '@angular/common';
import {Router} from "@angular/router";
import {DialogPreviewComponent} from "../../payment/dialog-preview/dialog-preview.component";
import {MatDialog} from "@angular/material";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
	selector: 'kt-generate-app-credential',
	templateUrl: './generate-app-credential.component.html',
	styleUrls: ['./generate-app-credential.component.scss']
})
export class GenerateAppCredentialComponent implements OnInit {
	@ViewChild('validationForm', {static: false,}) validationForm: NgForm;
	myAppCredentialModel = new MyAppCredentialModel();
	loading = false;
	message;
	validationError = false

	constructor(private service: MyAppCredentialService,
				private location: Location,
				private router: Router,
				public dialog: MatDialog,
				private  layoutUtilsService: LayoutUtilsService) {
	}

	ngOnInit() {
	}

	back() {
		this.location.back();
	}

	reset() {
		this.validationForm.reset();
	}

	onSumbit() {
		this.loading = true;
		this.service.generateCredential(this.myAppCredentialModel).subscribe(data => {
			this.loading = false;
			this.message = data.message;
			this.router.navigate(['/myapp/credential/list']);
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Delete, 5000, true, false);
		}, error => {
			this.loading = false;
			this.message = error.error.errorMessage;
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Delete, 5000, true, false);
		})
	}
	onAlertClose(val){
		this.validationError = false
	}

	showAPI(){
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '500px',
		});
	}

}
