import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() label: string = 'Button';
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;

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
