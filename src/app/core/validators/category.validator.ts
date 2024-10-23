import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface CategoryValidator {
  name: (string | ((control: AbstractControl<any, any>) => ValidationErrors | null)[])[],
  description: (string | ((control: AbstractControl<any, any>) => ValidationErrors | null)[])[]
}
