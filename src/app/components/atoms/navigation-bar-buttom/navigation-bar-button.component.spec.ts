import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarButtonComponent } from './navigation-bar-button.component';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faHome } from '@fortawesome/free-solid-svg-icons';


describe('NavigationBarButtomComponent', () => {
    let component: NavigationBarButtonComponent;
    let fixture: ComponentFixture<NavigationBarButtonComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ NavigationBarButtonComponent ],
        imports: [ FontAwesomeModule ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(NavigationBarButtonComponent);
      component = fixture.componentInstance;
      component.icon = faHome; 
      component.label = 'Inicio';
      fixture.detectChanges();
    });
  
    
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  
   
    it('debería mostrar el label proporcionado', () => {
      const labelElement = fixture.debugElement.query(By.css('.navigation-bar-button__label')).nativeElement;
      expect(labelElement.textContent).toContain('Inicio');
    });
  
    it('debería renderizar el icono proporcionado', () => {
      const iconElement = fixture.debugElement.query(By.css('fa-icon'));
      expect(iconElement).toBeTruthy();
    });

    it('debería agregar la clase activa cuando isActive es verdadero', () => {
      component.isActive = true;
      fixture.detectChanges();
      const buttonElement = fixture.debugElement.query(By.css('button'));
      expect(buttonElement.classes['navigation-bar-button--active']).toBe(true);
    });
  
 
    it('debería emitir el evento buttonClick cuando se hace clic en el botón', () => {
      jest.spyOn(component.buttonClick, 'emit');
      const buttonElement = fixture.debugElement.query(By.css('button'));
      buttonElement.triggerEventHandler('click', null);
      expect(component.buttonClick.emit).toHaveBeenCalled();
    });
  });