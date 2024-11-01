import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../interfaces/cart-item.inteface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartStateService {
  constructor() {}
  private cartItems: CartItem[] = [];

  private itemsInCartSubject = new BehaviorSubject<number>(0);
  itemsInCart$ = this.itemsInCartSubject.asObservable();

  addItemToShoppingCart(item: CartItem) {
    const existingItemIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.articleId === item.articleId
    );

    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.itemsInCartSubject.next(this.cartItems.length);
  }

  clearShoppingCart() {
    this.cartItems = [];
    this.updateShoppingCartBadge();
  }

  private updateShoppingCartBadge() {
    this.itemsInCartSubject.next(this.cartItems.length);
  }
}
