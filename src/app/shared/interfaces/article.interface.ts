import { Brand } from "./brand.interface";
import { Category } from "./category.interface";

export interface Article{
    name: string;
    description: string,
    price: number,
    quantity: number,
    categories : Category[],
    brand: Brand,
}