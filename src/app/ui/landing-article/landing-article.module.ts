import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/core/directives/directive.module';
import { ArticleServiceProvider } from 'src/app/data/providers/article/article.service.provider';
import { BrandServiceProvider } from 'src/app/data/providers/brand/brand.service.provider';
import { CategoryServiceProvider } from 'src/app/data/providers/category/category.service.provider';
import { SharedModule } from 'src/app/shared/shared.module';
import { landingArticleRoute } from './landing-article.routing';
import { LandingArticleViewComponent } from './view/landing-article.component';

@NgModule({
  declarations: [LandingArticleViewComponent],
  imports: [
    RouterModule.forChild(landingArticleRoute),
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
export class LandingArticleModule {}
