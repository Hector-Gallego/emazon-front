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
  let component: FormComponent<any>;
  let fixture: ComponentFixture<FormComponent<any>>;

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
    expect(component.formGroup.get('categoryIds')?.value).toEqual('');
  });
});
