import { TestBed } from '@angular/core/testing';
import { ShoppingCartStateService } from './shopping-cart-state.service';
import { CartItem } from '../../interfaces/cart-item.inteface';

describe('ShoppingCartStateService', () => {
  let service: ShoppingCartStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartStateService);
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería agregar un nuevo item al carrito', () => {
    const item: CartItem = { articleId: 1, quantity: 1 };
    service.addItemToShoppingCart(item);

    service.itemsInCart$.subscribe(count => {
      expect(count).toBe(1);
    });
  });

  it('debería aumentar la cantidad de un item existente en el carrito', () => {
    const item: CartItem = { articleId: 1, quantity: 1 };
    const sameItem: CartItem = { articleId: 1, quantity: 2 };

    service.addItemToShoppingCart(item);
    service.addItemToShoppingCart(sameItem);

 
    expect(service['cartItems'].length).toBe(1);

    expect(service['cartItems'][0].quantity).toBe(3);
  });

  it('debería limpiar el carrito de compras', () => {
    const item: CartItem = { articleId: 1, quantity: 1 };
    service.addItemToShoppingCart(item);
    service.clearShoppingCart();

    expect(service['cartItems'].length).toBe(0);

    service.itemsInCart$.subscribe(count => {
      expect(count).toBe(0);
    });
  });
});
