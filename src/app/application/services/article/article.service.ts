import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ArticleRequest } from "src/app/data/network/requests/articleRequest";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { PaginationArticleRequest } from "src/app/data/network/requests/pargination-article.request";
import { ArticleResponse } from "src/app/data/network/responses/article.response";
import { IArticleService } from "src/app/domain/interfaces/article.interface";
import { environment } from "src/environments/environment";


@Injectable()
export class ArticleService implements IArticleService {
  constructor(private _http: HttpClient) { }

  public createArticle(articleRequest: ArticleRequest) {
    return this._http.post<unknown>(`${environment.API_URL}/article`, articleRequest, { observe: 'response' });
  }

  public getArticles(paginationRequest: PaginationRequest, page: number, sortByValue: string): Observable<HttpResponse<ArticleResponse>> {
    const size = paginationRequest.size;
    const sortDirection = paginationRequest.sortDirection;
    const sortBy = sortByValue;

    const url = `${environment.API_URL}/article?sortBy=${sortBy}&sortDirection=${sortDirection}&page=${page}&size=${size}`;

    return this._http.get<ArticleResponse>(url, { observe: 'response' });
  }
}