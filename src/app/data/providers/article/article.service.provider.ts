import { Provider } from "@angular/core";
import { ArticleService } from "src/app/application/services/article/article.service";
import { BrandService } from "src/app/application/services/brand/brand.service";

export const ArticleServiceProvider: Provider = {
  provide: 'articleService',
  useClass: ArticleService
}