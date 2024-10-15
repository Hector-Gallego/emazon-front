import { TestBed } from '@angular/core/testing';
import { ScreenSizeService } from './screen-size.service';
import { firstValueFrom } from 'rxjs';

describe('ScreenSizeService', () => {
  let service: ScreenSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenSizeService);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería emitir el ancho de pantalla actual al inicializarse', async () => {
    const initialWidth = window.innerWidth;
    const screenWidth = await firstValueFrom(service.screenWidth$);
    expect(screenWidth).toBe(initialWidth);
  });

  it('debería emitir un nuevo valor cuando el tamaño de la pantalla cambia', () => {
    const testWidth = 1024;

    window.innerWidth = testWidth;
    window.dispatchEvent(new Event('resize'));

    service.screenWidth$.subscribe((width) => {
      expect(width).toBe(testWidth);
    });
  });

  it('debería retornar true para pantallas anchas en isLargeScreen()', () => {
    expect(service.isLargeScreen(1024)).toBe(true);
  });

  it('debería retornar false para pantallas angostas en isLargeScreen()', () => {
    expect(service.isLargeScreen(500)).toBe(false);
  });

  it('debería retornar el ancho actual de la pantalla en getScreenWidth()', () => {
    const currentWidth = window.innerWidth;
    expect(service.getScreenWidth()).toBe(currentWidth);
  });
});
