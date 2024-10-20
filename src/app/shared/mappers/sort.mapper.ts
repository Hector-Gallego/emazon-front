import { SortBy } from "../enums/sort-by.enum";
import { SortDirection } from "../enums/sort-direction.enum";

export class SortMapper{

    static mapSortBy(value: string): SortBy {
        switch (value.toLocaleLowerCase()) {
          case 'name':
            return SortBy.NAME;
          default:
            return SortBy.NAME; 
        }
      }
    
      static mapSortDirection(value: string): SortDirection {
        switch (value.toLowerCase()) {  
          case 'asc':
            return SortDirection.ASC;
          case 'desc':
            return SortDirection.DESC;
          default:
            return SortDirection.ASC;  
        }
      }

}