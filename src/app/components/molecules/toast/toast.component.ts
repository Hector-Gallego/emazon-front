import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent{

  @Input() message: string = '';
  @Input() duration: number = 4000; 
  @Input() type: 'success' | 'error' | 'warning'  = 'success';
  isVisible: boolean = false;

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
