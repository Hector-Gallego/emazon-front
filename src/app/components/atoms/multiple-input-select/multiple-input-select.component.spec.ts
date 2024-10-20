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

  it('debe emitir el valor seleccionado correctamente cuando se llame a onSelectionChange', () => {
    jest.spyOn(component.selectionChange, 'emit');

    const event = {
      target: {
        selectedOptions: [{ value: 'opcion1' }, { value: 'opcion2' }],
      },
    } as unknown as Event;

    component.selectionLimit = 2;

    component.onSelectionChange(event);
    expect(component.selectedValues).toEqual(['opcion1', 'opcion2']);

    expect(component.selectionChange.emit).toHaveBeenCalledWith([
      'opcion1',
      'opcion2',
    ]);
  });

  it('debe limitar la selección a selectionLimit', () => {
    jest.spyOn(component.selectionChange, 'emit');

    const event = {
      target: {
        selectedOptions: [
          { value: 'opcion1' },
          { value: 'opcion2' },
          { value: 'opcion3' },
        ],
      },
    } as unknown as Event;

    component.selectionLimit = 2;
    component.onSelectionChange(event);

    expect(component.selectedValues).toEqual(['opcion1', 'opcion2']);
    expect(component.selectionChange.emit).toHaveBeenCalledWith([
      'opcion1',
      'opcion2',
    ]);
  });

  it('debe deshabilitar las opciones correctamente en isOptionDisabled', () => {
    component.selectedValues = ['opcion1', 'opcion2'];
    component.selectionLimit = 2;
    expect(component.isOptionDisabled('opcion3')).toBe(true);
    expect(component.isOptionDisabled('opcion1')).toBe(false);
  });
});
