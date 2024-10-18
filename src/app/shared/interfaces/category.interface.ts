import { DataRow } from "./data-row.interface";

export interface Category extends DataRow {
  id?: number;
  name: string;
  description: string;
}
