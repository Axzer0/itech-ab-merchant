import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoadingService {

	static status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	public display(value: boolean) {
		LoadingService.status.next(value);
	}
}
