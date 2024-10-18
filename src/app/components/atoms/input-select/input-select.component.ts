import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {

 
  @Input() options: { value: any, label: string }[] = [];
  @Input() placeholder: string = 'Seleccione una opción';
  @Input() selectionLimit: number = 1;
  @Output() selectionChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  selectedValues: string[] = [];

  onSelectionChange(event: Event): void {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    this.selectedValues = Array.from(selectedOptions).map(option => option.value);


    if (this.selectedValues.length > this.selectionLimit) {
      this.selectedValues = this.selectedValues.slice(0, this.selectionLimit);
    }

   
    this.selectionChange.emit(this.selectedValues);
  }

  isOptionDisabled(value: any): boolean {
    
    return this.selectedValues.length >= this.selectionLimit && !this.selectedValues.includes(value);
  }
}
