import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder!: string ;
  @Input() textareaName!: string ;
  @Input() isInvalid!: boolean;

  value!: string ;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() { }

  ngOnInit(): void { }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: any): void {
    const value = event.target.value;

    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
