import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería tener un estado inicial de carga en falso', () => {
    service.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
    });
  });

  it('debería emitir verdadero cuando se llama a show()', () => {
    service.show();
    service.loading$.subscribe((loading) => {
      expect(loading).toBe(true);
    });
  });

  it('debería emitir falso cuando se llama a hide()', () => {
    service.show();
    service.hide();
    service.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
    });
  });
});
