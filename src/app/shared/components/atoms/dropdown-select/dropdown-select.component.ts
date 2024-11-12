import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EM_ICON } from 'src/app/core/constants/em-icons';

interface SelectOption {
  id: number;
  name: string;
}

@Component({
  selector: 'dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownSelectComponent),
      multi: true
    }
  ]
})
export class DropdownSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() isInvalid!: boolean;
  @Output() selectionChange = new EventEmitter<string>();

  arrowDropdown: string = EM_ICON['arrowDropdown']

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  value: any;

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.placeholder);
      
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelectChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.value = selectedValue;
    this.onChange(this.value);

    const selectedOption = this.options.find(option => option.id === +selectedValue);
    if (selectedOption) {
      this.selectionChange.emit(selectedOption.name);
    }
  }

  onBlur(): void {
    this.onTouched();
  }
}
