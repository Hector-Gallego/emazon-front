import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StatesTypes } from '../../constants/commonConstants';

export interface Toast {
  message: string;
  duration?: number;
  type?: StatesTypes;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  private toastSubject = new Subject<Toast>();

  toastState = this.toastSubject.asObservable();

  showToast(toast: Toast) {
    this.toastSubject.next(toast);
  }
}
