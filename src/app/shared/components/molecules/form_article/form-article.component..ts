import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleRequest } from "src/app/data/network/requests/articleRequest";
import { Brand } from "src/app/data/network/responses/brand.response";
import { Category } from "src/app/data/network/responses/category.response";

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.scss']
})
export class FormArticleComponent implements OnInit {
  @Output() closeFormValue = new EventEmitter<boolean>();
  @Output() articleRequestEvent = new EventEmitter<ArticleRequest>();
  @Input() showForm!: boolean;
  @Input() categoryList!: Array<Category>;
  @Input() brandList!: Array<Brand>;

  articleForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeArticleForm();
    this.categoryIds.controls.forEach(control => control.addValidators(this.duplicateCategoryValidator.bind(this)));
  }

  get name(): AbstractControl {
    return this.articleForm.get('name')!;
  }

  get description(): AbstractControl {
    return this.articleForm.get('description')!;
  }

  get price(): AbstractControl {
    return this.articleForm.get('price')!;
  }

  get quantity(): AbstractControl {
    return this.articleForm.get('quantity')!;
  }

  get categoryIds(): FormArray {
    return this.articleForm.get('categoryIds') as FormArray;
  }

  get brandId(): AbstractControl {
    return this.articleForm.get('brandId')!;
  }

  initializeArticleForm(): void {
    this.articleForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]],
      price: [null, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      quantity: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      categoryIds: this._formBuilder.array([this.createCategoryControl()], this.categoryLimitValidator(3)),
      brandId: [null, Validators.required]
    });
  }
  
  createCategoryControl(): FormControl {
    return this._formBuilder.control(null, Validators.required);
  }

  addCategory(): void {
    if (this.categoryIds.length < 3) {
      const newControl = this.createCategoryControl();
      newControl.addValidators(this.duplicateCategoryValidator.bind(this));
      this.categoryIds.push(newControl);
    }
  }

  removeCategory(index: number): void {
    this.categoryIds.removeAt(index);
  }
  
  private categoryLimitValidator(limit: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formArray = control as FormArray;
      return formArray && formArray.length > limit ? { maxCategories: true } : null;
    };
  }

  private duplicateCategoryValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!this.categoryIds) {
      return null;
    }

    const selectedCategories = this.categoryIds.controls
      .filter(ctrl => ctrl !== control)
      .map(ctrl => ctrl.value);

    return selectedCategories.includes(control.value) ? { duplicateCategory: true } : null;
  }

  saveArticle(): void {
    if (this.articleForm.valid) {
      const formValue = {
        ...this.articleForm.value,
        price: parseFloat(this.articleForm.value.price),
        quantity: parseInt(this.articleForm.value.quantity, 10),
        brandId: parseInt(this.articleForm.value.brandId, 10),
        categoryIds: this.articleForm.value.categoryIds.map((id: string) => parseInt(id, 10))
      };  
      this.articleRequestEvent.emit(formValue);
    }
  }
}