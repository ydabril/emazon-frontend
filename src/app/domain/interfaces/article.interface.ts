import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ArticleRequest } from "src/app/data/network/requests/articleRequest";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { SupplyRequest } from "src/app/data/network/requests/supply.request";
import { ArticleResponse } from "src/app/data/network/responses/article.response";

export interface IArticleService {
    createArticle(categoryRequest: ArticleRequest): Observable<any>
    getArticles(paginationRequest: PaginationRequest, page: number, sortByValue: string): Observable<HttpResponse<ArticleResponse>>
    addSupply(supplyRequest: SupplyRequest): Observable<any>
}