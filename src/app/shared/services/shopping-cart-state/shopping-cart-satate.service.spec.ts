import { TestBed } from '@angular/core/testing';
import { ShoppingCartStateService } from './shopping-cart-state.service';

describe('ShoppingCartStateService', () => {
  let service: ShoppingCartStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartStateService);
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería agregar un nuevo artículo al carrito', () => {
    const articleId = 1;
    service.addItemToShoppingCart(articleId);

    service.itemsInCart$.subscribe(count => {
      expect(count).toBe(1);
    });
  });

  it('no debería duplicar un artículo ya existente en el carrito', () => {
    const articleId = 1;

    service.addItemToShoppingCart(articleId);
    service.addItemToShoppingCart(articleId);

    expect(service['cartItems'].size).toBe(1);
  });

  it('debería limpiar el carrito de compras', () => {
    const articleId = 1;
    service.addItemToShoppingCart(articleId);
    service.clearShoppingCart();

    expect(service['cartItems'].size).toBe(0);

    service.itemsInCart$.subscribe(count => {
      expect(count).toBe(0);
    });
  });

  it('debería establecer los artículos iniciales en el carrito', () => {
    const initialArticleIds = [1, 2];
    service.setInitialItemsInCart(initialArticleIds);

    expect(Array.from(service['cartItems'])).toEqual(initialArticleIds);

    service.itemsInCart$.subscribe(count => {
      expect(count).toBe(initialArticleIds.length);
    });
  });
});
