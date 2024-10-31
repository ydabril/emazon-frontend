import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TextareaComponent } from 'src/app/shared/components/atoms/textarea/textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default value when writeValue is called', () => {
    component.writeValue('Test value');
    expect(component.value).toBe('Test value');
  });

  it('should set empty value when writeValue is called with null or undefined', () => {
    component.writeValue(null);
    expect(component.value).toBe('');
  });

  it('should register onChange callback', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);
    component.onInputChange({ target: { value: 'New value' } });
    
    expect(onChangeSpy).toHaveBeenCalledWith('New value');
  });

  it('should register onTouched callback', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);
    component.onInputChange({ target: { value: 'Another value' } });
    
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should call onInputChange and update value', () => {
    const textarea = fixture.debugElement.query(By.css('textarea'));
    textarea.nativeElement.value = 'Typed value';
    textarea.triggerEventHandler('input', { target: textarea.nativeElement });

    expect(component.value).toBe('Typed value');
  });

  it('should display the placeholder text', () => {
    component.placeholder = 'Enter your text';
    fixture.detectChanges();
    
    const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    expect(textarea.placeholder).toBe('Enter your text');
  });

  it('should apply is-invalid class when isInvalid is true', () => {
    component.isInvalid = true;
    fixture.detectChanges();

    const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    expect(textarea.classList).toContain('is-invalid');
  });

  it('should not apply is-invalid class when isInvalid is false', () => {
    component.isInvalid = false;
    fixture.detectChanges();

    const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    expect(textarea.classList).not.toContain('is-invalid');
  });
});
