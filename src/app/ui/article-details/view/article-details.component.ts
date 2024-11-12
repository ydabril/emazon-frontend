import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { CartRequest } from 'src/app/data/network/requests/cart.request';
import { Article } from 'src/app/data/network/responses/article.response';
import { IArticleService } from 'src/app/domain/interfaces/article.interface';
import { ICartService } from 'src/app/domain/interfaces/cart.interface';
import { ArticleDetailsOutputLogic } from '../model/article-details.model';
import { EM_ICON } from 'src/app/core/constants/em-icons';

@Component({
  selector: 'landing-page',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsViewComponent extends ArticleDetailsOutputLogic implements OnInit {
  constructor(
    private route: ActivatedRoute,
    @Inject(ProviderServices.articleService) private _articleService: IArticleService,
    @Inject(ProviderServices.cartService) private _cartService: ICartService
  ) {
    super()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.articleId = params['id'];
    });
    this.getArticle();
  }

  getArticle() {
    this._articleService.getArticleByid(this.articleId).subscribe({
      next: (response: HttpResponse<Article>) => this.assignArticleData(response.body as Article),
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  public addArticleCart(): void {
    let cartRequest: CartRequest = {
      articleId: this.articleId,
      quantity: this.quantity
    }

    this._cartService.addArticle(cartRequest).subscribe({
      next: (response: HttpResponse<any>) => this.showSuccessModal(response, "Articulo agregado al carrito"),
      error: (error: HttpErrorResponse) => this.showErrorModalCart(error)
    })
  }

  private showSuccessModal(response: HttpResponse<any>, message: string) {
    console.log(response);
    
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['success'];
    this.modalTitle = "Proceso exitoso";
    this.modalMessage = message;
  }

  private showErrorModalCart(error: HttpErrorResponse) {
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['error'];
    this.modalTitle = "Error en el carrito";
    this.modalMessage = error.error.message;
    this.estimatedRestockDate = error.error.estimatedRestockDate
  }


  assignArticleData(article: Article) {
    this.articleData = article;
  }
  
  increaseQuantity() {
    if (this.quantity < this.articleData.quantity) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  closeModalMessage(): void  {
    this.showModalMessage = false;
  }
}
