import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableToolBarService {
  constructor() {}

  private readonly showBySubject = new BehaviorSubject<string>('10');
  private readonly sortBySubject = new BehaviorSubject<string>('name:asc');
  private readonly filterByCategoryNameSubject = new BehaviorSubject<string>(
    ''
  );
  private readonly filterByBrandNameSubject = new BehaviorSubject<string>('');

  showBy$ = this.showBySubject.asObservable();
  sortBy$ = this.sortBySubject.asObservable();
  categoryFilter$ = this.filterByCategoryNameSubject.asObservable();
  brandFilter$ = this.filterByBrandNameSubject.asObservable();

  updateShowBy(value: string): void {
    this.showBySubject.next(value);
  }

  updateSortBy(value: string): void {
    this.sortBySubject.next(value);
  }
  updateFilterByCategoryName(value: string): void {
    this.filterByCategoryNameSubject.next(value);
  }

  updateFilterByBrandName(value: string): void {
    this.filterByBrandNameSubject.next(value);
  }
}
