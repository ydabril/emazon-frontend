import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BUTTON_ICON } from 'src/app/core/constants/button-icons';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T extends Record<string, any>> implements OnInit {
  @Input() columns?: Array<any>;
  @Input() rows?: Array<T>;
  @Output() idEmitted = new EventEmitter<number>();
  addIcon: string = BUTTON_ICON['add'];

  constructor() {}

  ngOnInit(): void {}

  emitId(id: any): void {
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      this.idEmitted.emit(numericId);
    }
  }
}