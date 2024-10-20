import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ReactiveFormsModule, FormsModule, Validators, FormControl } from '@angular/forms';
import { CategoryFieldLimits } from 'src/app/shared/constants/category.constants';
import { AtomsModule } from '../../atoms/atoms.module';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';
import { InputContentType } from 'src/app/shared/enums/input-content-type.enum';
import { ErrorMessages } from 'src/app/shared/constants/commonConstants';

describe('CategoryFormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule, FormsModule, AtomsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.fields = [
      {
        label: 'Nombre',
        formControlName: 'name',
        validators: [Validators.maxLength(50), Validators.required],
        type: InputType.INPUT,
        contentType: InputContentType.TEXT,
      },
    ];
    component.ngOnInit();
  });

  it('debería crear el formulario con un control', () => {
    expect(component.formGroup.contains('name')).toBe(true);
  });

  it('debería tener el control de formulario inicialmente vacío', () => {
    const nameControl = component.formGroup.get('name');

    expect(nameControl?.value).toBe('');
  });

  it('debería marcar como inválido el campo "name"  si está vacío', () => {
    const nameControl = component.formGroup.get('name');
    nameControl?.setValue('');
    expect(nameControl?.invalid).toBe(true);
    expect(nameControl?.errors?.['required']).toBeTruthy();
  });

  it('debería mostrar un error si el valor de "name" supera la longitud máxima', () => {
    const nameControl = component.formGroup.get('name');

    const longNameString = 'a'.repeat(
      CategoryFieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD + 1
    );

    nameControl?.setValue(longNameString);
    expect(nameControl?.invalid).toBe(true);
    expect(nameControl?.errors?.['maxlength']).toBeTruthy();
  });

  it('debería mostrar mensaje de error requerido para el campo "name" ', () => {
    component.formGroup.get('name')?.setValue('');
    component.formGroup.get('name')?.markAsTouched();
    const errorNameMessage = component.getErrorMessage('name');
    expect(errorNameMessage).toBe(ErrorMessages.REQUIERED_ERROR_MESSAGE);
  });

  it('debería mostrar mensaje de error de longitud para el campo "name"', () => {
    const longString = 'a'.repeat(
      CategoryFieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD + 1
    );
    component.formGroup.get('name')?.setValue(longString);
    component.formGroup.get('name')?.markAsTouched();

    const errorMessage = component.getErrorMessage('name');
    expect(errorMessage).toBe(
      ErrorMessages.MAX_LENGTH_ERROR_MESSAGE(
        CategoryFieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD
      )
    );
  });

  it('debería emitir el evento de submit cuando el formulario es válido', () => {
    jest.spyOn(component.submitForm, 'emit');
    const expectedCategory = {
      name: 'deportivo',
    };
    component.formGroup.get('name')?.setValue(expectedCategory.name);
    component.onSubmit();
    expect(component.submitForm.emit).toHaveBeenCalledWith(expectedCategory);
  });

  it('debería marcar todos los campos como tocados si el formulario es inválido', () => {
    component.onSubmit();
    const nameControl = component.formGroup.get('name');
    expect(nameControl?.touched).toBe(true);
  });

  it('debería vaciar todos los campos del formulario cuando se llama a resetForm', () => {
    component.formGroup.get('name')?.setValue('Categoria 1');
    component.resetForm();
    expect(component.formGroup.get('name')?.value).toBeNull();
  });

  it('debe actualizar el valor del FormControl con los valores seleccionados', () => {
    const selectedValues = ['value1', 'value2'];
    const formControlName = 'options';

    component.formGroup.addControl(formControlName, new FormControl([]));
    component.onSelectionChange(selectedValues, formControlName);

    expect(component.formGroup.get(formControlName)?.value).toEqual(selectedValues);
  });
});
