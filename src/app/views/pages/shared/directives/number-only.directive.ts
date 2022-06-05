import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberOnlyDirective {



  constructor(private el: ElementRef) {}
  regex = /^[0-9]+$/

  @HostListener("keydown", ["$event"])


  onKeyDown(event: KeyboardEvent) {
    var e = event.key.toString()

    if (e.match(this.regex) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190 || event.keyCode == 110) {
      // Allow normal operation
    } else {
      // Prevent the rest
      event.preventDefault();
    }
  }

}
