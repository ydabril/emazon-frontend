import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/core/directives/directive.module';
import { ArticleServiceProvider } from 'src/app/data/providers/article/article.service.provider';
import { BrandServiceProvider } from 'src/app/data/providers/brand/brand.service.provider';
import { CategoryServiceProvider } from 'src/app/data/providers/category/category.service.provider';
import { SharedModule } from 'src/app/shared/shared.module';
import { userRoute } from './admin-user.routing';
import { AdminUserViewComponent } from './view/admin-user.component.';
import { UserServiceProvider } from 'src/app/data/providers/user/user.service.provider';

@NgModule({
  declarations: [AdminUserViewComponent],
  imports: [
    RouterModule.forChild(userRoute),
    SharedModule,
    CommonModule,
    DirectiveModule
  ],
  providers: [
    UserServiceProvider
  ],
})
export class AdminUserModule {}
