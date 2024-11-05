export interface ShoppinCartRequest {
  articlesCart: any[];
  pageNumber: number;
  pageSize: number;
  sortOrder: string;
  categoryNameFilter: string;
  brandNameFilter: string;
}