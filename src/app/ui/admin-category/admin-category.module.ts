import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryPresenterProvider } from 'src/app/data/providers/category/category.presenter.provider';
import { categoryRoute } from './admin-category..routing';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryServiceProvider } from 'src/app/data/providers/category/category.service.provider';
import { DirectiveModule } from 'src/app/core/directives/directive.module';
import { AdminCategoryViewComponent } from './view/admin-category..component';

@NgModule({
  declarations: [AdminCategoryViewComponent],
  imports: [
    RouterModule.forChild(categoryRoute),
    SharedModule,
    CommonModule,
    DirectiveModule
  ],
  providers: [
    CategoryPresenterProvider,
    CategoryServiceProvider
  ],
})
export class AdminCategoryModule {}
