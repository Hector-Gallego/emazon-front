import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectComponent } from './input-select.component';

describe('PageSizeSelectComponent', () => {
  let component: InputSelectComponent;
  let fixture: ComponentFixture<InputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debe emitir el valor seleccionado cuando se llame a onSelectionChange', () => {
   
    jest.spyOn(component.selectionChange, 'emit');

    const event = {
      target: { value: 'testValue' },
    } as unknown as Event;

    component.onSelectionChange(event);
    expect(component.selectionChange.emit).toHaveBeenCalledWith('testValue');
  });
});
