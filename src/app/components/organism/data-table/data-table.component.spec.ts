import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ArticleDataTable } from 'src/app/shared/interfaces/article.interface';
import { DataRow } from 'src/app/shared/interfaces/data-row.interface';
import { TableHeader } from 'src/app/shared/interfaces/table-header.interface';

describe('DataTableComponent', () => {
  let component: DataTableComponent<DataRow>;
  let fixture: ComponentFixture<DataTableComponent<DataRow>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería emitir las coordenadas del mouse al llamar onButtonClick', () => {
    const mouseCoordsSpy = jest.spyOn(component.mouseCoords, 'emit');
    const mockEvent = new MouseEvent('click');

    component.onButtonClick(mockEvent);

    expect(mouseCoordsSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('debería emitir el artículo correcto al llamar onIdArticle', () => {
    const getArticleIdSpy = jest.spyOn(component.getDataRow, 'emit');
    const mockArticle: ArticleDataTable = {
      id: 1, name: 'Articulo de prueba', quantity: 10,
      description: '',
      price: 0,
      categoryNames: '',
      brandName: ''
    }; 

    component.onGetDatRow(mockArticle);

    expect(getArticleIdSpy).toHaveBeenCalledWith(mockArticle);
  });

  it('debería asignar el ícono correctamente', () => {
    component.iconCell = faEdit as IconDefinition;

    expect(component.iconCell).toBe(faEdit);
  });

  it('debería tener headers y data vacíos por defecto', () => {
    expect(component.headers).toEqual([]);
    expect(component.data).toEqual([]);
  });
});
