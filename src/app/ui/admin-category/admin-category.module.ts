import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryPresenterProvider } from 'src/app/data/providers/category/category.presenter.provider';
import { categoryRoute } from './admin-category..routing';
import { adminCategoryViewComponent } from './view/admin-category..component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [adminCategoryViewComponent],
  imports: [
    RouterModule.forChild(categoryRoute),
    CommonModule
  ],
  providers: [
    CategoryPresenterProvider
  ],
})
export class AdminCategoryModule {}
