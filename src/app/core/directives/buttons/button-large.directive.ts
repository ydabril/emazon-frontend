import { Directive } from '@angular/core';

@Directive({
  selector: '[ButtonLarge]',
  host: {
    class: 'em-button--large',
  },
})
export class ButtonLargeDirective { }
