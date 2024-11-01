import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { environment } from 'src/environments/environment';
import { ShoppiCartValueConstants } from '../../constants/shopping-cart.constant';
import { checkToken } from 'src/app/core/interceptors/token-interceptor/token.interceptor';
import { CartItem } from '../../interfaces/cart-item.inteface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartPersistenceService {
  constructor(private readonly http: HttpClient) {}

  saveItemtoShoppingCart(itemCart: CartItem): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      environment.shoppingCartApiUrl +
        ShoppiCartValueConstants.END_POINT_ADD_ITEM_SHOPPIN_CART,
      itemCart,
      {
        context: checkToken(),
      }
    );
  }
}
