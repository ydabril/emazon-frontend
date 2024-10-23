import { Provider } from "@angular/core";
import { ProvidersWebApp } from "src/app/core/constants/enums/providers.enum";
import { AdminCategoryPresenter } from "src/app/ui/admin-category/presenter/admin-category.presenter";

export const CategoryPresenterProvider: Provider = {
  provide: ProvidersWebApp.adminCategoryPresenter,
  useClass: AdminCategoryPresenter
}