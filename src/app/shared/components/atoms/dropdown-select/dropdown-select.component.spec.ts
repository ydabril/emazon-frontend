import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownSelectComponent } from './dropdown-select.component';
import { EM_ICON } from 'src/app/core/constants/em-icons';
import { FormsModule } from '@angular/forms';

describe('DropdownSelectComponent', () => {
  let component: DropdownSelectComponent;
  let fixture: ComponentFixture<DropdownSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownSelectComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default placeholder and icon', () => {
    expect(component.placeholder).toBe('Select an option');
    expect(component.arrowDropdown).toBe(EM_ICON['arrowDropdown']);
  });

  it('should update value when writeValue is called', () => {
    component.writeValue('1');
    expect(component.value).toBe('1');
  });

  it('should set value and call onChange on select change', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    const event = {
      target: { value: '2' }
    } as unknown as Event;

    component.onSelectChange(event);

    expect(component.value).toBe('2');
    expect(onChangeSpy).toHaveBeenCalledWith('2');
  });

  it('should call onTouched on blur', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);

    component.onBlur();

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should log placeholder on changes', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.placeholder = 'New placeholder';
    component.ngOnChanges({});
    expect(consoleSpy).toHaveBeenCalledWith('New placeholder');
  });
});
