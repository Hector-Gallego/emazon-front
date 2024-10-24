import { Brand } from "./brand.interface";
import { Category } from "./category.interface";

export interface Article{
    name: string;
    description: string,
    quantity: number,
    price: number,
    categoryIds : number[],
    brandId: number,
}