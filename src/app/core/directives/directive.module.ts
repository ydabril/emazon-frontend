import { NgModule } from '@angular/core';
import { ButtonLargeDirective } from './buttons/button-large.directive';
import { ButtonMediumDirective } from './buttons/button-medium.directive';
import { InputDefaultDirective } from './inputs/input-default.directive';
import { InputTextAreaDirective } from './inputs/input-textarea.directive';
import { ButtonIconDirective } from './buttons/button-icon.directive';


@NgModule({
  declarations: [
    ButtonLargeDirective,
    ButtonMediumDirective,
    InputDefaultDirective,
    InputTextAreaDirective,
    ButtonIconDirective
  ],
  exports: [
    ButtonLargeDirective,
    ButtonMediumDirective,
    InputDefaultDirective,
    InputTextAreaDirective,
    ButtonIconDirective
  ]
})
export class DirectiveModule { }
