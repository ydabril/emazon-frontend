import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArticleRequest } from "src/app/data/network/requests/articleRequest";
import { IArticleService } from "src/app/domain/interfaces/article.interface";
import { environment } from "src/environments/environment";


@Injectable()
export class ArticleService implements IArticleService {
  constructor(private _http: HttpClient) { }

  public createArticle(articleRequest: ArticleRequest) {
    return this._http.post<unknown>(`${environment.API_URL}/article`, articleRequest, { observe: 'response' });
  }
}