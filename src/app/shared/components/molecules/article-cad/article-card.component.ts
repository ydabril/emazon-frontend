import { Component, Input } from "@angular/core";
import { Article } from "src/app/data/network/responses/article.response";

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() articleData!: Article
}