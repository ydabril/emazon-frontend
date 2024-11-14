import { Component, Inject, OnInit } from '@angular/core';
import { LandingArticleOutputLogic } from '../model/landing-article.model';
import { EM_ICON } from 'src/app/core/constants/em-icons';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { IArticleService } from 'src/app/domain/interfaces/article.interface';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { Article, ArticleResponse } from 'src/app/data/network/responses/article.response';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ArticleSortBy } from 'src/app/core/constants/enums/article-sortby.enum';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/common/utils/utils.service';
import { ICartService } from 'src/app/domain/interfaces/cart.interface';
import { CartRequest } from 'src/app/data/network/requests/cart.request';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-article.component.html',
  styleUrls: ['./landing-article.component.scss'],
})
export class LandingArticleViewComponent extends LandingArticleOutputLogic implements OnInit {
  cartIcon: string = EM_ICON['cart'];
  userIcon: string = EM_ICON['user'];
  arrowIcon: string = EM_ICON['arrowDropdown']

  constructor(
    private route: ActivatedRoute,
    private _utils: UtilsService,
    @Inject(ProviderServices.articleService) private _articleService: IArticleService,
    @Inject(ProviderServices.cartService) private _cartService: ICartService
  ) {
    super();
  }

  ngOnInit(): void {
    this.validateExistToken();
    this.route.queryParams.subscribe(params => {
      this.showErrorModal = params['showErrorModal'];
      this.errorCode = params['errorCode'] ? +params['errorCode'] : null;

      if (this.showErrorModal) {
        this.ErrorModal();
      }
    });
    
    this.paginationRequest = {
      size: 10,
      sortDirection: 'ASC'
    }

    this.getArticles(this.paginationRequest)
  }

  validateExistToken() {
    const token = localStorage.getItem('token');
    if(token) {
      this.existToken = true;
      this.userName = localStorage.getItem('userName');
      this.role = localStorage.getItem('role');
    } else {
      this.existToken = false;
    }
  }

  public getArticles(paginationRequest: PaginationRequest): void {
    this.paginationRequest = paginationRequest;
    this._articleService.getArticles(paginationRequest, this.page, this.sortBy).subscribe({
      next: (response: HttpResponse<ArticleResponse>) => this.assignArticleList(response.body as ArticleResponse),
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  public addArticleCart(articleId: number): void {
    let cartRequest: CartRequest = {
      articleId: articleId,
      quantity: this.articleQuantity
    }

    this._cartService.addArticle(cartRequest).subscribe({
      next: (response: HttpResponse<any>) => this.showSuccessModal(response, "Articulo creado correctamente"),
      error: (error: HttpErrorResponse) => this.showErrorModalCart(error)
    })
  }

  private showSuccessModal(response: HttpResponse<any>, message: string) {
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['success'];
    this.modalTitle = "Proceso exitoso";
    this.modalMessage = message;
  }

  private showErrorModalCart(error: HttpErrorResponse) {
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['error'];
    this.modalTitle = "No se pudo agregar articulo al carrito";
    this.modalMessage = error.error.message;
  }

  private assignArticleList(articleResponse: ArticleResponse): void {
    this.totalPages = articleResponse.totalPages;
    this.currentPage = articleResponse.currentPage;
    this.hasNextPage = articleResponse.hasNextPage;
    this.hasPreviousPage = articleResponse.hasPreviousPage;
    
    let articleList: Array<Article> = articleResponse.list;
    this.listDataArticle = articleList;
    console.log(this.listDataArticle);
    
  }

  sortByChange(sortOption: ArticleSortBy) {
    this.sortBy = sortOption;
    this.getArticles(this.paginationRequest);
  }

  nextPage(pageValue: number) {
    this.page = pageValue;
    this.getArticles(this.paginationRequest); 
  }

  closeModalMessage(): void  {
    this.showModalMessage = false;
  }

  ErrorModal() {
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['error'];
    this.modalTitle = "Algo salió mal";
    this.modalMessage = "Acceso denegano"
  }

  changeHeaderMenu() {
    this.showHeaderMenu = !this.showHeaderMenu
  }

  logout() {
    this._utils.logout();
    this.showHeaderMenu = false;
    this.validateExistToken();
  }
}
