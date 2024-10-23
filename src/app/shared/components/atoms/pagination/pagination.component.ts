import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EM_ICON } from 'src/app/core/constants/em-icons';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  pathArrowLeft: string = EM_ICON['arrowLeft'];
  pathArrowRight: string = EM_ICON['arrowRight'];;

  @Input() showArrowLeft!: boolean;
  @Input() showArrowRight!: boolean;
  @Input() totalPages: number = 0;
  @Input() currentPage!: number;
  @Output() pageNumberChange = new EventEmitter<number>();

  pageNumber!: number;

  constructor() { }

  changePage(event: any) {
    this.pageNumber = Number(event.srcElement.innerText) - 1;
    this.pageNumberChange.emit(this.pageNumber);
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.pageNumberChange.emit(this.currentPage);
  }

  prevPage() {
    this.currentPage = this.currentPage - 1;
    this.pageNumberChange.emit(this.currentPage);
  }
}
