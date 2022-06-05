import { Directive, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: "form[valueChanges]",
  outputs: [ "valueChangeEvents: valueChanges" ]
})
export class FormValueChangeDirective {
  public valueChangeEvents: EventEmitter<any>;

  constructor( form: FormGroup ) {

		this.valueChangeEvents = new EventEmitter();

		if (form.valueChanges) {
      console.log('dsaf: '), form.valueChanges;
			form.valueChanges.subscribe( this.valueChangeEvents );
		}

	}

}
