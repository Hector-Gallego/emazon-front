import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../../atoms/button/button.component';

describe('PaginatonComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir el evento pageChange con el número de página correcto al cambiar de página', () => {
    jest.spyOn(component.pageChange, 'emit');

    const nuevaPagina = 2;
    component.changePage(nuevaPagina);

    expect(component.pageChange.emit).toHaveBeenCalledWith(nuevaPagina);
    expect(component.currentPage).toBe(nuevaPagina);
  });

  it('debería decrementar currentPage al llamar a prevPage', () => {
    component.currentPage = 2;
    component.prevPage();

    expect(component.currentPage).toBe(1);
  });

  it('no debería decrementar currentPage por debajo de 1 al llamar a prevPage', () => {
    component.currentPage = 1;
    component.prevPage();

    expect(component.currentPage).toBe(1);
  });

  it('debería incrementar currentPage al llamar a nextPage', () => {
    component.currentPage = 1;
    component.totalPages = 3;
    component.nextPage();

    expect(component.currentPage).toBe(2);
  });

  it('no debería incrementar currentPage más allá de totalPages al llamar a nextPage', () => {
    component.currentPage = 3;
    component.totalPages = 3;
    component.nextPage();

    expect(component.currentPage).toBe(3);
  });

  it('debería renderizar el número correcto de botones de página', () => {
    component.totalPages = 5;
    component.currentPage = 3;
    component.maxPagesToShow = 5;
    fixture.detectChanges();

    const pageButtons = fixture.debugElement.queryAll(
      By.css('.pagination__button')
    );
    expect(pageButtons.length).toBe(5);
  });

  it('debería establecer currentPage a 1 si currentPage es menor que 1', () => {
    component.currentPage = 0;
    component.totalPages = 10;
    component.validatePage();
    expect(component.currentPage).toBe(1);
  });

  it('debería establecer currentPage a totalPages si currentPage es mayor que totalPages', () => {
    component.totalPages = 5;
    component.currentPage = 6;
    component.validatePage();
    expect(component.currentPage).toBe(5);
  });
});
