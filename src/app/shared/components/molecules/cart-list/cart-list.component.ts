import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { ProviderServices } from "src/app/core/constants/enums/provider.service.enum";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { ArticleCart, ArticleCartResponse } from "src/app/data/network/responses/article-cart.response";
import { Brand, BrandResponse } from "src/app/data/network/responses/brand.response";
import { Category, CategoryResponse } from "src/app/data/network/responses/category.response";
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
  currentPage!: number;
  totalPages!: number;
  hasNextPage!: boolean;
  hasPreviousPage!: boolean;
  listDataCategory!: Array<Category>;
  listDataBrand!: Array<Brand>;
  brandValue: string | null = null;
  categoryValue: string | null = null
  paginationRequestFilter = {
    sortDirection: 'ASC',
    size: 50
  }
  pageFilter = 0

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

    this.getBrandList(this.paginationRequestFilter, this.pageFilter);
    this.getCategoryList(this.paginationRequestFilter, this.pageFilter);
    this.getArticles(this.paginationRequest)
  }

  public getArticles(paginationRequest: PaginationRequest): void {   
    this._cartService.getArticlesCart(paginationRequest, this.page, this.categoryValue, this.brandValue).subscribe({
      next: (response: HttpResponse<ArticleCartResponse>) => this.assignArticleCartList(response.body as ArticleCartResponse),
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  assignArticleCartList(articleCartRespose: ArticleCartResponse) {
    this.totalPages = articleCartRespose.totalPages;
    this.currentPage = articleCartRespose.currentPage;
    this.hasNextPage = articleCartRespose.hasNextPage;
    this.hasPreviousPage = articleCartRespose.hasPreviousPage;
    this.articleCartList = articleCartRespose.list
  }

  deleteArticleCart(id: number) {
    this._cartService.deleteArticleCart(id).subscribe({
      next: (response: HttpResponse<unknown>) => this.getArticles(this.paginationRequest),
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  getCategoryList(paginationRequest: PaginationRequest, page: number): void {
    this._categoryService.getCategories(paginationRequest, page).subscribe({
      next: (response: HttpResponse<CategoryResponse>) => this.listDataCategory = response.body?.list as Array<Category>,
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  getBrandList(paginationRequest: PaginationRequest, page: number): void {
    this._brandService.getBrands(paginationRequest, page).subscribe({
      next: (response: HttpResponse<BrandResponse>) => this.listDataBrand = response.body?.list as Array<Brand>,
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  assignCategory(category: string) {
   this.categoryValue = category;
    this.getArticles(this.paginationRequest);
  }

  assignBrand(brand: string) {
    this.brandValue = brand;
    this.getArticles(this.paginationRequest);
  }

  nextPage(pageValue: number) {
    this.page = pageValue;
    this.getArticles(this.paginationRequest); 
  }
}