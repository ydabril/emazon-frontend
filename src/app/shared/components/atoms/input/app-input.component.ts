import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <input [type]="type" [class.is-invalid]="isInvalid" [value]="value" [placeholder]="placeholder" (blur)="onInputBlur($event)"/> `,
  styleUrls: ['./app-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputComponent),
      multi: true
    }
  ]
})
export class AppInputComponent implements  ControlValueAccessor {
  @Input() type!: string;
  @Input() placeholder: string = '';
  @Input() isInvalid!: boolean;

  private onChange!: (event: any) => void;
  private onTouched!: () => void;
  value!: string;
  private disabled!: boolean

  writeValue(value: string): void {
    this.value = value ? value : '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputBlur(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(this.value);
    this.onTouched();
  }
}
