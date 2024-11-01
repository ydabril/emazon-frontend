import { Component, EventEmitter, Output } from "@angular/core";
import { ArticleSortBy } from "src/app/core/constants/enums/article-sortby.enum";

@Component({
  selector: 'article-sort',
  templateUrl: './article-sort.component.html',
  styleUrls: ['./article-sort.component.scss']
})
export class ArticleSortComponent {
  articleSortBy = ArticleSortBy;
  sortByOptions = ArticleSortBy;
  selectedSort: ArticleSortBy = ArticleSortBy.articleName;
  @Output() sortChange = new EventEmitter<ArticleSortBy>();

  selectSortOption(sortOption: ArticleSortBy) {
    this.selectedSort = sortOption;
    this.sortChange.emit(sortOption);
  }
}