import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AddCategoryPageComponent } from './add-category-page.component';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastComponent } from 'src/app/components/molecules/toast/toast.component';
import { CategoryFormComponent } from 'src/app/components/organism/category-form/category-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/components/atoms/input/input.component';
import { ErrorMessages, StatesTypes } from 'src/app/shared/constants/commonConstants';
import { Category } from 'src/app/core/models/category';
import { ApiResponse } from 'src/app/core/models/apiResponse';

describe('AddCategoryPageComponent', () => {
    let component: AddCategoryPageComponent;
    let fixture: ComponentFixture<AddCategoryPageComponent>;
    let categoryService: CategoryService;
    let loaderService: LoaderService;

    const formData: Category = { name: 'Nueva Categoría', description: 'descripción' };
    const mockResponse: ApiResponse = { message: '¡Categoría agregada exitosamente!', status: 200, timestamp: '20024-12-12' };


    const setupMocks = () => {
        const categoryServiceMock = {
            addCategory: jest.fn()
        };

        const loaderServiceMock = {
            show: jest.fn(),
            hide: jest.fn()
        };

        return { categoryServiceMock, loaderServiceMock };
    };

    beforeEach(async () => {
        const { categoryServiceMock, loaderServiceMock } = setupMocks();

        await TestBed.configureTestingModule({
            declarations: [
                AddCategoryPageComponent,
                ToastComponent,
                CategoryFormComponent,
                InputComponent],
            providers: [
                { provide: CategoryService, useValue: categoryServiceMock },
                { provide: LoaderService, useValue: loaderServiceMock }
            ],
            imports: [ReactiveFormsModule, FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(AddCategoryPageComponent);
        component = fixture.componentInstance;
        categoryService = TestBed.inject(CategoryService);
        loaderService = TestBed.inject(LoaderService);

        fixture.detectChanges();
    });

    it('debería crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debería llamar a addCategory y mostrar el toast de éxito', () => {
        testSuccessResponse();
    });

    it('debería manejar un error al añadir una categoría y mostrar el toast de error', () => {
        const mockError = { message: ErrorMessages.GENERIC_ERROR_MESSAGE };
        testErrorResponse(mockError);
    });

    it('debería manejar un error específico al agregar categoría', () => {
        const mockError = { error: { message: ErrorMessages.GENERIC_ERROR_MESSAGE } };
        testErrorResponse(mockError);
    });

    it('debería manejar un error sin mensaje y mostrar el toast de error genérico', () => {
        const mockError = {};
        testErrorResponse(mockError);
    });

    it('debería llamar a hide de loaderService al completar la solicitud', () => {
        jest.spyOn(categoryService, 'addCategory').mockReturnValue(of(mockResponse));

        component.onFormSubmit(formData);
        expect(loaderService.show).toHaveBeenCalled();
    });

    const testSuccessResponse = () => {
        jest.spyOn(categoryService, 'addCategory').mockReturnValue(of(mockResponse));
       // const toastShowSpy = jest.spyOn(component.toast, 'show');
        const resetFormSpy = jest.spyOn(component.categoryForm, 'resetForm');

        component.onFormSubmit(formData);

        expect(loaderService.show).toHaveBeenCalled();
        expect(categoryService.addCategory).toHaveBeenCalledWith(formData);
        expect(component.toastMessage).toBe(mockResponse.message);
        expect(component.toastType).toBe(StatesTypes.SUCCESS);
       // expect(toastShowSpy).toHaveBeenCalled();
        expect(resetFormSpy).toHaveBeenCalled();
        expect(loaderService.hide).toHaveBeenCalled();
    };

    const testErrorResponse = (error: any) => {
        jest.spyOn(categoryService, 'addCategory').mockReturnValue(throwError(() => error));
        //const toastShowSpy = jest.spyOn(component.toast, 'show');

        component.onFormSubmit(formData);

        expect(loaderService.show).toHaveBeenCalled();
        expect(categoryService.addCategory).toHaveBeenCalledWith(formData);
        expect(component.toastMessage).toBe(error.message || ErrorMessages.GENERIC_ERROR_MESSAGE);
        expect(component.toastType).toBe(StatesTypes.ERROR);
       // expect(toastShowSpy).toHaveBeenCalled();
        expect(loaderService.hide).toHaveBeenCalled();
    };

});
