import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFormComponent } from './category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { FieldLimits, CategoryErrorMessages } from 'src/app/shared/constants/categoryConstants';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button/button.component';
import { DivisorComponent } from '../../atoms/divisor/divisor.component';
import { LoaderComponent } from '../../atoms/loader/loader.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('CategoryFormComponent', () => {
    let component: CategoryFormComponent;
    let fixture: ComponentFixture<CategoryFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CategoryFormComponent,
                InputComponent,
                ButtonComponent,
                DivisorComponent,
                LoaderComponent],
            schemas:[NO_ERRORS_SCHEMA],
            imports: [ReactiveFormsModule, FormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(CategoryFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debería crear el formulario con dos controles', () => {
        expect(component.categoryForm.contains('name')).toBe(true);
        expect(component.categoryForm.contains('description')).toBe(true);
    });

    it('debería tener los controles de formulario inicialmente vacíos', () => {

        const nameControl = component.categoryForm.get('name');
        const descriptionControl = component.categoryForm.get('description');

        expect(nameControl?.value).toBe('');
        expect(descriptionControl?.value).toBe('');
    });

    it('debería marcar como inválido el campo "name" y "description" si está vacío', () => {
        const nameControl = component.categoryForm.get('name');
        const descriptionControl = component.categoryForm.get('description');
        nameControl?.setValue('');
        descriptionControl?.setValue('');

        expect(nameControl?.invalid).toBe(true);
        expect(descriptionControl?.invalid).toBe(true);

        expect(nameControl?.errors?.['required']).toBeTruthy();
        expect(descriptionControl?.errors?.['required']).toBeTruthy();
    });

   
    it('debería mostrar un error si el valor de "name" y "description" supera la longitud máxima', () => {
        const nameControl = component.categoryForm.get('name');
        const descriptionControl = component.categoryForm.get('description');

        const longNameString = 'a'.repeat(FieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD + 1);
        const longDescriptionString = 'a'.repeat(FieldLimits.MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD + 1);
        
        nameControl?.setValue(longNameString);
        descriptionControl?.setValue(longDescriptionString);

        expect(nameControl?.invalid).toBe(true);   
        expect(descriptionControl?.invalid).toBe(true);

        expect(nameControl?.errors?.['maxlength']).toBeTruthy();
        expect(descriptionControl?.errors?.['maxlength']).toBeTruthy();
    });



    it('debería mostrar mensaje de error requerido para los campos "name" y "description"', () => {
        component.categoryForm.get('name')?.setValue('');
        component.categoryForm.get('description')?.setValue('');

        component.categoryForm.get('name')?.markAsTouched();
        component.categoryForm.get('description')?.markAsTouched();

        const errorNameMessage = component.getErrorMessage('name');
        const errorDescriptionMessage = component.getErrorMessage('description');

        expect(errorNameMessage).toBe(CategoryErrorMessages.REQUIERED_ERROR_MESSAGE);
        expect(errorDescriptionMessage).toBe(CategoryErrorMessages.REQUIERED_ERROR_MESSAGE);
    });


    it('debería mostrar mensaje de error de longitud para el campo "name"', () => {
        const longString = 'a'.repeat(FieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD + 1);
        component.categoryForm.get('name')?.setValue(longString);
        component.categoryForm.get('name')?.markAsTouched();

        const errorMessage = component.getErrorMessage('name');
        expect(errorMessage).toBe(CategoryErrorMessages.MAX_LENGTH_ERROR_MESSAGE(FieldLimits.MAX_LENGTH_CATEGORY_NAME_FIELD));
    });

    it('debería mostrar mensaje de error de longitud para el campo "description"', () => {
        const longString = 'a'.repeat(FieldLimits.MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD + 1);
        component.categoryForm.get('description')?.setValue(longString);
        component.categoryForm.get('description')?.markAsTouched();

        const errorMessage = component.getErrorMessage('description');
        expect(errorMessage).toBe(CategoryErrorMessages.MAX_LENGTH_ERROR_MESSAGE(FieldLimits.MAX_LENGTH_CATEGORY_DESCRIPTION_FIELD));
    });



    it('debería emitir el evento de submit cuando el formulario es válido', () => {
        jest.spyOn(component.submitForm, 'emit');

        component.categoryForm.get('name')?.setValue('Categoria 1');
        component.categoryForm.get('description')?.setValue('Descripción de la categoría');

        component.onSubmit();

        expect(component.submitForm.emit).toHaveBeenCalledWith({
            name: 'Categoria 1',
            description: 'Descripción de la categoría'
        });
    });


    it('debería marcar todos los campos como tocados si el formulario es inválido', () => {
        component.onSubmit();

        const nameControl = component.categoryForm.get('name');
        const descriptionControl = component.categoryForm.get('description');

        expect(nameControl?.touched).toBe(true);
        expect(descriptionControl?.touched).toBe(true);
    });

    it('debería vaciar todos los campos del formulario cuando se llama a resetForm', () => {
        component.categoryForm.get('name')?.setValue('Categoria 1');
        component.categoryForm.get('description')?.setValue('Descripción de la categoría');

        component.resetForm();

        expect(component.categoryForm.get('name')?.value).toBeNull()
        expect(component.categoryForm.get('description')?.value).toBeNull();
    });


})