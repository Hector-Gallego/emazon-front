import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { StatesTypes } from 'src/app/shared/constants/commonConstants';
import {
  Toast,
  ToastService,
} from 'src/app/shared/services/toast/toast.service';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  constructor(private toastService: ToastService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const subs = this.toastService.toastState.subscribe((toast: Toast) => {
      this.message = toast.message;
      this.duration = toast.duration || 4000;
      this.type = toast.type || StatesTypes.SUCCESS;
      this.show();
    });

    this.subscription.add(subs);
  }

  @Input() message: string = '';
  @Input() duration: number = 4000;
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
