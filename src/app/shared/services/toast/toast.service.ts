import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StatesTypes } from '../../constants/commonConstants';
import { ToastData } from '../../interfaces/toast-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  private toastSubject = new Subject<ToastData>();

  toastState = this.toastSubject.asObservable();

  showToast(toast: ToastData) {
    this.toastSubject.next(toast);
  }

  triggerToast(message: string, type: StatesTypes, duration: number) {
    this.showToast({ message, duration, type });
  }
}
