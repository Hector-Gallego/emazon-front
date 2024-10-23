import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import {
  ReactiveFormsModule,
  FormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { CategoryFieldLimits } from 'src/app/shared/constants/category.constants';
import { AtomsModule } from '../../atoms/atoms.module';
import { InputType } from 'src/app/shared/enums/inputs-type.enum';
import { InputContentType } from 'src/app/shared/enums/input-content-type.enum';
import { ErrorMessages } from 'src/app/shared/constants/commonConstants';
import { CustomValidator } from 'src/app/shared/validators/custom-validator.validator';
import { get } from 'http';

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
      {
        label: 'Precio',
        formControlName: 'price',
        validators: [Validators.min(1), Validators.required],
        type: InputType.INPUT,
        contentType: InputContentType.NUMBER,
      },
      {
        label: 'Cantidad',
        formControlName: 'quantity',
        validators: [CustomValidator.integer(), Validators.required],
        type: InputType.INPUT,
        contentType: InputContentType.NUMBER,
      },
      {
        label: 'Categorias',
        formControlName: 'categoryIds',
        maxSelectionLimit: 3,
        minSelectionLimit: 2,
        validators: [
          CustomValidator.minSelectionLimitValidator(2),
          CustomValidator.maxSelectionLimitValidator(3),
          Validators.required,
        ],
        type: InputType.MULTIPLE_SELECT,
        contentType: InputContentType.TEXT,
      },
      {
        label: 'Marca',
        formControlName: 'brandId',
        validators: [Validators.required],
        type: InputType.SELECT,
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

  it('debería mostrar un error si el valor de "price" es menor a 1', () => {
    const nameControl = component.formGroup.get('price');
    nameControl?.setValue(0);
    nameControl?.markAllAsTouched();

    const errorMessage = component.getErrorMessage('price');
    expect(errorMessage).toBe(ErrorMessages.POSITIVE_NUMBER_ERROR_MESSAGE);
    expect(nameControl?.invalid).toBe(true);
    expect(nameControl?.errors?.['min']).toBeTruthy();
  });

  it('debería mostrar un error si el valor de "quantity" no es un entero', () => {
    const nameControl = component.formGroup.get('quantity');
    nameControl?.setValue(123.323);
    nameControl?.markAllAsTouched();
    const errorMessage = component.getErrorMessage('quantity');
    expect(errorMessage).toBe(ErrorMessages.ONLY_INTEGER_ERROR_MESSAGE);
    expect(nameControl?.invalid).toBe(true);
    expect(nameControl?.errors?.['noInteger']).toBeTruthy();
  });

  it('debería mostrar un error si se excede el limite maximo de seleciones', () => {
    const nameControl = component.formGroup.get('categoryIds');
    nameControl?.setValue([1, 2, 3, 4]);
    nameControl?.markAllAsTouched();

    const errorMessage = component.getErrorMessage('categoryIds');
    expect(errorMessage).toBe(
      ErrorMessages.MAX_SELECTION_ERROR_MESSAGE(
        component.maxSelectionLimit
      )
    );

    expect(nameControl?.invalid).toBe(true);
    expect(nameControl?.errors?.['maxSelection']).toBeTruthy();
  });

  it('debería mostrar un error si se excede el limite minimo de seleciones', () => {
    const nameControl = component.formGroup.get('categoryIds');
    nameControl?.setValue([1]);
    nameControl?.markAllAsTouched();

    const errorMessage = component.getErrorMessage('categoryIds');
    expect(errorMessage).toBe(
      ErrorMessages.MIN_SELECTION_ERROR_MESSAGE(
        component.minSelectionLimit
      )
    );
    expect(nameControl?.invalid).toBe(true);
    expect(nameControl?.errors?.['minSelection']).toBeTruthy();
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
    const expectedData = {
      name: 'deportivo',
      price: 1,
      quantity: 10,
      categoryIds: [1, 3, 2],
      brandId: 1,
    };
    component.formGroup.get('name')?.setValue(expectedData.name);
    component.formGroup.get('price')?.setValue(expectedData.price);
    component.formGroup.get('quantity')?.setValue(expectedData.quantity);
    component.formGroup.get('categoryIds')?.setValue(expectedData.categoryIds);
    component.formGroup.get('brandId')?.setValue(expectedData.brandId);
    component.onSubmit();
    expect(component.submitForm.emit).toHaveBeenCalledWith(expectedData);
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

  it('debería asignar 0 a maxSelectionLimit y minSelectionLimit si son undefined', () => {
    
    component.fields = [
      {
        label: 'Categorias',
        formControlName: 'categoryIds',
        maxSelectionLimit: undefined,
        minSelectionLimit: undefined,
        validators: [],
        type: component.inputTypeMultipleSelect,
        contentType: InputContentType.TEXT,
      },
    ];
  
    component.buildForm();
    expect(component.maxSelectionLimit).toBe(0);
    expect(component.minSelectionLimit).toBe(0);
    expect(component.formGroup.contains('categoryIds')).toBe(true);
    expect(component.formGroup.get('categoryIds')?.value).toEqual("");
  });
  
});
