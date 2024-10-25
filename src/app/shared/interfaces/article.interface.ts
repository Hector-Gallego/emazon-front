import { Brand } from "./brand.interface";
import { Category } from "./category.interface";

export interface Article{
    id?: number;
    name: string;
    description: string,
    quantity: number,
    price: number,
    categoryIds : number[],
    brandId: number,
}

export interface ArticleResponse{
    id: number;
    name: string;
    description: string,
    quantity: number,
    price: number,
    categories : Category[],
    brand: Brand,
}