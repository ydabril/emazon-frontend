import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Article } from "src/app/data/network/responses/article.response";

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  @Input() articleData!: Article
  @Output() articleCartId = new EventEmitter<number>();
  role!: string | null; 

  constructor(private _router: Router) {}
 
  ngOnInit(): void {
    this.assignRole();
  }

  assignRole() {
    const token = localStorage.getItem('token');
    if(token) {
      this.role = localStorage.getItem('role');
    } 
  }

  emitArticleCart() {
    this.articleCartId.emit(this.articleData.id)
  }

  redirectToArticleDetails() {
    this._router.navigate(['/article-details'], { queryParams: { id: this.articleData.id} });
  }
}