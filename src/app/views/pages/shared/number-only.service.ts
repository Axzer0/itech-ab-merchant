import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberOnlyService {

  constructor() { }

  keyPress(event: any) {
    const pattern = /[0-9+\-]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
