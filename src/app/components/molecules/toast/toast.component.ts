import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  IconDefinition,
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { StatesTypes } from 'src/app/shared/constants/commonConstants';
import { ToastData } from 'src/app/shared/interfaces/toast-data.interface';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  private readonly subscription = new Subscription();
  constructor(private readonly toastService: ToastService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const subs = this.toastService.toastState.subscribe((toast: ToastData) => {
      this.message = toast.message;
      this.duration = toast.duration;
      this.type = toast.type;
      this.show();
    });

    this.subscription.add(subs);
  }

  @Input() message: string = '';
  @Input() duration: number = 10000;
  @Input() type: StatesTypes = StatesTypes.SUCCESS;
  isVisible: boolean = false;

  close: IconDefinition = faXmark;

  icons: { [key: string]: IconDefinition } = {
    success: faCheckCircle,
    error: faTimesCircle,
    warning: faExclamationTriangle,
  };

  show() {
    this.isVisible = true;
    setTimeout(() => {
      this.hide();
    }, this.duration);
  }

  hide() {
    this.isVisible = false;
  }

  get icon() {
    return this.icons[this.type];
  }
}
