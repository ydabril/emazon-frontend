import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface ArticleValidator {
  name: (string | ((control: AbstractControl) => ValidationErrors | null)[])[],
  description: (string | ((control: AbstractControl<any, any>) => ValidationErrors | null)[])[],
  price: (number | null | ((control: AbstractControl) => ValidationErrors | null)[])[],
  quantity: (number | null | ((control: AbstractControl) => ValidationErrors | null)[])[],
  brandId: (number | null | ((control: AbstractControl) => ValidationErrors | null)[])[],
  categoryIds: (number[] | null | ((control: AbstractControl) => ValidationErrors | null)[])[],
}