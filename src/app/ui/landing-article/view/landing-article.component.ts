import { Component, Inject, OnInit } from '@angular/core';
import { LandingArticleOutputLogic } from '../model/landing-article.model';
import { EM_ICON } from 'src/app/core/constants/em-icons';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { IArticleService } from 'src/app/domain/interfaces/article.interface';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { Article, ArticleResponse } from 'src/app/data/network/responses/article.response';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ArticleSortBy } from 'src/app/core/constants/enums/article-sortby.enum';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-article.component.html',
  styleUrls: ['./landing-article.component.scss'],
})
export class LandingArticleViewComponent extends LandingArticleOutputLogic implements OnInit {
  cartIcon: string = EM_ICON['cart'];
  userIcon: string = EM_ICON['user'];

  constructor(
    @Inject(ProviderServices.articleService) private _articleService: IArticleService
  ) {
    super();
  }

  ngOnInit(): void {
    this.paginationRequest = {
      size: 10,
      sortDirection: 'ASC'
    }

    this.getArticles(this.paginationRequest)
  }

  public getArticles(paginationRequest: PaginationRequest): void {
    
    this._articleService.getArticles(paginationRequest, this.page, this.sortBy).subscribe({
      next: (response: HttpResponse<ArticleResponse>) => this.assignArticleList(response.body as ArticleResponse),
      error: (error: HttpErrorResponse) => console.log(error)
    })
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
}
