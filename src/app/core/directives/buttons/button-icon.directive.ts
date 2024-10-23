import { Directive } from '@angular/core';

@Directive({
  selector: '[ButtonIcon]',
  host: {
    class: 'em-button--icon',
  },
})
export class ButtonIconDirective { }