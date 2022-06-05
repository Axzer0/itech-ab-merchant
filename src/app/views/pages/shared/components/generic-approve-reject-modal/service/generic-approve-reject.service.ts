import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GenericApproveRejectComponent} from '../generic-approve-reject.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericApproveRejectService {
  public isAsyncOperationRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor( ) { }
}
