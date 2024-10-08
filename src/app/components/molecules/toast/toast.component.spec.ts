import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

describe('ToastComponent', () => {
    let component: ToastComponent;
    let fixture: ComponentFixture<ToastComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ToastComponent, IconComponent, FaIconComponent],
        schemas:[NO_ERRORS_SCHEMA],
      }).compileComponents();
  
      fixture = TestBed.createComponent(ToastComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('debería mostrar el icono correcto según el tipo', () => {
        component.type = 'error';
        fixture.detectChanges();
    
        const icon = component.icon;
        expect(icon).toBe(component.icons['error']);
    
        component.type = 'warning';
        fixture.detectChanges();
    
        expect(component.icon).toBe(component.icons['warning']);
      });

      it('debería mostrar y ocultar el toast después de la duración especificada', (done) => {
        component.duration = 1000; 
        component.show();
        expect(component.isVisible).toBe(true);
        
        setTimeout(() => {
          expect(component.isVisible).toBe(false);
          done();
        }, component.duration);
      });

      it('debería mostrar el mensaje correcto', () => {
        const message = 'Mensaje de prueba';
        component.message = message;
        component.show();
        fixture.detectChanges();
    
        const messageElement = fixture.debugElement.query(By.css('.toast')).nativeElement;
        expect(messageElement.textContent).toContain(message);
      });


      it('no debería estar visible inicialmente', () => {
        const toastElement = fixture.debugElement.query(By.css('.toast'));
        expect(toastElement).toBeNull();
      });
    
      it('debería estar visible cuando isVisible es true', () => {
        component.show();
        fixture.detectChanges();
    
        const toastElement = fixture.debugElement.query(By.css('.toast'));
        expect(toastElement).toBeTruthy();
      });   

})