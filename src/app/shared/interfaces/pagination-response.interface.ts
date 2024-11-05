export interface PaginationResponse<T> {
  status: number;
  message: string;
  data: Data<T>;
  timestamp: string;
}

export interface Data <T>{
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

