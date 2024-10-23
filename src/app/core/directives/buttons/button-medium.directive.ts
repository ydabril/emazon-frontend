import { Directive } from '@angular/core';

@Directive({
  selector: '[ButtonMedium]',
  host: {
    class: 'em-button--medium',
  },
})
export class ButtonMediumDirective { }
