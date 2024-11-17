export interface PurchaseReport {
  id: number;
  userId: number;
  purchaseDate: string;
  totalAmount: number;
  itemCarts: ItemCart[];
  customerEmail: string;
}

interface ItemCart {
  id: number;
  articleId: number;
  articleName: string;
  articleQuantity: number;
  articleDescription: string;
  articlePrice: number;
}