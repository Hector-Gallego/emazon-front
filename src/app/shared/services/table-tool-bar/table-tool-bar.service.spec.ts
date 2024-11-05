import { TestBed } from '@angular/core/testing';

import { TableToolBarService } from './table-tool-bar.service';

describe('TableToolBarService', () => {
  let service: TableToolBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableToolBarService);
  });

  it('debería crear el componente', () => {
    expect(service).toBeTruthy();
  });

  it('debería inicializar showBy$ con el valor por defecto', (done) => {
    service.showBy$.subscribe((value) => {
      expect(value).toBe('10');
      done();
    });
  });

  it('debería inicializar sortBy$ con el valor por defecto', (done) => {
    service.sortBy$.subscribe((value) => {
      expect(value).toBe('name:asc');
      done();
    });
  });

  it('debería actualizar showBy$ correctamente cuando se llame a updateShowBy', (done) => {
    const newValue = '10';

    service.updateShowBy(newValue);

    service.showBy$.subscribe((value) => {
      expect(value).toBe(newValue);
      done();
    });
  });

  it('debería actualizar sortBy$ correctamente cuando se llame a updateSortBy', (done) => {
    const newValue = 'price:desc';

    service.updateSortBy(newValue);

    service.sortBy$.subscribe((value) => {
      expect(value).toBe(newValue);
      done();
    });
  });

  it('debería actualizar filterByCategoryName correctamente cuando se llame a updateFilterByCategoryName', (done) => {
    const categoryValue = 'Electrónica';

    service.updateFilterByCategoryName(categoryValue);

    service.categoryFilter$.subscribe((value) => {
      expect(value).toBe(categoryValue);
      done();
    });
  });

  it('debería actualizar filterByBrandName correctamente cuando se llame a updateFilterByBrandName', (done) => {
    const brandValue = 'Nike';

    service.updateFilterByBrandName(brandValue);

    service.brandFilter$.subscribe((value) => {
      expect(value).toBe(brandValue);
      done();
    });
  });
  
});
