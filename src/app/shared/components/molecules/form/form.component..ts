import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryFields } from "src/app/core/constants/enums/categoryFields.enum";
import { categoryForm } from "src/app/core/forms/category.form";
import { CategpryRequest } from "src/app/data/network/requests/category.request";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() closeFormValue = new EventEmitter<boolean>();
  @Output() categoryRequestEvent = new EventEmitter<CategpryRequest>();
  @Input() showForm!: boolean;
  openFormEmployee: boolean = false
  categoryForm!: FormGroup
  base64Image!: string
  imageName!: string
  loadImage: boolean = false
  categorias!: Array<any>
  autores!: Array<any>

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeCategoryForm();
  }

  get name(): AbstractControl {
    return this.categoryForm.get(CategoryFields.name)!;
  }

  get description(): AbstractControl {
    return this.categoryForm.get(CategoryFields.description)!;
  }

  initializeCategoryForm(): void {
    this.categoryForm = this._formBuilder.group(categoryForm)
  }

  closeForm() {
    this.closeFormValue.emit(false);
  }

  saveCategory() {
    this.categoryRequestEvent.emit(this.categoryForm.value);
  }

  handleKeyDown(event: KeyboardEvent) {
    if ((event.key === 'Enter' || event.key === ' ') && !this.categoryForm.invalid) {
      this.saveCategory();
    }
  }
}