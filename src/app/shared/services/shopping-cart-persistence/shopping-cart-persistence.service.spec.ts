import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ShoppingCartPersistenceService } from './shopping-cart-persistence.service';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { environment } from 'src/environments/environment';
import { ShoppiCartValueConstants } from '../../constants/shopping-cart.constant';
import { CartItem } from '../../interfaces/cart-item.inteface';

describe('ShoppingCartPersistenceService', () => {
  let service: ShoppingCartPersistenceService;
  let httpTestingController: HttpTestingController;

  const mockCartItem: CartItem = {
    articleId: 1,
    quantity: 2,
  };

  const mockApiResponse: ApiResponse = {
    status: 200,
    message: 'Item added successfully',
    timestamp: '2020-12-10'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ShoppingCartPersistenceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería enviar el item del carrito al endpoint correcto con saveItemtoShoppingCart', () => {
    service.saveItemtoShoppingCart(mockCartItem).subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.shoppingCartApiUrl}${ShoppiCartValueConstants.END_POINT_ADD_ITEM_SHOPPIN_CART}`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCartItem);
    req.flush(mockApiResponse);
  });
});
