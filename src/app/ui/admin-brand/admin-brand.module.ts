import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/core/directives/directive.module';
import { BrandPresenterProvider } from 'src/app/data/providers/brand/brand.presenter.provider';
import { BrandServiceProvider } from 'src/app/data/providers/brand/brand.service.provider';
import { SharedModule } from 'src/app/shared/shared.module';
import { brandRoute } from './admin-brand.routing';
import { adminBrandViewComponent } from './view/admin-brand.component.';

@NgModule({
  declarations: [adminBrandViewComponent],
  imports: [
    RouterModule.forChild(brandRoute),
    SharedModule,
    CommonModule,
    DirectiveModule
  ],
  providers: [
    BrandPresenterProvider,
    BrandServiceProvider
  ],
})
export class AdminBrandModule {}
