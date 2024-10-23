import { Validators } from "@angular/forms";
import { CategoryValidator } from "../validators/category.validator";

export const categoryForm: CategoryValidator = {
    name: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(90)]],
  }