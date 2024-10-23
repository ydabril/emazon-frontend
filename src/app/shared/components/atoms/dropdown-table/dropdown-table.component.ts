import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dropdown-table',
  templateUrl: './dropdown-table.component.html',
  styleUrls: ['./dropdown-table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownTableComponent),
      multi: true
    }
  ]
})
export class DropdownTableComponent implements OnInit, ControlValueAccessor {
  @Input() label!: string;
  @Input() options: Record<string, string | number>[] = [];
  @Output() optionChange = new EventEmitter<any>();
  value!: string;
  private onChange!: (event: any) => void;
  private onTouched!: () => void;
 
  constructor() { }

  ngOnInit(): void {
  }

  action(event: any){
    const selectedOption = event.target.value;
    this.optionChange.emit(selectedOption);
  }

  writeValue(value: string): void {
    this.value = value ? value : '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputBlur(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(this.value);
    this.onTouched();
  }
}
