import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';

@Component({
  selector: 'app-multiple-input-select',
  templateUrl: './multiple-input-select.component.html',
  styleUrls: ['./multiple-input-select.component.scss'],
})
export class MultipleInputSelectComponent {
  @Input() options: { value: string; label: string }[] = [];
  @Input() placeholder: string = 'Seleccione una opción';
  @Input() selectionLimit: number = 1;
  @Input() size: ButtonSize = ButtonSize.M;
  @Output() selectionChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedValues: string[] = [];

  onSelectionChange(event: Event): void {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    this.selectedValues = Array.from(selectedOptions).map(
      (option) => option.value
    );

    if (this.selectedValues.length > this.selectionLimit) {
      this.selectedValues = this.selectedValues.slice(0, this.selectionLimit);
    }

    this.selectionChange.emit(this.selectedValues);
  }

  isOptionDisabled(value: string): boolean {
    return (
      this.selectedValues.length >= this.selectionLimit &&
      !this.selectedValues.includes(value)
    );
  }
}
