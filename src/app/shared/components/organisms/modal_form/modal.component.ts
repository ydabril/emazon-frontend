import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { EM_ICON } from "src/app/core/constants/em-icons";
import { CategoryFields } from "src/app/core/constants/enums/categoryFields.enum";
import { categoryForm } from "src/app/core/forms/category.form";
import { CategpryRequest } from "src/app/data/network/requests/category.request";

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalCategoryComponent {
  @Output() closeFormValue = new EventEmitter<boolean>();
  @Output() getNewListEmployee = new EventEmitter();
  @Output() categoryRequestEvent = new EventEmitter<CategpryRequest>();
  @Input() showForm!: boolean;
  @Input() modalTitle!: string;
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

  saveCategory(categoryRequest: CategpryRequest) {
    this.categoryRequestEvent.emit(categoryRequest);
  }
}