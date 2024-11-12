import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ArticleSortBy } from "src/app/core/constants/enums/article-sortby.enum";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { Article } from "src/app/data/network/responses/article.response";

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  @Input() articleList!: Array<Article>
  @Output() paginationChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<ArticleSortBy>();
  @Output() articleCartId = new EventEmitter<number>();

  emitPaginationChange(paginationRequest: PaginationRequest): void {
    this.paginationChange.emit(paginationRequest);
  }

  emitSortBy(sortOption: ArticleSortBy): void  {
    this.sortChange.emit(sortOption);
  }

  emitArticleCartId(articleCartId: number) {
    this.articleCartId.emit(articleCartId);
  }
}