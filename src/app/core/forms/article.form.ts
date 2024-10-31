import { Validators } from "@angular/forms";
import { ArticleValidator } from "../validators/article.validator";

export const articleForm: ArticleValidator = {
  name: ['', [Validators.required, Validators.maxLength(50)]],
  description: ['', [Validators.required, Validators.maxLength(90)]],
  price: [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  quantity: [0, [Validators.required, Validators.min(1)]],
  brandId: [0, [Validators.required]],
  categoryIds: [[], [Validators.required]],
};