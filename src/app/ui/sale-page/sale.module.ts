import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/core/directives/directive.module';
import { ArticleServiceProvider } from 'src/app/data/providers/article/article.service.provider';
import { BrandServiceProvider } from 'src/app/data/providers/brand/brand.service.provider';
import { CartServiceProvider } from 'src/app/data/providers/cart/cart.service.provider';
import { CategoryServiceProvider } from 'src/app/data/providers/category/category.service.provider';
import { SharedModule } from 'src/app/shared/shared.module';
import { saleRoute } from './sale.routing';
import { SaleViewComponent } from './view/sale.component';
import { TransactionServiceProvider } from 'src/app/data/providers/transaction/transaction.service.provider';

@NgModule({
  declarations: [SaleViewComponent],
  imports: [
    RouterModule.forChild(saleRoute),
    SharedModule,
    CommonModule,
    DirectiveModule
  ],
  providers: [
    CategoryServiceProvider,
    BrandServiceProvider,
    ArticleServiceProvider,
    CartServiceProvider,
    TransactionServiceProvider
  ],
})
export class SaleModule {}
