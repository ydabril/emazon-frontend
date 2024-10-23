import { Provider } from "@angular/core";
import { CategoryService } from "src/app/application/services/category.service";

export const CategoryServiceProvider: Provider = {
  provide: 'categoryService',
  useClass: CategoryService
}