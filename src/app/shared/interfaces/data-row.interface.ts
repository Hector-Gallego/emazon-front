import { Brand } from "./brand.interface";
import { Category } from "./category.interface";

export interface DataRow{
    [key : string] : string | number | boolean | string[]  |undefined;
}