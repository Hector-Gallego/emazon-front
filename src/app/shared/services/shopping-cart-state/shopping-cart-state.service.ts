import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../interfaces/cart-item.inteface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartStateService {
  constructor() {}
  private cartItems: Set<number> = new Set();
  private itemsInCartSubject = new BehaviorSubject<number>(0);
  itemsInCart$ = this.itemsInCartSubject.asObservable();

  addItemToShoppingCart(articleId: number) {
    this.cartItems.add(articleId);
    this.itemsInCartSubject.next(this.cartItems.size);
  }

  clearShoppingCart() {
    this.cartItems.clear();
    this.updateShoppingCartBadge();
  }

  private updateShoppingCartBadge() {
    this.itemsInCartSubject.next(this.cartItems.size);
  }


  setInitialItemsInCart(articlesId: number[]) {
    this.cartItems = new Set(articlesId);
    this.itemsInCartSubject.next(this.cartItems.size); 
  }

}
