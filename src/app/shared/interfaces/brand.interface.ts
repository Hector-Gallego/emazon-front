import { DataRow } from "./data-row.interface";

export interface Brand extends DataRow {
  id?: number;
  name: string;
  description: string;
}
