import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { StatesTypes } from 'src/app/shared/constants/commonConstants';
import { Toast, ToastService } from 'src/app/shared/services/toast/toast.service';
import { of, Subject } from 'rxjs';

describe('ToastComponent', () => {
    let component: ToastComponent;
    let fixture: ComponentFixture<ToastComponent>;

    let toastService: ToastService;
  
    beforeEach(async () => {

      const mockToastService = {
        toastState : new Subject(),
      }

      

      await TestBed.configureTestingModule({
        declarations: [ToastComponent, IconComponent, FaIconComponent],
        schemas:[NO_ERRORS_SCHEMA],
        providers:[
          ToastService,


          //{
            //provide: ToastService,
            //usevalue : mockToastService 
          //}
        ]
      }).compileComponents();
  
      fixture = TestBed.createComponent(ToastComponent);
      toastService = TestBed.inject(ToastService) ;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });



    it('deberia llamar al metodo show cuando cuando se emita un toastState', fakeAsync( () => {

      const showSpy = jest.spyOn(component, 'show');

      const toast : Toast = {
        message: '',
        duration: 1000,
        type: StatesTypes.ERROR
      }
    
        component.ngOnInit();
        toastService['showToast'](toast);
        //toastService.toastState = of(toast);
        
        tick();

        expect(showSpy).toHaveBeenCalled();

    }));

    it('debería mostrar el icono correcto según el tipo', () => {
        component.type = StatesTypes.ERROR;
        fixture.detectChanges();
    
        const icon = component.icon;
        expect(icon).toBe(component.icons['error']);
    
        component.type = StatesTypes.WARNING;
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