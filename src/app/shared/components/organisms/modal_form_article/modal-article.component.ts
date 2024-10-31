import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { EM_ICON } from "src/app/core/constants/em-icons";
import { ArticleRequest } from "src/app/data/network/requests/articleRequest";
import { CategpryRequest } from "src/app/data/network/requests/category.request";
import { Brand } from "src/app/data/network/responses/brand.response";
import { Category } from "src/app/data/network/responses/category.response";

@Component({
  selector: 'app-modal-article',
  templateUrl: './modal-article.component.html',
  styleUrls: ['./modal-article.component.scss']
})
export class ModalArticleComponent {
  @Output() closeFormValue = new EventEmitter<boolean>();
  @Output() articleRequestEvent = new EventEmitter<ArticleRequest>();
  @Input() showForm!: boolean;
  @Input() modalTitle!: string;
  @Input() showDragDrop!: boolean;
  @Input() showformArticle: boolean = false;
  @Input() categoryList!: Array<Category>;
  @Input() brandList!: Array<Brand>;
  openFormEmployee: boolean = false
  categoryForm!: FormGroup
  base64Image!: string
  imageName!: string
  loadImage: boolean = false
  categorias!: Array<any>
  autores!: Array<any>
  closeIcon = EM_ICON['close'];

  closeForm() {
    this.closeFormValue.emit(false);
  }

  saveArticle(articleRequest: ArticleRequest) {
    this.articleRequestEvent.emit(articleRequest);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.closeForm();
    }
  }
}