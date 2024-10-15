import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

import { StatesTypes } from '../../constants/commonConstants';
import { take } from 'rxjs/operators';
import { ToastData } from '../../interfaces/toast-data.interface';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería emitir mensajes de toast a través de toastState', (done) => {
    const testToast: ToastData = {
      message: 'Mensaje de prueba',
      duration: 5000,
      type: StatesTypes.SUCCESS,
    };

    service.toastState.pipe(take(1)).subscribe((toast) => {
      expect(toast).toEqual(testToast);
      done();
    });

    service.showToast(testToast);
  });

  it('debería disparar un toast con los parámetros correctos', (done) => {
    const message = 'Mensaje disparado';
    const duration = 4000;
    const type = StatesTypes.ERROR;

    service.toastState.pipe(take(1)).subscribe((toast) => {
      expect(toast.message).toBe(message);
      expect(toast.duration).toBe(duration);
      expect(toast.type).toBe(type);
      done();
    });

    service.triggerToast(message, type, duration);
  });
});
