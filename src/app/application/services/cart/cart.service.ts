import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CartRequest } from "src/app/data/network/requests/cart.request";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { ArticleCartResponse } from "src/app/data/network/responses/article-cart.response";
import { ICartService } from "src/app/domain/interfaces/cart.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class CartService implements ICartService {
  constructor(private _http: HttpClient) { }

  public addArticle(cartRequest: CartRequest) {
    return this._http.post<unknown>(`${environment.API_URL_CART}/cart/add-article`, cartRequest, { observe: 'response' });
  }

  public getArticlesCart(paginationRequest: PaginationRequest, page: number): Observable<HttpResponse<ArticleCartResponse>> {
    const size = paginationRequest.size;
    const sortDirection = paginationRequest.sortDirection;

    const url = `${environment.API_URL_CART}/cart/list-articles?&page=${page}&size=${size}&sortDirection=${sortDirection}`;

    return this._http.get<ArticleCartResponse>(url, { observe: 'response' });
  }

  public deleteArticleCart(id: number) {
    const url = `${environment.API_URL_CART}/cart/delete-article/${id}`;

    return this._http.delete<unknown>(url, { observe: 'response' });
  }
}