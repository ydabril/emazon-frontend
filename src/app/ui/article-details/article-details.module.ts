import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/core/directives/directive.module';
import { ArticleServiceProvider } from 'src/app/data/providers/article/article.service.provider';
import { BrandServiceProvider } from 'src/app/data/providers/brand/brand.service.provider';
import { CartServiceProvider } from 'src/app/data/providers/cart/cart.service.provider';
import { CategoryServiceProvider } from 'src/app/data/providers/category/category.service.provider';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleDetailsViewComponent } from './view/article-details.component';
import { articleDetailsRoute } from './article-details.routing';

@NgModule({
  declarations: [ArticleDetailsViewComponent],
  imports: [
    RouterModule.forChild(articleDetailsRoute),
    SharedModule,
    CommonModule,
    DirectiveModule
  ],
  providers: [
    CategoryServiceProvider,
    BrandServiceProvider,
    ArticleServiceProvider,
    CartServiceProvider
  ],
})
export class ArticleDetailsModule {}
