import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandFormComponent } from './brand-form.component';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { DivisorComponent } from '../../atoms/divisor/divisor.component';
import { LoaderComponent } from '../../atoms/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrandErrorMessages,
  FieldLimits,
} from 'src/app/shared/constants/brandConstants';
import { LabelComponent } from '../../atoms/label/label.component';

describe('BrandFormComponent', () => {
  let component: BrandFormComponent;
  let fixture: ComponentFixture<BrandFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BrandFormComponent,
        InputComponent,
        ButtonComponent,
        DivisorComponent,
        LoaderComponent,
        LabelComponent
      ],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería crear el formulario con dos controles', () => {
    expect(component.brandForm.contains('name')).toBe(true);
    expect(component.brandForm.contains('description')).toBe(true);
  });

  it('debería tener los controles de formulario inicialmente vacíos', () => {
    const nameControl = component.brandForm.get('name');
    const descriptionControl = component.brandForm.get('description');

    expect(nameControl?.value).toBe('');
    expect(descriptionControl?.value).toBe('');
  });

  it('debería marcar como inválido el campo "name" si está vacío', () => {
    const nameControl = component.brandForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.invalid).toBe(true);
    expect(nameControl?.errors?.['required']).toBeTruthy();
  });

  it('debería marcar como inválido el campo "description" si está vacío', () => {
    const descriptionControl = component.brandForm.get('description');
    descriptionControl?.setValue('');
    expect(descriptionControl?.invalid).toBe(true);
    expect(descriptionControl?.errors?.['required']).toBeTruthy();
  });

  it('debería mostrar un error si el valor de "name" supera la longitud máxima', () => {
    const nameControl = component.brandForm.get('name');
    const longNameString = 'a'.repeat(
      FieldLimits.MAX_LENGTH_BRAND_NAME_FIELD + 1
    );
    nameControl?.setValue(longNameString);
    expect(nameControl?.invalid).toBe(true);
    expect(nameControl?.errors?.['maxlength']).toBeTruthy();
  });

  it('debería mostrar mensaje de error requerido para el campo "name"', () => {
    component.brandForm.get('name')?.setValue('');
    component.brandForm.get('name')?.markAsTouched();

    const errorNameMessage = component.getErrorMessage('name');
    expect(errorNameMessage).toBe(BrandErrorMessages.REQUIERED_ERROR_MESSAGE);
  });

  it('debería mostrar mensaje de error requerido para el campo "description"', () => {
    component.brandForm.get('description')?.setValue('');
    component.brandForm.get('description')?.markAsTouched();
    const errorDescriptionMessage = component.getErrorMessage('description');
    expect(errorDescriptionMessage).toBe(
      BrandErrorMessages.REQUIERED_ERROR_MESSAGE
    );
  });

  it('debería mostrar mensaje de error de longitud para el campo "name"', () => {
    const longString = 'a'.repeat(FieldLimits.MAX_LENGTH_BRAND_NAME_FIELD + 1);
    component.brandForm.get('name')?.setValue(longString);
    component.brandForm.get('name')?.markAsTouched();

    const errorMessage = component.getErrorMessage('name');
    expect(errorMessage).toBe(
      BrandErrorMessages.MAX_LENGTH_ERROR_MESSAGE(
        FieldLimits.MAX_LENGTH_BRAND_NAME_FIELD
      )
    );
  });

  it('debería mostrar mensaje de error de longitud para el campo "description"', () => {
    const longString = 'a'.repeat(
      FieldLimits.MAX_LENGTH_BRAND_DESCRIPTION_FIELD + 1
    );
    component.brandForm.get('description')?.setValue(longString);
    component.brandForm.get('description')?.markAsTouched();

    const errorMessage = component.getErrorMessage('description');
    expect(errorMessage).toBe(
      BrandErrorMessages.MAX_LENGTH_ERROR_MESSAGE(
        FieldLimits.MAX_LENGTH_BRAND_DESCRIPTION_FIELD
      )
    );
  });

  it('debería emitir el evento de submit cuando el formulario es válido', () => {
    jest.spyOn(component.submitForm, 'emit');

    component.brandForm.get('name')?.setValue('Marca 1');
    component.brandForm
      .get('description')
      ?.setValue('Descripción de la marca');

    component.onSubmit();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      name: 'Marca 1',
      description: 'Descripción de la marca',
    });
  });

  it('debería marcar todos los campos como tocados si el formulario es inválido', () => {
    component.onSubmit();

    const nameControl = component.brandForm.get('name');
    const descriptionControl = component.brandForm.get('description');

    expect(nameControl?.touched).toBe(true);
    expect(descriptionControl?.touched).toBe(true);
  });

  it('debería vaciar todos los campos del formulario cuando se llama a resetForm', () => {
    component.brandForm.get('name')?.setValue('Marca 1');
    component.brandForm.get('description')?.setValue('Descripción de la marca');

    component.resetForm();

    expect(component.brandForm.get('name')?.value).toBeNull();
    expect(component.brandForm.get('description')?.value).toBeNull();
  });
});
