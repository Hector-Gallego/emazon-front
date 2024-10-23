import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleInputSelectComponent } from './multiple-input-select.component';

describe('InputSelectComponent', () => {
  let component: MultipleInputSelectComponent;
  let fixture: ComponentFixture<MultipleInputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleInputSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir el valor seleccionado correctamente cuando se llame a onSelectionChange', () => {
    jest.spyOn(component.selectionChange, 'emit');

    const event = {
      target: {
        selectedOptions: [{ value: 'opcion1' }, { value: 'opcion2' }],
      },
    } as unknown as Event;

    component.onSelectionChange(event);
    expect(component.selectedValues).toEqual(['opcion1', 'opcion2']);

    expect(component.selectionChange.emit).toHaveBeenCalledWith([
      'opcion1',
      'opcion2',
    ]);
  });

  it('debe retornar la etiqueta correcta para un valor dado en getOptionLabel', () => {
    component.options = [
      { value: 'opcion1', label: 'Opción 1' },
      { value: 'opcion2', label: 'Opción 2' },
    ];

    expect(component.getOptionLabel('opcion1')).toBe('Opción 1');
    expect(component.getOptionLabel('opcion2')).toBe('Opción 2');
    expect(component.getOptionLabel('opcion3')).toBe(''); 
  });

  it('debería verificar si un valor está seleccionado en isSelected', () => {
    component.selectedValues = ['opcion1', 'opcion2'];

    expect(component.isSelected('opcion1')).toBe(true);
    expect(component.isSelected('opcion3')).toBe(false);
  });

  it('debería agregar una selección en addSelection si no está ya seleccionada', () => {
    component.selectedValues = ['opcion1'];

    component.addSelection('opcion2');

    expect(component.selectedValues).toContain('opcion2');
    expect(component.selectedValues.length).toBe(2);
  });

  it('debería actualizar selecciones correctamente en updateSelections', () => {
    jest.spyOn(component, 'onChange');
    jest.spyOn(component, 'onTouched');
    jest.spyOn(component.selectionChange, 'emit');

    component.selectedValues = ['opcion1', 'opcion2'];
    component.updateSelections();

    expect(component.value).toEqual(['opcion1', 'opcion2']);
    expect(component.onChange).toHaveBeenCalledWith(['opcion1', 'opcion2']);
    expect(component.onTouched).toHaveBeenCalled();
    expect(component.selectionChange.emit).toHaveBeenCalledWith([
      'opcion1',
      'opcion2',
    ]);
  });

  it('debe remover una selección en removeSelection', () => {
    component.selectedValues = ['opcion1', 'opcion2'];
    component.removeSelection('opcion1');
    expect(component.selectedValues).not.toContain('opcion1');
    expect(component.selectedValues.length).toBe(1);
  });
});
