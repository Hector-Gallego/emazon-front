import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartItemDetailCardComponent } from './shopping-cart-item-detail-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { ArticleResponse } from 'src/app/shared/interfaces/article.interface';
import { AtomsModule } from '../../atoms/atoms.module';

describe('ShoppingCartItemDetailCardComponent', () => {
  let component: ShoppingCartItemDetailCardComponent;
  let fixture: ComponentFixture<ShoppingCartItemDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingCartItemDetailCardComponent],
      imports: [FontAwesomeModule, AtomsModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartItemDetailCardComponent);
    component = fixture.componentInstance;
  });


  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con valores por defecto', () => {
    expect(component.removeIcon).toBeDefined();
    expect(component.buttonTypeSecundary).toBe(ButtonType.SECUNDARY);
    expect(component.buttonSize).toBe(ButtonSize.S);
  });


  it('debería establecer correctamente los inputs imgUrl y article', () => {
    const testUrl = 'http://example.com/test.jpg';
    const testArticle: ArticleResponse = {
      id: 1,
      name: 'Artículo de Ejemplo',
      description: 'Descripción de Ejemplo',
      price: 100,
      quantity: 0,
      categories: [],
      brand: {
        name: '',
        description: ''
      },
      sufficientStock: false,
      supplyDate: new Date()
    };
    component.imgUrl = testUrl;
    component.article = testArticle;
    fixture.detectChanges();

    expect(component.imgUrl).toBe(testUrl);
    expect(component.article).toBe(testArticle);
  });

  it('debería emitir el articleId cuando se llama a getArticleId', () => {
    const articleId = 1;
    jest.spyOn(component.itemRemoved, 'emit'); 
    component.getArticleId(articleId);
    expect(component.itemRemoved.emit).toHaveBeenCalledWith(articleId); 
  });



});
