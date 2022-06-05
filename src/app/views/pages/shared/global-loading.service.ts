import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoadingService {
  public loading = false;
  constructor() { }

  isLoading(status: boolean) {
    this.loading = status;
    console.log('this.loading: ', this.loading);
  }
}
