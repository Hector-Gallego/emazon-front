import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';
import { StatesTypes } from 'src/app/shared/constants/commonConstants';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InputComponent],
            imports: [FormsModule], 
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); 
    });

    it('debería inicializar con el valor predeterminado', () => {
        expect(component.value).toBe('');
    });

    it('debería actualizar el valor cuando se ingresa texto', () => {
        const inputElement = fixture.debugElement.query(By.css('input'));
        const testValue = 'Texto de prueba';

        inputElement.nativeElement.value = testValue;
        inputElement.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.value).toBe(testValue);
    });

    it('debería aplicar la clase de error si el estado es "error"', () => {
        component.state = 'error';
        fixture.detectChanges();

        const inputContainer = fixture.debugElement.query(By.css('.input-container'));
        expect(inputContainer.classes['input-container--error']).toBe(true);
    });

    it('debería mostrar el mensaje de error', () => {
        
        const errorMessage = 'Este es un mensaje de error';
        component.state = 'error';
        component.errorMessage = errorMessage;
        fixture.detectChanges();

        const errorMessageElement = fixture.debugElement.query(By.css('.input-container__error-message'));
        expect(errorMessageElement.nativeElement.textContent).toContain(errorMessage);
    });

    it('debería renderizar un textarea cuando isTextarea es true', () => {
        component.isTextarea = true;
        fixture.detectChanges();

        const textareaElement = fixture.debugElement.query(By.css('textarea'));
        expect(textareaElement).toBeTruthy();
    });


    it('debería escribir un valor en el componente', () => {
        const testValue = 'Texto de prueba';
        component.writeValue(testValue);
        expect(component.value).toBe(testValue);
    
        component.writeValue('');
        expect(component.value).toBe('');
    });

    it('debería registrar la función onChange', () => {
        const changeFn = jest.fn();
        component.registerOnChange(changeFn);
    
        component.onInput({ target: { value: 'Nuevo valor' } });
        expect(changeFn).toHaveBeenCalledWith('Nuevo valor');
    });


    it('debería registrar la función onTouched', () => {
        const touchedFn = jest.fn();
        component.registerOnTouched(touchedFn);
    
        component.onInput({ target: { value: 'Cualquier valor' } });
        expect(touchedFn).toHaveBeenCalled();
    });

    it('debería deshabilitar el componente cuando se establece el estado deshabilitado', () => {
        component.setDisabledState(true);
        expect(component.disabled).toBe(true);
    
        component.setDisabledState(false);
        expect(component.disabled).toBe(false);
    });

    it('debería aplicar la clase correspondiente si se usa un textarea', () => {
        component.isTextarea = true;
        fixture.detectChanges();
    
        const textareaElement = fixture.debugElement.query(By.css('textarea'));
        expect(textareaElement).toBeTruthy();
        expect(fixture.debugElement.query(By.css('input'))).toBeFalsy(); 
    });
})