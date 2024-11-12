import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { CartRequest } from "src/app/data/network/requests/cart.request";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { ArticleCartResponse } from "src/app/data/network/responses/article-cart.response";

export interface ICartService {
    addArticle(categoryRequest: CartRequest): Observable<any>
    getArticlesCart(paginationRequest: PaginationRequest, page: number, categortValue: string  | null, brandValue: string | null): Observable<HttpResponse<ArticleCartResponse>>
    deleteArticleCart(id: number): Observable<any>
}