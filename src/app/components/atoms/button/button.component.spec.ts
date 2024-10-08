import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button.component";
import { By } from "@angular/platform-browser";

describe('ButtonComponent', () =>{

  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('debería renderizar el boton con el texto proporcionado en el input label', () =>{

    component.label = 'Agregar';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Agregar');

  });

  it('debería deshabilitar el botón si el input "disabled" es true', () =>{
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBe(true);

  });

  it('debería emitir "buttonClick" cuando el botón es clicado y no está deshabilitado', () => {
    component.disabled = false;
    fixture.detectChanges();
  
    jest.spyOn(component.buttonClick, 'emit');
  
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
  
    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('no debería emitir "buttonClick" cuando el botón está deshabilitado', () => {
    component.disabled = true;
    fixture.detectChanges();
  
    jest.spyOn(component.buttonClick, 'emit');
  
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
  
    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });
  

});