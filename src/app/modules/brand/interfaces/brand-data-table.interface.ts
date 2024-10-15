import { DataRow } from 'src/app/shared/interfaces/data-row.interface';

export interface BrandDataTable extends DataRow {
  id: number;
  name: string;
  description: string;
}
