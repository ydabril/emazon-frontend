import { Component, EventEmitter, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { DROPDOWN_ORDER_OPTIONS } from "src/app/core/constants/dropdown-oder-options";
import { DROPDOWN_SIZE_OPTIINS } from "src/app/core/constants/dropdown-size-options";
import { PaginationFields } from "src/app/core/constants/enums/pagination-fields.enum";
import { paginationForm } from "src/app/core/forms/pagination.form";

@Component({
  selector: 'pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.scss']

})
export class PaginationBarComponent {
  @Output() paginationChange = new EventEmitter<any>();
  dropDounOrderOptions: Record<string, string | number>[] = DROPDOWN_ORDER_OPTIONS;
  dropDounSizeOptions: Record<string, string | number>[] = DROPDOWN_SIZE_OPTIINS;
  paginationForm!: FormGroup

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializePaginationForm();
    this.emitPaginationChange();
  }

  get size(): AbstractControl {
    return this.paginationForm.get(PaginationFields.size)!;
  }

  get sortDirection(): AbstractControl {
    return this.paginationForm.get(PaginationFields.size)!;
  }

  initializePaginationForm(): void {
    this.paginationForm = this._formBuilder.group({
      size: [this.dropDounSizeOptions[0]?.['value'] || paginationForm.size[0], paginationForm.size[1]],
      sortDirection: [this.dropDounOrderOptions[0]?.['value'] || paginationForm.sortDirection[0], paginationForm.sortDirection[1]]
    });
  }

  onOptionChange(controlName: string, selectedValue: any): void {
    this.paginationForm.patchValue({ [controlName]: selectedValue });
    this.emitPaginationChange();
  }

  emitPaginationChange(): void {
    this.paginationChange.emit(this.paginationForm.value);
  }
}