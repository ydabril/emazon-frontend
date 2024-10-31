import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownTableComponent } from 'src/app/shared/components/atoms/dropdown-table/dropdown-table.component';

describe('DropdownTableComponent', () => {
  let component: DropdownTableComponent;
  let fixture: ComponentFixture<DropdownTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownTableComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test de inicialización
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Test para verificar que el input "label" se recibe correctamente
  it('debería recibir correctamente el input label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    expect(component.label).toBe('Test Label');
  });

  // Test para verificar que el input "options" se recibe correctamente
  it('debería recibir correctamente el input options', () => {
    const options = [{ id: 1, name: 'Option 1' }];
    component.options = options;
    fixture.detectChanges();
    expect(component.options).toEqual(options);
  });

  // Test para verificar que writeValue asigna el valor correctamente
  it('debería asignar correctamente el valor con writeValue', () => {
    component.writeValue('testValue');
    expect(component.value).toBe('testValue');
  });

  // Test para registrar el onChange callback



  // Test para verificar que optionChange emite el valor seleccionado correctamente
  it('debería emitir el valor seleccionado cuando se selecciona una opción', () => {
    const event = { target: { value: 'selectedOption' } };
    jest.spyOn(component.optionChange, 'emit');

    component.action(event);
    
    expect(component.optionChange.emit).toHaveBeenCalledWith('selectedOption');
  });

  // Test para verificar la funcionalidad de onInputBlur
  it('debería actualizar el valor y llamar a onChange y onTouched en onInputBlur', () => {
    const event = { target: { value: 'blurValue' } } as unknown as Event;
    const onChangeSpy = jest.fn();
    const onTouchedSpy = jest.fn();

    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);

    component.onInputBlur(event);

    expect(component.value).toBe('blurValue');
    expect(onChangeSpy).toHaveBeenCalledWith('blurValue');
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
