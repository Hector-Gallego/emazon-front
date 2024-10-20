import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent {
  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() options: { value: string; label: string }[] = [];
  constructor() {}

  onSelectionChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.selectionChange.emit(selectedValue);
  }
}
