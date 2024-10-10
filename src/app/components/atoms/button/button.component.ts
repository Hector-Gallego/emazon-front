import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() label: string = 'Button';
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Input() size: 'S' | 'M' | 'L' = 'M'; 
  @Input() icon?: IconDefinition;

  @Output() buttonClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }

}
