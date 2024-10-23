import { Directive } from '@angular/core';

@Directive({
  selector: '[InputTextArea]',
  host: {
    class: 'em-input--textarea',
  },
})
export class InputTextAreaDirective { }
