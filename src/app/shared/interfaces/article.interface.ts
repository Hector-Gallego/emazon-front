import { Brand } from "./brand.interface";
import { Category } from "./category.interface";
import { DataRow } from "./data-row.interface";

export interface Article{
    id?: number;
    name: string;
    description: string,
    quantity: number,
    price: number,
    categoryIds : number[],
    brandId: number,
}

export interface ArticleResponse {
    id: number;
    name: string;
    description: string,
    quantity: number,
    price: number,
    categories : Category[],
    brand: Brand,
    sufficientStock?: boolean,
    supplyDate?: Date,
    
}

export interface ArticleDataTable extends DataRow{
    id: number;
    name: string;
    description: string,
    quantity: number,
    price: number,
    categoryNames : string,
    brandName: string,
}