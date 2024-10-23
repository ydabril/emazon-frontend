import { Provider } from "@angular/core";
import { ProvidersWebApp } from "src/app/core/constants/enums/providers.enum";
import { AdminBrandPresenter } from "src/app/ui/admin-brand/presenter/admin-brand.presenter";

export const BrandPresenterProvider: Provider = {
  provide: ProvidersWebApp.adminBrandPresenter,
  useClass: AdminBrandPresenter
}