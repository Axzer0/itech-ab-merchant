import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackbuttonService {

  constructor(
    private location: Location
  ) { }

  navigateToLastVisitedPage() {
    this.location.back();
  }

}
