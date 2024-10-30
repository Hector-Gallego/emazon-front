import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddSupplyComponent } from './popup-add-supply.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtomsModule } from '../../atoms/atoms.module';

describe('ModalComponent', () => {
  let component: PopupAddSupplyComponent;
  let fixture: ComponentFixture<PopupAddSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupAddSupplyComponent],
      imports: [SharedModule, AtomsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupAddSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir evento close al llamar onClose', () => {
    const closeSpy = jest.spyOn(component.close, 'emit');

    component.onClose();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('debería emitir quantityAddStock con cantidad válida al llamar onSubmit si el formulario es válido', () => {
    const quantityAddStockSpy = jest.spyOn(component.quantityAddStock, 'emit');
    component.formGroup.controls['quantity'].setValue(5); // Valor válido

    component.onSubmit();

    expect(component.formGroup.valid).toBeTruthy();
    expect(quantityAddStockSpy).toHaveBeenCalledWith(5);
  });

  it('debería marcar todos los campos como tocados si el formulario es inválido al llamar onSubmit', () => {
    const markAllAsTouchedSpy = jest.spyOn(
      component.formGroup,
      'markAllAsTouched'
    );
    component.formGroup.controls['quantity'].setValue(''); // Valor inválido

    component.onSubmit();

    expect(component.formGroup.valid).toBeFalsy();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });
});
