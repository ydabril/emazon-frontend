import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/core/directives/directive.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminArticleViewComponent } from './view/admin-article.component';
import { articleRoute } from './admin-article.routing';
import { CategoryServiceProvider } from 'src/app/data/providers/category/category.service.provider';
import { BrandServiceProvider } from 'src/app/data/providers/brand/brand.service.provider';
import { ArticleServiceProvider } from 'src/app/data/providers/article/article.service.provider';

@NgModule({
  declarations: [AdminArticleViewComponent],
  imports: [
    RouterModule.forChild(articleRoute),
    SharedModule,
    CommonModule,
    DirectiveModule
  ],
  providers: [
    CategoryServiceProvider,
    BrandServiceProvider,
    ArticleServiceProvider
  ],
})
export class AdminArticleModule {}
