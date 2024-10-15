export interface DataPagination<T> {
  status: number;
  message: string;
  data: Data<T>;
  timestamp: string;
}

interface Data <T>{
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

