import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { AppInputComponent } from 'src/app/shared/components/atoms/input/app-input.component';

describe('AppInputComponent', () => {
  let component: AppInputComponent;
  let fixture: ComponentFixture<AppInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppInputComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AppInputComponent),
          multi: true
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write a value to the input', () => {
    component.writeValue('testValue');
    expect(component.value).toBe('testValue');
  });

  it('should register onChange function', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    expect(component['onChange']).toBe(fn);
  });

  it('should register onTouched function', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component['onTouched']).toBe(fn);
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component['disabled']).toBe(true);
  });

  it('should emit value change on blur event', () => {
    const mockChange = jest.fn();
    const mockTouch = jest.fn();
    component.registerOnChange(mockChange);
    component.registerOnTouched(mockTouch);

    const event = { target: { value: 'blurValue' } } as unknown as Event;
    component.onInputBlur(event);

    expect(component.value).toBe('blurValue');
    expect(mockChange).toHaveBeenCalledWith('blurValue');
    expect(mockTouch).toHaveBeenCalled();
  });
});
