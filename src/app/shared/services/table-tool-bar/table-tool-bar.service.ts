import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableToolBarService {

  constructor() { }

  private readonly showBySubject = new BehaviorSubject<string>('5');
  private readonly sortBySubject = new BehaviorSubject<string>('name:asc');

  showBy$ = this.showBySubject.asObservable();
  sortBy$ = this.sortBySubject.asObservable();


  updateShowBy(value: string): void {
    this.showBySubject.next(value);
  }

  updateSortBy(value: string): void {
    this.sortBySubject.next(value);
  }
}
