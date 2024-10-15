import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  private screenWidthSubject = new BehaviorSubject<number>(window.innerWidth);
  screenWidth$ = this.screenWidthSubject.asObservable();

  constructor() {
    window.addEventListener('resize', () => {
      this.screenWidthSubject.next(window.innerWidth);
    });
  }

  getScreenWidth(): number {
    return window.innerWidth;
  }

  isLargeScreen(width: number): boolean {
    return width >= 768;
  }
}
