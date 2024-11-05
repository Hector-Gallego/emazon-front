import { Data } from "./pagination-response.interface";

export interface ShoppinCartResponse<T> {
  customPage: Data<T>;
  totalPurchase: number;
}



