import { Component, OnInit, Input } from '@angular/core';
import { BUTTON_ICON } from 'src/app/core/constants/button-icons';

@Component({
  selector: 'app-button',
  template: `
    <button [disabled]="disabled">
      <img [src]="iconValue" *ngIf="icon"/>
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./app-button.component.scss'],
})
export class AppButtonComponent implements OnInit {
  @Input() icon!: string;
  @Input() disabled!: boolean;
  iconValue!: string;

  ngOnInit(): void {
    this.iconValue = BUTTON_ICON[this.icon];
  }
}
