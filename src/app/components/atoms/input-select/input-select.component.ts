import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent implements OnInit {
  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() options: { value: string; label: string }[] = [];
  constructor() {}

  selectedValue: string = '';
  ngOnInit(): void {}

  onSelectionChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.selectionChange.emit(selectedValue);
  }
}
