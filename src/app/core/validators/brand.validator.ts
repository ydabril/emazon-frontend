import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface BrandValidator {
  name: (string | ((control: AbstractControl<any, any>) => ValidationErrors | null)[])[],
  description: (string | ((control: AbstractControl<any, any>) => ValidationErrors | null)[])[]
}
