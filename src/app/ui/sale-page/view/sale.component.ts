import { Component, Inject, OnInit } from '@angular/core';
import { SaleOutputLogic } from '../model/sale.model';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { ArticleCartResponse } from 'src/app/data/network/responses/article-cart.response';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { ICategoryService } from 'src/app/domain/interfaces/category.interface';
import { IBrandService } from 'src/app/domain/interfaces/brand.interface';
import { ICartService } from 'src/app/domain/interfaces/cart.interface';
import { ITransactionService } from 'src/app/domain/interfaces/transaction.interface';
import { ArticleSale, SaleRequest } from 'src/app/data/network/requests/sale.request';
import { EM_ICON } from 'src/app/core/constants/em-icons';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'sale-page',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleViewComponent extends SaleOutputLogic implements OnInit {
  constructor(
    private router: Router,
    @Inject(ProviderServices.cartService) private _cartService: ICartService,
    @Inject(ProviderServices.transactionService) private _transactionService: ITransactionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.paginationRequest = {
      sortDirection: 'ASC',
      size: 50
    }
    this.page = 0

    this.getArticles(this.paginationRequest)
  }

  public getArticles(paginationRequest: PaginationRequest): void {
    this.paginationRequest = paginationRequest;
    this._cartService.getArticlesCart(paginationRequest, this.page, this.categoryValue, this.brandValue).subscribe({
      next: (response: HttpResponse<ArticleCartResponse>) => this.assignArticleCartList(response.body as ArticleCartResponse),
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  assignArticleCartList(articleCartRespose: ArticleCartResponse) {
    this.totalPrice = articleCartRespose.totalPrice;
    this.totalPages = articleCartRespose.totalPages;
    this.currentPage = articleCartRespose.currentPage;
    this.hasNextPage = articleCartRespose.hasNextPage;
    this.hasPreviousPage = articleCartRespose.hasPreviousPage;
    this.articleCartList = articleCartRespose.list
  }

  public addSale() {
    const articleSale: ArticleSale[] = [];
    const cartIds: number[] = []
    this.articleCartList.forEach(articleCart => {
      let article = {
        articleId: articleCart.id,
        articleName: articleCart.name,
        quantity: articleCart.quantity
      }

      cartIds.push(articleCart.cartId)
      articleSale.push(article)
    });

    const token = localStorage.getItem('token');

    const decodedToken: any = jwt_decode.jwtDecode(token as string)
    const email = decodedToken?.sub;


    const saleRequest: SaleRequest = {
      articles: articleSale,
      cartIds: cartIds,
      totalPrice: this.totalPrice,
      userId: 1,
      email: email
    }

    this._transactionService.addSale(saleRequest).subscribe({
      next: (response: HttpResponse<unknown>) => this.showSuccessModal("La compra se realizó con éxito"),
      error: (error: HttpErrorResponse) => this.showErrorModal(error)
    })
  }

  private showSuccessModal(message: string) {
    this.success = true;
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['success'];
    this.modalTitle = "Proceso exitoso";
    this.modalMessage = message;
  }

  private showErrorModal(error: HttpErrorResponse) {
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['error'];
    this.modalTitle = "Algo salió mal";
    this.modalMessage = error.error.message;
  }

  closeModalMessage(): void {
    this.showModalMessage = false;
    if (this.success) {
      this.router.navigate(['/landing']);
    }
  }
}
