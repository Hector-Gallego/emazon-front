import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
    CategoryFieldLimits,
    CategoryErrorMessages,
} from 'src/app/shared/constants/category.constants';
import { FormsModule } from '@angular/forms';
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { CategoryDataForm } from '../../../shared/interfaces/category-data-form.interface';

describe('CategoryFormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule, FormsModule, DesignSystemModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el formulario con dos controles', () => {
    expect(component.formGroup.contains('name')).toBe(true);
    expect(component.formGroup.contains('description')).toBe(true);
  });

  it('debería tener los controles de formulario inicialmente vacíos', () => {
    const nameControl = component.formGroup.get('name');
    const descriptionControl = component.formGroup.get('description');

    expect(nameControl?.value).toBe('');
    expect(descriptionControl?.value).toBe('');
  });

  it('debería marcar como inválido el campo "name" y "description" si está vacío', () => {
    const nameControl = component.formGroup.get('name');
    const descriptionControl = component.formGroup.get('description');
    nameControl?.setValue('');
    descriptionControl?.setValue('');

    expect(nameControl?.invalid).toBe(true);
    expect(descriptionControl?.invalid).toBe(true);

    expect(nameControl?.errors?.['required']).toBeTruthy();
    expect(descriptionControl?.errors?.['required']).toBeTruthy();
  });

  it('debería mostrar un error si el valor de "name" y "description" supera la longitud máxima', () => {
    const nameControl = component.formGroup.get('name');
    const descriptionControl = component.formGroup.get('description');

    const longNameString = 'a'.repeat(
      CategoryFieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD + 1
    );
    const longDescriptionString = 'a'.repeat(
      CategoryFieldLimits.MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD + 1
    );

    nameControl?.setValue(longNameString);
    descriptionControl?.setValue(longDescriptionString);

    expect(nameControl?.invalid).toBe(true);
    expect(descriptionControl?.invalid).toBe(true);

    expect(nameControl?.errors?.['maxlength']).toBeTruthy();
    expect(descriptionControl?.errors?.['maxlength']).toBeTruthy();
  });

  it('debería mostrar mensaje de error requerido para los campos "name" y "description"', () => {
    component.formGroup.get('name')?.setValue('');
    component.formGroup.get('description')?.setValue('');

    component.formGroup.get('name')?.markAsTouched();
    component.formGroup.get('description')?.markAsTouched();

    const errorNameMessage = component.getErrorMessage('name');
    const errorDescriptionMessage = component.getErrorMessage('description');

    expect(errorNameMessage).toBe(
      CategoryErrorMessages.REQUIERED_ERROR_MESSAGE
    );
    expect(errorDescriptionMessage).toBe(
      CategoryErrorMessages.REQUIERED_ERROR_MESSAGE
    );
  });

  it('debería mostrar mensaje de error de longitud para el campo "name"', () => {
    const longString = 'a'.repeat(
      CategoryFieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD + 1
    );
    component.formGroup.get('name')?.setValue(longString);
    component.formGroup.get('name')?.markAsTouched();

    const errorMessage = component.getErrorMessage('name');
    expect(errorMessage).toBe(
      CategoryErrorMessages.MAX_LENGTH_ERROR_MESSAGE(
        CategoryFieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD
      )
    );
  });

  it('debería mostrar mensaje de error de longitud para el campo "description"', () => {
    const longString = 'a'.repeat(
      CategoryFieldLimits.MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD + 1
    );
    component.formGroup.get('description')?.setValue(longString);
    component.formGroup.get('description')?.markAsTouched();

    const errorMessage = component.getErrorMessage('description');
    expect(errorMessage).toBe(
      CategoryErrorMessages.MAX_LENGTH_ERROR_MESSAGE(
        CategoryFieldLimits.MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD
      )
    );
  });

  it('debería emitir el evento de submit cuando el formulario es válido', () => {
    jest.spyOn(component.submitForm, 'emit');
    const expectedCategory: CategoryDataForm = {
      name: 'deportivo',
      description: 'articulos deportivos',
    };
    component.formGroup.get('name')?.setValue(expectedCategory.name);
    component.formGroup
      .get('description')
      ?.setValue(expectedCategory.description);

    component.onSubmit();
    expect(component.submitForm.emit).toHaveBeenCalledWith(expectedCategory);
  });

  it('debería marcar todos los campos como tocados si el formulario es inválido', () => {
    component.onSubmit();

    const nameControl = component.formGroup.get('name');
    const descriptionControl = component.formGroup.get('description');

    expect(nameControl?.touched).toBe(true);
    expect(descriptionControl?.touched).toBe(true);
  });

  it('debería vaciar todos los campos del formulario cuando se llama a resetForm', () => {
    component.formGroup.get('name')?.setValue('Categoria 1');
    component.formGroup
      .get('description')
      ?.setValue('Descripción de la categoría');

    component.resetForm();

    expect(component.formGroup.get('name')?.value).toBeNull();
    expect(component.formGroup.get('description')?.value).toBeNull();
  });
});
