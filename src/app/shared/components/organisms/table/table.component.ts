import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { Category } from "src/app/data/network/responses/category.response";
import { IColumnsCategory } from "src/app/domain/interfaces/column-category.interface";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table-component.scss']
})
export class TableComponent {
  @Output() paginationChange = new EventEmitter<any>();
  @Input() columns!: Array<IColumnsCategory>;
  @Input() tableData!: Array<Category>;

  emitPaginationChange(paginationRequest: PaginationRequest): void {
    this.paginationChange.emit(paginationRequest);
  }
}