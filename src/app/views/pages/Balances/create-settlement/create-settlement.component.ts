import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SettlementModel} from "../model/settlement.model";
import {LayoutUtilsService, MessageType} from "../../../../core/_base/crud";
import {Location} from "@angular/common";
import {SettlementService} from "../service/settlement.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedDataService} from "../../shared/shared-data.service";

@Component({
	selector: 'kt-create-settlement',
	templateUrl: './create-settlement.component.html',
	styleUrls: ['./create-settlement.component.scss']
})
export class CreateSettlementComponent implements OnInit {
	@ViewChild('validationForm', {static: false,}) validationForm: NgForm;
	settlementModel = new SettlementModel();
	loading = false;
	message;
	validationError = false

	constructor(private location: Location,
				private service: SettlementService,
				private cdr: ChangeDetectorRef,
				private router: Router,
				private route: ActivatedRoute,
				private  layoutUtilsService: LayoutUtilsService) {

	}



	ngOnInit() {
		this.route.queryParams.subscribe( params => {
			this.settlementModel.amount = params.total
			this.settlementModel.transactionIds = params.id
			console.log(this.settlementModel)
		})
	}

	back() {
		this.location.back();
	}

	reset() {
		this.validationForm.reset();
	}

	onSumbit() {
		if (!this.validationForm.valid){
			Object.keys(this.validationForm.controls).forEach( key => {
				this.validationForm.controls[key].markAsDirty();
				this.validationForm.controls[key].updateValueAndValidity();
				this.validationForm.controls[key].markAsUntouched();
			})
			this.validationError = true

			return
		}
		this.loading = true;
		this.service.settlementCreate(this.settlementModel).subscribe(data => {
			this.loading = false;
			this.message = data.message;
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Delete, 5000, true, false);
			this.router.navigate(['/settlement/list']);
		}, error => {
			this.loading = false;
			this.message = error.error.errorMessage;
			this.layoutUtilsService.showActionNotification(this.message, MessageType.Delete, 5000, true, false);
		})
	}

	onAlertClose(val){
		this.validationError = false
	}
}
