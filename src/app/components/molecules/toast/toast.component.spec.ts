import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { By } from '@angular/platform-browser';
import { StatesTypes } from 'src/app/shared/constants/commonConstants';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ToastData } from 'src/app/shared/interfaces/toast-data.interface';
import { DesignSystemModule } from '../../../design-system/design-system.module';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [ToastService],
      imports: [DesignSystemModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    toastService = TestBed.inject(ToastService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia llamar al metodo show cuando cuando se emita un toastState', () => {
    const showSpy = jest.spyOn(component, 'show');

    const toast: ToastData = {
      message: '',
      duration: 1000,
      type: StatesTypes.ERROR,
    };

    component.ngOnInit();
    toastService['showToast'](toast);
    expect(showSpy).toHaveBeenCalled();
  });

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

    const messageElement = fixture.debugElement.query(
      By.css('.toast')
    ).nativeElement;
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
});
