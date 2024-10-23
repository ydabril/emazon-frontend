import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface PaginationValidator {
  size: (number | ((control: AbstractControl<any, any>) => ValidationErrors | null)[])[],
  sortDirection: ('DESC' | 'ASC' | ((control: AbstractControl<any, any>) => ValidationErrors | null)[])[]
}
