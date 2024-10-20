import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: ButtonType = ButtonType.PRIMARY;
  @Input() disabled: boolean = false;
  @Input() icon?: IconDefinition;

  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
