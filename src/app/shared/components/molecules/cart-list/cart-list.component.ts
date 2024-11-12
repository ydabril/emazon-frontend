import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { ProviderServices } from "src/app/core/constants/enums/provider.service.enum";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { ArticleCart, ArticleCartResponse } from "src/app/data/network/responses/article-cart.response";
import { IArticleService } from "src/app/domain/interfaces/article.interface";
import { IBrandService } from "src/app/domain/interfaces/brand.interface";
import { ICartService } from "src/app/domain/interfaces/cart.interface";
import { ICategoryService } from "src/app/domain/interfaces/category.interface";

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  page: number = 0;
  paginationRequest!: PaginationRequest;
  articleCartList!: ArticleCart[];

  constructor(
    @Inject(ProviderServices.categoryService) private _categoryService: ICategoryService,
    @Inject(ProviderServices.brandService) private _brandService: IBrandService,
    @Inject(ProviderServices.cartService) private _cartService: ICartService
  ) {
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
    this._cartService.getArticlesCart(paginationRequest, this.page).subscribe({
      next: (response: HttpResponse<ArticleCartResponse>) => this.assignArticleCartList(response.body as ArticleCartResponse),
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  assignArticleCartList(articleCartRespose: ArticleCartResponse) {
    this.articleCartList = articleCartRespose.list
  }

  deleteArticleCart(id: number) {
    this._cartService.deleteArticleCart(id).subscribe({
      next: (response: HttpResponse<unknown>) => this.getArticles(this.paginationRequest),
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }
}