import { Provider } from "@angular/core";
import { BrandService } from "src/app/application/services/brand.service";

export const BrandServiceProvider: Provider = {
  provide: 'brandService',
  useClass: BrandService
}