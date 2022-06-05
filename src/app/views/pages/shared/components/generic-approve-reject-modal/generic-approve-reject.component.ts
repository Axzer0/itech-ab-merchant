import {Component, HostListener, Inject, EventEmitter, Input, OnInit, Output, ViewChild, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GenericApproveRejectService} from "./service/generic-approve-reject.service";
import {GenericDialogInterface} from "./interface/generic-dialog.interface";
import {NgForm} from "@angular/forms";
import {LoadingService} from "../../../../../core/auth/_services/loading.service";

@Component({
	selector: 'kt-app-generic-approve-reject',
	templateUrl: './generic-approve-reject.component.html',
	styleUrls: ['./generic-approve-reject.component.scss']
})
export class GenericApproveRejectComponent implements OnInit {
	@ViewChild('validationForm', {static: false}) validationForm: NgForm;
	@Input() remarks;
	@Output() approveEvent: EventEmitter<any> = new EventEmitter();
	@Output() rejectEvent: EventEmitter<any> = new EventEmitter();
	loading = false;

	constructor(private service: GenericApproveRejectService,
				@Optional() public dialogRef: MatDialogRef<GenericApproveRejectComponent>,
				@Optional() @Inject(MAT_DIALOG_DATA) public data: GenericDialogInterface,) {
	}

	ngOnInit(): void {
		LoadingService.status.subscribe((val: boolean) => {
			this.loading = val;
		});
	}

	public reject() {
		if (this.validationForm.valid) {
			this.service.isAsyncOperationRunning$.next(true);
			setTimeout(() => {
				this.data.callbackMethod({remarks: this.remarks});
				this.service.isAsyncOperationRunning$.next(false);
				this.dialogRef.close();
			}, 500);
		} else {

			Object.keys(this.validationForm.controls).forEach(key => {
				this.validationForm.controls[key].markAsDirty();
				this.validationForm.controls[key].updateValueAndValidity();
				this.validationForm.controls[key].markAsUntouched();
			});
		}
	}

	public close(value) {
		// this.service.close();
	}

	public approve() {

		this.service.isAsyncOperationRunning$.next(true);
		setTimeout(() => {
			this.data.callbackMethod({remarks: this.remarks});
			this.service.isAsyncOperationRunning$.next(false);
			this.dialogRef.close();
		}, 500);
	}

	@HostListener("keydown.esc")
	public onEsc() {
		this.close(false);
	}


}
