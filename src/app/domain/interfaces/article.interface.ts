import { Observable } from "rxjs";
import { ArticleRequest } from "src/app/data/network/requests/articleRequest";

export interface IArticleService {
    createArticle(categoryRequest: ArticleRequest): Observable<any>
}