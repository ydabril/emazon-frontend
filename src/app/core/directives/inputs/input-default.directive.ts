import { Directive } from '@angular/core';

@Directive({
  selector: '[InputDefault]',
  host: {
    class: 'em-input--default',
  },
})
export class InputDefaultDirective { }
